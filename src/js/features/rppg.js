// rPPG 心率估计模块：实时监测与图表
document.addEventListener('DOMContentLoaded', function() {
  const rppgAnalysisForm = document.getElementById('rppg-analysis-form');
  const startRppgBtn = document.getElementById('start-rppg-btn');
  const stopRppgBtn = document.getElementById('stop-rppg-btn');
  const rppgStatus = document.getElementById('rppg-status');
  const rppgResults = document.getElementById('rppg-results');
  const rppgPlaceholder = document.getElementById('rppg-placeholder');
  const cameraPreview = document.getElementById('rppg-camera-preview');

  if (!startRppgBtn || !stopRppgBtn) return;

  let rppgActive = false;
  let rppgInterval;
  let rppgStream;
  let heartRateChart;
  let heartbeatInstance = null;
  let cvReady = false;
  let opencvScriptInjected = false;

  const OPENCV_URI = 'https://docs.opencv.org/4.x/opencv.js';
  // 使用本地 Haar 级联文件（服务器根目录下）
  const HAARCASCADE_URI = 'haarcascade_frontalface_alt.xml';

  // 已禁用 OpenCV 加载以符合 CSP；始终走本地回退
  function loadOpenCv() {
    return Promise.reject(new Error('OpenCV 被禁用以避免 unsafe-eval，改用纯 Canvas 回退'));
  }

  // 简单峰值检测：从时域波形中找出心跳峰，进而计算 RR 间期
  function detectPeaks(signal, fps, bpm) {
    const N = signal.length;
    if (!Array.isArray(signal) || N < Math.max(10, Math.round(fps))) return [];
    // 平滑处理，降低噪声
    const window = Math.max(3, Math.round(fps / 10));
    const smooth = new Array(N).fill(0);
    let acc = 0;
    for (let i = 0; i < N; i++) {
      acc += signal[i];
      if (i >= window) acc -= signal[i - window];
      smooth[i] = acc / Math.min(i + 1, window);
    }
    // 均值与方差
    const mean = smooth.reduce((s, v) => s + v, 0) / N;
    const variance = smooth.reduce((s, v) => s + (v - mean) * (v - mean), 0) / N;
    const std = Math.sqrt(variance);
    // 基于 bpm 的自适应最小峰距（若 bpm 合理）
    const hasValidBpm = typeof bpm === 'number' && isFinite(bpm) && bpm > 40 && bpm < 180;
    const expectedDist = hasValidBpm ? (fps * 60 / bpm) : null;
    const minDistance = Math.max(1, Math.round(hasValidBpm ? 0.5 * expectedDist : 0.35 * fps));
    const maxDistance = Math.max(minDistance + 1, Math.round(hasValidBpm ? 1.6 * expectedDist : 1.2 * fps));

    function findPeaks(thCoef) {
      const threshold = mean + thCoef * std;
      const peaks = [];
      let lastPeak = -minDistance;
      for (let i = 1; i < N - 1; i++) {
        if (smooth[i] > threshold && smooth[i] >= smooth[i - 1] && smooth[i] >= smooth[i + 1]) {
          if (i - lastPeak >= minDistance) {
            peaks.push(i);
            lastPeak = i;
          } else if (peaks.length && smooth[i] > smooth[peaks[peaks.length - 1]]) {
            peaks[peaks.length - 1] = i;
            lastPeak = i;
          }
        }
      }
      return { threshold, peaks };
    }

    // 主检：0.2*std；若峰值不足，再用更宽松的 0.1*std 重试
    let { threshold, peaks } = findPeaks(0.2);
    if (peaks.length < 3) {
      const retry = findPeaks(0.1);
      threshold = retry.threshold;
      peaks = retry.peaks;
    }

    // 若仍不足且 bpm 合理，按预期间距进行窗口内择优寻找
    if (peaks.length < 3 && hasValidBpm && expectedDist > 2) {
      // 在整个序列中找到一个初始最大值作为种子
      let seed = 1;
      let bestVal = smooth[1];
      for (let i = 2; i < N - 1; i++) {
        if (smooth[i] >= smooth[i - 1] && smooth[i] >= smooth[i + 1] && smooth[i] > bestVal) {
          seed = i;
          bestVal = smooth[i];
        }
      }
      const seqPeaks = [seed];
      // 向后查找
      let curr = seed;
      while (true) {
        const start = Math.min(N - 2, Math.max(curr + Math.round(0.5 * expectedDist), curr + minDistance));
        const end = Math.min(N - 2, curr + maxDistance);
        if (start >= end) break;
        let nextIdx = null;
        let nextVal = -Infinity;
        for (let i = start; i <= end; i++) {
          if (smooth[i] >= smooth[i - 1] && smooth[i] >= smooth[i + 1]) {
            if (smooth[i] > nextVal) {
              nextVal = smooth[i];
              nextIdx = i;
            }
          }
        }
        if (nextIdx == null) break;
        seqPeaks.push(nextIdx);
        curr = nextIdx;
        if (seqPeaks.length > 20) break; // 合理上限
      }
      // 向前查找
      curr = seed;
      while (true) {
        const end = Math.max(1, Math.min(curr - Math.round(0.5 * expectedDist), curr - minDistance));
        const start = Math.max(1, curr - maxDistance);
        if (start >= end) break;
        let prevIdx = null;
        let prevVal = -Infinity;
        for (let i = start; i <= end; i++) {
          if (smooth[i] >= smooth[i - 1] && smooth[i] >= smooth[i + 1]) {
            if (smooth[i] > prevVal) {
              prevVal = smooth[i];
              prevIdx = i;
            }
          }
        }
        if (prevIdx == null) break;
        seqPeaks.unshift(prevIdx);
        curr = prevIdx;
        if (seqPeaks.length > 20) break;
      }
      peaks = seqPeaks;
    }
    console.log('[rPPG] detectPeaks', { N, fps, window, mean, std, threshold, peaksCount: peaks.length });
    return peaks;
  }

  function computeRrMetrics(values, fps, bpm) {
    if (!Array.isArray(values) || values.length < 10 || !fps) {
      console.warn('[rPPG] HRV 输入不足', { len: values && values.length, fps });
      return { rmssd: null, sdnn: null, peaksCount: 0, rrCount: 0 };
    }
    const peaks = detectPeaks(values, fps, bpm);
    if (peaks.length < 3) {
      console.warn('[rPPG] 峰值不足，无法计算 HRV', { peaksCount: peaks.length });
      return { rmssd: null, sdnn: null, peaksCount: peaks.length, rrCount: 0 };
    }
    const rr = [];
    for (let i = 1; i < peaks.length; i++) {
      const interval = (peaks[i] - peaks[i - 1]) / fps; // 秒
      if (interval > 0.2 && interval < 2.5) { // 合理范围过滤（24–300 bpm）
        rr.push(interval);
      }
    }
    if (rr.length < 2) {
      console.warn('[rPPG] RR 间期不足', { rrCount: rr.length, peaksCount: peaks.length });
      return { rmssd: null, sdnn: null, peaksCount: peaks.length, rrCount: rr.length };
    }
    let diffSquares = 0;
    for (let i = 1; i < rr.length; i++) {
      const diff = rr[i] - rr[i - 1];
      diffSquares += diff * diff;
    }
    const rmssd = Math.sqrt(diffSquares / (rr.length - 1));
    const mean = rr.reduce((sum, v) => sum + v, 0) / rr.length;
    const variance = rr.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / rr.length;
    const sdnn = Math.sqrt(variance);
    console.log('[rPPG] HRV 计算完成', { peaksCount: peaks.length, rrCount: rr.length, rmssd, sdnn });
    return { rmssd, sdnn, peaksCount: peaks.length, rrCount: rr.length };
  }

  function updateHeartRateChartData(values, fps, bpm) {
    // 放宽校验：只要有数据就先绘制
    if (!Array.isArray(values) || values.length === 0) return;

    // 先绘制右侧实时波形，避免等待 fps/HRV
    if (!heartRateChart) {
        initHeartRateChart();
    }
    if (heartRateChart && typeof heartRateChart.draw === 'function') {
        const N = Math.min(values.length, 300);
        const series = values.slice(values.length - N);
        heartRateChart.draw(series);
    }

    // 再计算并更新 HRV 文本（fps 可能在初期为 0 或未就绪）
    const { rmssd, sdnn, peaksCount, rrCount } = computeRrMetrics(values, fps, bpm);
    const rmssdEl = document.getElementById('hrv-metric-rmssd');
    const sdnnEl = document.getElementById('hrv-metric-sdnn');
    if (rmssdEl) rmssdEl.textContent = rmssd ? `${(rmssd * 1000).toFixed(0)} ms` : '--';
    if (sdnnEl) sdnnEl.textContent = sdnn ? `${(sdnn * 1000).toFixed(0)} ms` : '--';

    if (typeof rppgStatus !== 'undefined' && rppgStatus) {
        if (!rmssd || !sdnn) {
            rppgStatus.textContent = `HRV不可用：fps=${fps} 样本=${values.length} 峰=${peaksCount} RR=${rrCount}`;
        } else {
            rppgStatus.textContent = `HRV: RMSSD=${(rmssd * 1000).toFixed(0)}ms SDNN=${(sdnn * 1000).toFixed(0)}ms`;
        }
    }
    // 使用纯 Canvas 绘制，避免 Chart.js 触发 CSP
    if (!heartRateChart) {
      initHeartRateChart();
    }
    if (heartRateChart && typeof heartRateChart.draw === 'function') {
      const N = Math.min(values.length, 300);
      const series = values.slice(values.length - N);
      heartRateChart.draw(series);
    }
  }

  startRppgBtn.addEventListener('click', async function() {
    if (rppgActive) return;
    rppgActive = true;
    startRppgBtn.classList.add('hidden');
    stopRppgBtn.classList.remove('hidden');
    if (rppgStatus) rppgStatus.classList.remove('hidden');
    if (rppgPlaceholder) rppgPlaceholder.classList.add('hidden');
    if (rppgResults) rppgResults.classList.remove('hidden');
    // 优先使用 OpenCV（如已加载），否则回退到纯 Canvas 采样
    if (window.cv && typeof window.cv.CascadeClassifier !== 'undefined') {
      startOpenCvRppg();
    } else {
      startLocalCameraFallback();
    }
  });

  function startOpenCvRppg() {
    try {
      if (!cameraPreview) return;
      cameraPreview.innerHTML = '';
      cameraPreview.style.position = 'relative';

      const video = document.createElement('video');
      video.id = 'rppg-webcam';
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';

      const canvas = document.createElement('canvas');
      canvas.id = 'rppg-cv-canvas';
      canvas.style.position = 'absolute';
      canvas.style.left = '0';
      canvas.style.top = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      cameraPreview.appendChild(video);
      cameraPreview.appendChild(canvas);

      // 使用 Heartbeat（基于 OpenCV）进行人脸检测与绘制
      heartbeatInstance = new window.Heartbeat('rppg-webcam', 'rppg-cv-canvas', 'haarcascade_frontalface_alt.xml', 30, 6, 1000);
      heartbeatInstance.setSignalUpdateCallback(detail => {
        const values = (detail && detail.timeSeries) ? detail.timeSeries : [];
        const fps = (detail && detail.fps) ? detail.fps : 30;
        const bpm = (detail && detail.bpm) ? detail.bpm : null;
        updateHeartRateChartData(values, fps, bpm);
        const hrEl = document.getElementById('heart-rate-value');
        if (hrEl && bpm) hrEl.textContent = Math.round(bpm);
      });
      heartbeatInstance.init().catch(err => {
        console.error('OpenCV rPPG 初始化失败，回退到本地采样：', err);
        // 清理并回退
        try { heartbeatInstance.stop(); } catch(e) {}
        heartbeatInstance = null;
        cameraPreview.innerHTML = '';
        cameraPreview.appendChild(document.createElement('div'));
        startLocalCameraFallback();
      });
    } catch (e) {
      console.error('启动 OpenCV rPPG 失败：', e);
      startLocalCameraFallback();
    }
  }

  function startLocalCameraFallback() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        rppgStream = stream;
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';

        // 添加叠加层 Canvas 用于绘制人脸框
        const overlay = document.createElement('canvas');
        overlay.width = 640;
        overlay.height = 480;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.position = 'absolute';
        overlay.style.left = '0';
        overlay.style.top = '0';

        if (cameraPreview) {
          cameraPreview.innerHTML = '';
          cameraPreview.style.position = 'relative';
          cameraPreview.appendChild(video);
          cameraPreview.appendChild(overlay);
        }

        const offscreen = document.createElement('canvas');
        const offctx = offscreen.getContext('2d');
        const ctx = overlay.getContext('2d');

        // 浏览器内置人脸检测（若可用）；避免引入 OpenCV 触发 CSP
        const hasFaceDetector = typeof window.FaceDetector === 'function';
        const faceDetector = hasFaceDetector ? new window.FaceDetector({ fastMode: true }) : null;
        let lastDetect = 0;
        let faces = [];

        initHeartRateChart();

        const series = [];
        const timestamps = [];
        const sampleMs = 1000 / 30; // 30fps 采样
        let rafId = null;

        function measure() {
          // 同步尺寸
          const vw = video.videoWidth || 640;
          const vh = video.videoHeight || 480;
          overlay.width = vw; overlay.height = vh;
          offscreen.width = vw; offscreen.height = vh;
          offctx.drawImage(video, 0, 0, vw, vh);

          // 固定 ROI 在上中区域（额头附近），请用户把脸居中
          const roiW = Math.round(vw * 0.22);
          const roiH = Math.round(vh * 0.12);
          const roiX = Math.round((vw - roiW) / 2);
          const roiY = Math.round(vh * 0.18);
          const img = offctx.getImageData(roiX, roiY, roiW, roiH).data;
          let gsum = 0; const pixels = roiW * roiH;
          for (let i = 0; i < img.length; i += 4) gsum += img[i + 1];
          const gmean = gsum / pixels;

          // 更新时序
          const now = performance.now();
          series.push(gmean);
          timestamps.push(now);
          while (series.length > 30 * 4) { series.shift(); timestamps.shift(); }
          const fps = series.length > 1 ? 1000 / ((timestamps[timestamps.length - 1] - timestamps[0]) / (series.length - 1)) : 0;

          // 估计 BPM（简单峰值估计）
          const peaks = detectPeaks(series, Math.max(10, Math.min(60, Math.round(fps || 30))), null);
          let bpm = null;
          if (peaks.length >= 3 && fps) {
            const rr = [];
            for (let i = 1; i < peaks.length; i++) rr.push((peaks[i] - peaks[i - 1]) / fps);
            const meanRR = rr.reduce((s, v) => s + v, 0) / rr.length;
            if (meanRR > 0.3 && meanRR < 2.5) bpm = Math.round(60 / meanRR);
          }

          // 右侧 HRV 文本与波形
          updateHeartRateChartData(series.slice(), Math.round(fps || 30), bpm);
          const hrEl = document.getElementById('heart-rate-value');
          if (hrEl && bpm) hrEl.textContent = bpm;

          // 人脸检测与叠加绘制
          ctx.clearRect(0, 0, vw, vh);
          const nowTs = performance.now();
          if (faceDetector && nowTs - lastDetect > 100) {
            lastDetect = nowTs;
            try {
              faceDetector.detect(video).then(result => {
                faces = Array.isArray(result) ? result : [];
              }).catch(() => { /* 忽略检测错误 */ });
            } catch (e) { /* 某些浏览器可能抛出同步异常，忽略 */ }
          }
          if (faces && faces.length) {
            ctx.strokeStyle = '#22c55e'; // 绿色人脸框
            ctx.lineWidth = 2;
            for (const f of faces) {
              const bb = f.boundingBox || f;
              const x = Math.max(0, Math.round(bb.x));
              const y = Math.max(0, Math.round(bb.y));
              const w = Math.max(1, Math.round(bb.width));
              const h = Math.max(1, Math.round(bb.height));
              ctx.strokeRect(x, y, w, h);
            }
          }

          rafId = setTimeout(measure, sampleMs);
        }

        // 启动采样
        measure();
      })
      .catch(error => {
        console.error('获取相机权限失败:', error);
        alert('获取相机权限失败，请确保您已授予权限。');
      });
  }

  function initHeartRateChart() {
    const canvas = document.getElementById('hrv-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.clientWidth || 300;
    const H = canvas.clientHeight || 150;
    canvas.width = Math.max(W, 300);
    canvas.height = Math.max(H, 150);
    heartRateChart = {
      ctx,
      canvas,
      draw(series) {
        const N = Math.min(series.length, canvas.width);
        if (!N) return;
        const sub = series.slice(series.length - N);
        const minV = Math.min(...sub), maxV = Math.max(...sub);
        const amp = (maxV - minV) || 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 网格
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 3; i++) {
          const y = Math.round((i / 4) * canvas.height);
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }
        // 曲线
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const x = (i / (N - 1)) * canvas.width;
          const y = canvas.height - ((sub[i] - minV) / amp) * canvas.height;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };
  }

  // 基础模拟已移除，转为真实采样路径；保留函数占位避免外部调用报错
  function startRppgMonitoring() { /* 已改为 startLocalCameraFallback 进行真实采样 */ }

  stopRppgBtn.addEventListener('click', function() {
    // 停止 Heartbeat 实例（如有）
    try { if (heartbeatInstance && typeof heartbeatInstance.stop === 'function') heartbeatInstance.stop(); } catch(e) {}
    heartbeatInstance = null;

    // 关闭本地摄像头流（如有）
    if (rppgStream) rppgStream.getTracks().forEach(track => track.stop());
    rppgStream = null;

    clearInterval(rppgInterval);
    rppgActive = false;
    startRppgBtn.classList.remove('hidden');
    stopRppgBtn.classList.add('hidden');
    if (rppgStatus) rppgStatus.classList.add('hidden');
    if (cameraPreview) cameraPreview.innerHTML = '<i class="fa fa-video-camera text-gray-400 text-4xl"></i>';
    if (rppgPlaceholder) rppgPlaceholder.classList.remove('hidden');
    if (rppgResults) rppgResults.classList.add('hidden');
  });

  // 保留模拟处理函数（在某些按钮场景可能会使用）
  function simulateRppgAnalysis() {
      if (!rppgResults || !rppgPlaceholder || !startRppgBtn || !stopRppgBtn || !rppgStatus) return;
      stopRppgBtn.classList.add('hidden');
      rppgStatus.classList.add('hidden');
      startRppgBtn.classList.remove('hidden');
      rppgPlaceholder.innerHTML = '<div class="flex flex-col items-center justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div><p class="text-gray-500">正在处理数据...</p></div>';
      setTimeout(function() {
          rppgPlaceholder.classList.add('hidden');
          rppgResults.classList.remove('hidden');
          if (cameraPreview) cameraPreview.innerHTML = '<i class="fa fa-video-camera text-gray-400 text-4xl"></i>';
          const heartRate = Math.floor(Math.random() * 20) + 60;
          const hrEl = document.getElementById('heart-rate-value');
          if (hrEl) hrEl.textContent = heartRate;
          // 使用自绘曲线代替 Chart.js
          initHeartRateChart();
          const randomSeries = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 50);
          if (heartRateChart && typeof heartRateChart.draw === 'function') {
              heartRateChart.draw(randomSeries);
          }
      }, 1200);
  }
  // 暴露到全局以兼容页面可能的直接调用
  window.simulateRppgAnalysis = simulateRppgAnalysis;
});