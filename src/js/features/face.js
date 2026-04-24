// 眨眼&疲劳检测模块：摄像头、与 WebSocket 实时监测
document.addEventListener('DOMContentLoaded', function() {
  const blinkStartBtn = document.getElementById('blink-live-start');
  const blinkStopBtn = document.getElementById('blink-live-stop');
  const blinkStatusText = document.getElementById('image-blink-text');
  const videoElement = document.getElementById('video-stream');
  const videoPreview = document.getElementById('face-camera-preview');
  const videoStatus = document.getElementById('video-status');

  // 实时指标元素
  const elEyeClosed = document.getElementById('blink-eye-closed');
  const elFatigued = document.getElementById('blink-fatigued');
  const elEarLeft = document.getElementById('blink-ear-left');
  const elEarRight = document.getElementById('blink-ear-right');
  const elEarAvg = document.getElementById('blink-ear-avg');
  const elPerclos = document.getElementById('blink-perclos');
  const elFatigueIdx = document.getElementById('blink-fatigue');
  const elEyeLine = document.getElementById('blink-eye-line');
  const elPitch = document.getElementById('blink-pitch');
  const elYaw = document.getElementById('blink-yaw');

  let cameraActive = false;
  let cameraStream = null;
  let blinkSocket = null;
  let blinkInterval = null;
  let overlayCanvas = null;
  let overlayCtx = null;

  async function startCamera() {
    try {
      console.log('Starting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      cameraStream = stream;
      if (videoElement) {
        videoElement.srcObject = stream;
        await videoElement.play();
      }
      if (videoPreview) {
        videoPreview.classList.remove('hidden');
        // 初始化 Overlay Canvas
        initOverlayCanvas();
      }
      if (videoStatus) videoStatus.textContent = '● 摄像头已开启';
      cameraActive = true;
      return true;
    } catch (error) {
      console.error('获取相机权限失败:', error);
      alert('获取相机权限失败，请确保您已授予权限并使用 HTTPS 访问。');
      return false;
    }
  }

  function initOverlayCanvas() {
    if (!videoPreview) return;
    overlayCanvas = document.getElementById('blink-overlay-canvas');
    if (!overlayCanvas) {
      overlayCanvas = document.createElement('canvas');
      overlayCanvas.id = 'blink-overlay-canvas';
      overlayCanvas.style.position = 'absolute';
      overlayCanvas.style.top = '0';
      overlayCanvas.style.left = '0';
      overlayCanvas.style.width = '100%';
      overlayCanvas.style.height = '100%';
      overlayCanvas.style.pointerEvents = 'none';
      overlayCanvas.style.zIndex = '10';
      videoPreview.style.position = 'relative';
      videoPreview.appendChild(overlayCanvas);
    }
    overlayCtx = overlayCanvas.getContext('2d');
  }

  function stopCamera() {
    console.log('Stopping camera...');
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }
    if (videoElement) videoElement.srcObject = null;
    if (videoPreview) videoPreview.classList.add('hidden');
    if (videoStatus) videoStatus.textContent = '等待相机启动...';
    cameraActive = false;
    if (overlayCtx && overlayCanvas) {
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    }
  }

  if (blinkStartBtn && blinkStopBtn) {
    blinkStartBtn.addEventListener('click', async function() {
      if (blinkSocket) return;

      // 1. 启动摄像头
      if (!cameraActive) {
        const success = await startCamera();
        if (!success) return;
      }

      // 2. 连接 WebSocket
      const wsUrl = window.SERVICE_ENDPOINTS?.blinkWS || `ws://${window.location.host}/ws`;
      console.log('Connecting to blink WebSocket:', wsUrl);
      
      blinkStatusText.textContent = '正在连接眨眼检测服务...';
      blinkStatusText.className = 'text-blue-600 text-xs mt-2 animate-pulse';

      try {
        blinkSocket = new WebSocket(wsUrl);

        blinkSocket.onopen = function() {
          console.log('Blink WebSocket connected');
          blinkStatusText.textContent = '● 眨眼检测服务已连接，正在捕获画面';
          blinkStatusText.className = 'text-green-600 text-xs mt-2';
          blinkStartBtn.disabled = true;
          blinkStartBtn.classList.add('opacity-50');
          
          startSendingFrames();
        };

        blinkSocket.onmessage = function(event) {
          try {
            const data = JSON.parse(event.data);
            if (data.error) {
              console.warn('Blink server error:', data.error);
              return;
            }
            
            // 更新 UI 指标
            updateUI(data);
            
            // 绘制眼睛轮廓
            drawEyes(data);
            
            // 更新状态文字
            const isClosed = data.eye_closed;
            const fatigueIndex = data.fatigue_index;
            const isFatigued = data.is_fatigued;
            
            if (isClosed) {
              blinkStatusText.textContent = `● 检测到眨眼！ (EAR: ${data.ear.toFixed(2)})`;
              blinkStatusText.classList.add('scale-110', 'font-bold');
              setTimeout(() => blinkStatusText.classList.remove('scale-110', 'font-bold'), 200);
            } else {
              blinkStatusText.textContent = `● 正在监测中... (EAR: ${data.ear.toFixed(2)})`;
            }
            
            if (isFatigued) {
              blinkStatusText.textContent = `⚠️ 警告：检测到疲劳 (指数: ${fatigueIndex}%)`;
              blinkStatusText.className = 'text-red-600 text-xs mt-2 font-bold animate-bounce';
            } else if (fatigueIndex > 20) {
              blinkStatusText.className = 'text-orange-500 text-xs mt-2 font-medium';
              blinkStatusText.textContent += ` | 疲劳倾向: ${fatigueIndex}%`;
            } else if (!isClosed) {
              blinkStatusText.className = 'text-green-600 text-xs mt-2';
            }
          } catch (e) {
            console.warn('解析眨眼数据失败:', e);
          }
        };

        blinkSocket.onerror = function(err) {
          console.error('Blink WebSocket error:', err);
          blinkStatusText.textContent = '❌ 连接错误：请确保后端服务已启动并允许跨域';
          blinkStatusText.className = 'text-red-600 text-xs mt-2';
          stopBlink();
        };

        blinkSocket.onclose = function() {
          console.log('Blink WebSocket closed');
          stopBlink();
        };
      } catch (err) {
        console.error('Blink WebSocket initialization failed:', err);
        blinkStatusText.textContent = '❌ 无法初始化连接';
        blinkStatusText.className = 'text-red-600 text-xs mt-2';
      }
    });

    blinkStopBtn.addEventListener('click', function() {
      stopBlink();
      stopCamera();
      resetUI();
    });
  }

  function updateUI(data) {
    if (elEyeClosed) elEyeClosed.textContent = data.eye_closed ? '是' : '否';
    if (elFatigued) elFatigued.textContent = data.is_fatigued ? '是' : '否';
    if (elEarLeft) elEarLeft.textContent = data.ear_l.toFixed(2);
    if (elEarRight) elEarRight.textContent = data.ear_r.toFixed(2);
    if (elEarAvg) elEarAvg.textContent = data.ear.toFixed(2);
    if (elPerclos) elPerclos.textContent = (data.perclos * 100).toFixed(1) + '%';
    if (elFatigueIdx) elFatigueIdx.textContent = data.fatigue_index;
    if (elEyeLine) elEyeLine.textContent = data.eye_angle.toFixed(1);
    if (elPitch) elPitch.textContent = data.pitch.toFixed(1);
    if (elYaw) elYaw.textContent = data.yaw.toFixed(1);

    // 动态颜色
    if (elFatigued && data.is_fatigued) elFatigued.className = 'font-mono text-red-600 font-bold';
    else if (elFatigued) elFatigued.className = 'font-mono text-blue-700';
  }

  function resetUI() {
    [elEyeClosed, elFatigued, elEarLeft, elEarRight, elEarAvg, elPerclos, elFatigueIdx, elEyeLine, elPitch, elYaw].forEach(el => {
      if (el) el.textContent = '--';
    });
  }

  function drawEyes(data) {
    if (!overlayCtx || !overlayCanvas || !videoElement) return;

    // 匹配视频实际分辨率
    const vw = videoElement.videoWidth;
    const vh = videoElement.videoHeight;
    if (vw === 0) return;
    
    overlayCanvas.width = vw;
    overlayCanvas.height = vh;

    overlayCtx.clearRect(0, 0, vw, vh);
    overlayCtx.strokeStyle = '#00ff00';
    overlayCtx.lineWidth = 2;

    // 确定后端处理时使用的缩放比例 (后端收到的是 480px 宽度的图片)
    const backendWidth = 480;
    const scaleX = vw / backendWidth;
    const scaleY = vh / (vh * (backendWidth / vw)); // 简化后其实就是 vw / backendWidth

    const drawContour = (contour) => {
      if (!contour || contour.length === 0) return;
      overlayCtx.beginPath();
      overlayCtx.moveTo(contour[0][0] * scaleX, contour[0][1] * scaleY);
      for (let i = 1; i < contour.length; i++) {
        overlayCtx.lineTo(contour[i][0] * scaleX, contour[i][1] * scaleY);
      }
      overlayCtx.closePath();
      overlayCtx.stroke();
      
      // 填充半透明绿色
      overlayCtx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      overlayCtx.fill();
    };

    drawContour(data.left_eye);
    drawContour(data.right_eye);
  }

  function startSendingFrames() {
    if (blinkInterval) clearInterval(blinkInterval);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let frameCount = 0;
    
    console.log('Starting frame sending interval...');
    blinkInterval = setInterval(() => {
      if (!blinkSocket || blinkSocket.readyState !== WebSocket.OPEN) {
        console.log('WS not open, skipping frame');
        return;
      }
      if (!cameraActive || !videoElement) {
        console.log('Camera or video element not ready:', { cameraActive, videoElement: !!videoElement });
        return;
      }
      if (videoElement.paused || videoElement.ended) {
        console.log('Video paused or ended');
        return;
      }
      
      const vw = videoElement.videoWidth;
      const vh = videoElement.videoHeight;
      
      if (vw === 0 || vh === 0) {
        console.log('Video dimensions are 0, waiting for metadata...');
        return;
      }
      
      const targetWidth = 480; 
      const scale = targetWidth / vw;
      canvas.width = targetWidth;
      canvas.height = vh * scale;
      
      try {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
        if (base64) {
          blinkSocket.send(JSON.stringify({ image: base64 }));
          if (frameCount % 10 === 0) console.log(`Sent ${frameCount} frames...`);
          frameCount++;
        } else {
          console.warn('Failed to get base64 from canvas');
        }
      } catch (e) {
        console.error('Error in startSendingFrames:', e);
      }
    }, 150); // 约 6-7 FPS
  }

  function stopBlink() {
    if (blinkInterval) {
      clearInterval(blinkInterval);
      blinkInterval = null;
    }
    if (blinkSocket) {
      blinkSocket.close();
      blinkSocket = null;
    }
    if (blinkStartBtn) {
      blinkStartBtn.disabled = false;
      blinkStartBtn.classList.remove('opacity-50');
    }
    if (blinkStatusText && !blinkStatusText.textContent.includes('错误')) {
      blinkStatusText.textContent = '实时检测已停止';
      blinkStatusText.className = 'text-gray-600 text-xs mt-2';
    }
    if (overlayCtx && overlayCanvas) {
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    }
  }
});
