const RESCAN_INTERVAL = 1000;
const DEFAULT_FPS = 30;
const LOW_BPM = 42;
const HIGH_BPM = 240;
const REL_MIN_FACE_SIZE = 0.4;
const SEC_PER_MIN = 60;
const MSEC_PER_SEC = 1000;
const MAX_CORNERS = 10;
const MIN_CORNERS = 5;
const QUALITY_LEVEL = 0.01;
const MIN_DISTANCE = 10;

// Simple rPPG implementation in JavaScript
// - Code could be improved given better documentation available for opencv.js
class Heartbeat {
  constructor(webcamId, canvasId, classifierPath, targetFps, windowSize, rppgInterval) {
    this.webcamId = webcamId;
    this.canvasId = canvasId,
    this.classifierPath = classifierPath;
    this.streaming = false;
    this.faceValid = false;
    this.targetFps = targetFps;
    this.windowSize = windowSize;
    this.rppgInterval = rppgInterval;
    this.overlayRects = null;
    this.overlayLayer = null;
    this.currentBpm = null;
    this.onSignalUpdate = null;
  }
  // Start the video stream
  async startStreaming() {
    // 首次尝试：使用精确分辨率（可能在部分设备上失败）
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { exact: this.webcamVideoElement.width || 640 },
          height: { exact: this.webcamVideoElement.height || 480 }
        },
        audio: false
      });
    } catch (e1) {
      console.warn('getUserMedia exact 约束失败，回退到 ideal 分辨率:', e1);
      // 二次尝试：ideal 分辨率
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: this.webcamVideoElement.width || 640 },
            height: { ideal: this.webcamVideoElement.height || 480 }
          },
          audio: false
        });
      } catch (e2) {
        console.warn('getUserMedia ideal 分辨率失败，回退到最简约束:', e2);
        // 三次尝试：最简约束
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
          });
        } catch (e3) {
          console.error('getUserMedia 完全失败：', e3);
          throw e3;
        }
      }
    }
    if (!this.stream) {
      throw new Error('Could not obtain video from webcam.');
    }
    // Set srcObject to the obtained stream
    this.webcamVideoElement.srcObject = this.stream;
    // Start the webcam video stream
    this.webcamVideoElement.play();
    this.streaming = true;
    return new Promise(resolve => {
      // Add event listener to make sure the webcam has been fully initialized.
      this.webcamVideoElement.oncanplay = () => {
        resolve();
      };
    });
  }
  // Create file from url
  async createFileFromUrl(path, url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.send();
    return new Promise(resolve => {
      request.onload = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = new Uint8Array(request.response);
            cv.FS_createDataFile('/', path, data, true, false, false);
            resolve();
          } else {
            console.log('Failed to load ' + url + ' status: ' + request.status);
          }
        }
      };
    });
  }
  // Initialise the demo
  async init() {
    this.webcamVideoElement = document.getElementById(this.webcamId);
    try {
      await this.startStreaming();
      this.webcamVideoElement.width = this.webcamVideoElement.videoWidth;
      this.webcamVideoElement.height = this.webcamVideoElement.videoHeight;
      this.frameRGB = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC4);
      this.lastFrameGray = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC1);
      this.frameGray = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC1);
      this.overlayLayer = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC4);
      this.overlayLayer.setTo([0, 0, 0, 0]);
      this.cap = new cv.VideoCapture(this.webcamVideoElement);
      // Set variables
      this.signal = []; // 120 x 3 raw rgb values
      this.timestamps = []; // 120 x 1 timestamps
      this.rescan = []; // 120 x 1 rescan bool
      this.face = new cv.Rect();  // Position of the face
      // Load face detector
      this.classifier = new cv.CascadeClassifier();
      let faceCascadeFile = "haarcascade_frontalface_alt.xml";
      if (!this.classifier.load(faceCascadeFile)) {
        await this.createFileFromUrl(faceCascadeFile, this.classifierPath);
        this.classifier.load(faceCascadeFile)
      }
      this.scanTimer = setInterval(this.processFrame.bind(this),
        MSEC_PER_SEC/this.targetFps);
      this.rppgTimer = setInterval(this.rppg.bind(this), this.rppgInterval);
    } catch (e) {
      console.error('Heartbeat 初始化失败：', e);
      throw e;
    }
  }
  // Add one frame to raw signal
  processFrame() {
    try {
      if (!this.frameGray.empty()) {
        this.frameGray.copyTo(this.lastFrameGray); // Save last frame
      }
      this.cap.read(this.frameRGB); // Save current frame
      let time = Date.now()
      let rescanFlag = false;
      cv.cvtColor(this.frameRGB, this.frameGray, cv.COLOR_RGBA2GRAY);
      // Need to find the face
      if (!this.faceValid) {
        this.lastScanTime = time;
        this.detectFace(this.frameGray);
      }
      // Scheduled face rescan
      else if (time - this.lastScanTime >= RESCAN_INTERVAL) {
        this.lastScanTime = time
        this.detectFace(this.frameGray);
        rescanFlag = true;
      }
      // Track face
      else {
        // Disable for now,
        //this.trackFace(this.lastFrameGray, this.frameGray);
      }
      // Update the signal
      if (this.faceValid) {
        // Shift signal buffer
        while (this.signal.length > this.targetFps * this.windowSize) {
          this.signal.shift();
          this.timestamps.shift();
          this.rescan.shift();
        }
        // Get mask
        let mask = new cv.Mat();
        mask = this.makeMask(this.frameGray, this.face);
        // New values
        let means = cv.mean(this.frameRGB, mask);
        mask.delete();
        // Add new values to raw signal buffer
        this.signal.push(means.slice(0, 3));
        this.timestamps.push(time);
        this.rescan.push(rescanFlag);
      }
      // Draw face
      cv.rectangle(this.frameRGB, new cv.Point(this.face.x, this.face.y),
        new cv.Point(this.face.x+this.face.width, this.face.y+this.face.height),
        [0, 255, 0, 255]);
      if (this.overlayLayer) {
        cv.addWeighted(this.frameRGB, 1, this.overlayLayer, 1, 0, this.frameRGB);
      }
      this.renderBpmOnFrame();
      cv.imshow(this.canvasId, this.frameRGB);
    } catch (e) {
      console.log("Error capturing frame:");
      console.log(e);
    }
  }
  // Run face classifier
  detectFace(gray) {
    let faces = new cv.RectVector();
    this.classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
    if (faces.size() > 0) {
      this.face = faces.get(0);
      this.faceValid = true;
    } else {
      console.log("No faces");
      this.invalidateFace();
    }
    faces.delete();
  }
  // Make ROI mask from face
  makeMask(frameGray, face) {
    let result = cv.Mat.zeros(frameGray.rows, frameGray.cols, cv.CV_8UC1);
    let white = new cv.Scalar(255, 255, 255, 255);
    let pt1 = new cv.Point(Math.round(face.x + 0.3 * face.width),
      Math.round(face.y + 0.1 * face.height));
    let pt2 = new cv.Point(Math.round(face.x + 0.7 * face.width),
      Math.round(face.y + 0.25 * face.height));
    cv.rectangle(result, pt1, pt2, white, -1);
    return result;
  }
  // Invalidate the face
  invalidateFace() {
    this.signal = [];
    this.timestamps = [];
    this.rescan = [];
    if (this.overlayLayer) {
      this.overlayLayer.setTo([0, 0, 0, 0]);
    }
    this.face = new cv.Rect();
    this.faceValid = false;
    this.corners = [];
    this.currentBpm = null;
  }
  // Track the face
  trackFace(lastFrameGray, frameGray) {
    // If not available, detect some good corners to track within face
    let trackingMask = cv.Mat.zeros(frameGray.rows, frameGray.cols, cv.CV_8UC1);
    let squarePointData = new Uint8Array([
      this.face.x + 0.22 * this.face.width, this.face.y + 0.21 * this.face.height,
      this.face.x + 0.78 * this.face.width, this.face.y + 0.21 * this.face.height,
      this.face.x + 0.70 * this.face.width, this.face.y + 0.65 * this.face.height,
      this.face.x + 0.30 * this.face.width, this.face.y + 0.65 * this.face.height]);
    let squarePoints = cv.matFromArray(4, 1, cv.CV_32SC2, squarePointData);
    let pts = new cv.MatVector();
    let corners = new cv.Mat();
    pts.push_back(squarePoints);
    cv.fillPoly(trackingMask, pts, [255, 255, 255, 255]);
    cv.goodFeaturesToTrack(lastFrameGray, corners, MAX_CORNERS,
      QUALITY_LEVEL, MIN_DISTANCE, trackingMask, 3);
    trackingMask.delete(); squarePoints.delete(); pts.delete();

    // Calculate optical flow
    let corners_1 = new cv.Mat();
    let st = new cv.Mat();
    let err = new cv.Mat();
    let winSize = new cv.Size(15, 15);
    let maxLevel = 2;
    let criteria = new cv.TermCriteria(
      cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 0.03);
    cv.calcOpticalFlowPyrLK(lastFrameGray, frameGray, corners, corners_1,
      st, err, winSize, maxLevel, criteria);

    // Backtrack once
    let corners_0 = new cv.Mat();
    cv.calcOpticalFlowPyrLK(frameGray, lastFrameGray, corners_1, corners_0,
      st, err, winSize, maxLevel, criteria);
    // TODO exclude unmatched corners

    // Clean up
    st.delete(); err.delete();

    if (corners_1.rows >= MIN_CORNERS) {
      // Estimate affine transform
      const [s, tx, ty] = this.estimateAffineTransform(corners_0, corners_1);
      // Apply affine transform
      this.face = new cv.Rect(
        this.face.x * s + tx, this.face.y * s + ty,
        this.face.width * s, this.face.height * s);
    } else {
      this.invalidateFace();
    }

    corners.delete(); corners_1.delete(); corners_0.delete();
  }
  // For some reason this is not available in opencv.js, so implemented it
  estimateAffineTransform(corners_0, corners_1) {
    // Construct X and Y matrix
    let t_x = cv.matFromArray(corners_0.rows*2, 1, cv.CV_32FC1,
      Array.from(corners_0.data32F));
    let y = cv.matFromArray(corners_1.rows*2, 1, cv.CV_32FC1,
      Array.from(corners_1.data32F));
    let x = new cv.Mat(corners_0.rows*2, 3, cv.CV_32FC1);
    let t_10 = new cv.Mat(); let t_01 = new cv.Mat();
    cv.repeat(cv.matFromArray(2, 1, cv.CV_32FC1, [1, 0]), corners_0.rows, 1, t_10);
    cv.repeat(cv.matFromArray(2, 1, cv.CV_32FC1, [0, 1]), corners_0.rows, 1, t_01);
    t_x.copyTo(x.col(0));
    t_10.copyTo(x.col(1));
    t_01.copyTo(x.col(2));

    // Solve
    let res = cv.Mat.zeros(3, 1, cv.CV_32FC1);
    cv.solve(x, y, res, cv.DECOMP_SVD);

    // Clean up
    t_01.delete(); t_10.delete(); x.delete(); t_x.delete(); y.delete();

    return [res.data32F[0], res.data32F[1], res.data32F[2]];
  }
  // Compute rppg signal and estimate HR
  rppg() {
      // Update fps
      let fps = this.getFps(this.timestamps);
      // 如果样本未满窗口，也尽早推送部分时序数据用于右侧绘制
      if (this.signal.length > 5 && this.signal.length < this.targetFps * this.windowSize) {
          try {
              const greenSeries = this.signal.map(v => v[1]); // 绿色通道
              this.emitHrMetrics({ timeSeries: greenSeries, fps, bpm: this.currentBpm });
          } catch (err) {}
      }
      // 如果样本足够：正常估计并绘制频域（右侧时域由 rPPG.js 负责）
      if (this.signal.length >= this.targetFps * this.windowSize) {
          // Work with cv.Mat from here
          let signal = cv.matFromArray(this.signal.length, 1, cv.CV_32FC3,
            [].concat.apply([], this.signal));
          // Filtering
          this.denoise(signal, this.rescan);
          this.standardize(signal);
          this.detrend(signal, fps);
          this.movingAverage(signal, 3, Math.max(Math.floor(fps/6), 2));
          // HR estimation
          let greenSignal = this.selectGreen(signal);
          if (this.overlayLayer) {
            this.overlayLayer.setTo([0, 0, 0, 0]);
          }
          this.updateOverlayLayout();
          this.drawOverlayBackground();
          // Draw time domain signal
          let timeSignal = greenSignal.clone();
          // 不在摄像头预览中绘制时域波形，实时波形改在右侧 RMSSD/SDNN 下方通过 Chart 展示
          let freqSignal = greenSignal.clone();
          this.timeToFrequency(freqSignal, true);
          // Calculate band spectrum limits
          let sampleCount = freqSignal.rows;
          let nyquistIndex = Math.max(2, Math.floor(sampleCount / 2));
          let low = Math.floor(sampleCount * LOW_BPM / SEC_PER_MIN / fps);
          let high = Math.ceil(sampleCount * HIGH_BPM / SEC_PER_MIN / fps);
          low = Math.max(1, Math.min(low, nyquistIndex - 2));
          high = Math.max(low + 2, Math.min(high, nyquistIndex));
          if (!freqSignal.empty()) {
            // Mask for infeasible frequencies
            let maskArr = new Array(freqSignal.rows).fill(0).fill(1, low, high + 1);
            let bandMask = cv.matFromArray(freqSignal.rows, 1, cv.CV_8U, maskArr);
            let stats = cv.minMaxLoc(freqSignal, bandMask);
            this.drawFrequency(freqSignal, low, high, stats);
            // Infer BPM
            let bpmIndex = stats.maxLoc.y;
            let bpm = bpmIndex * fps / sampleCount * SEC_PER_MIN;
            this.currentBpm = bpm;
            console.log(bpm);
            // Draw BPM
            this.drawBPM(bpm);
            this.emitHrMetrics({
              timeSeries: Array.from(timeSignal.data32F),
              fps,
              bpm: this.currentBpm
            });
            bandMask.delete();
          }
          freqSignal.delete();
          timeSignal.delete();
          greenSignal.delete();
          signal.delete();
      } else {
          console.log("signal too small");
      }
  }
  // Calculate fps from timestamps
  getFps(timestamps, timeBase=1000) {
    if (Array.isArray(timestamps) && timestamps.length) {
      if (timestamps.length == 1) {
        return DEFAULT_FPS;
      } else {
        let diff = timestamps[timestamps.length-1] - timestamps[0];
        return timestamps.length/diff*timeBase;
      }
    } else {
      return DEFAULT_FPS;
    }
  }
  // Remove noise from face rescanning
  denoise(signal, rescan) {
    let diff = new cv.Mat();
    cv.subtract(signal.rowRange(1, signal.rows), signal.rowRange(0, signal.rows-1), diff);
    for (var i = 1; i < signal.rows; i++) {
      if (rescan[i] == true) {
        let adjV = new cv.MatVector();
        let adjR = cv.matFromArray(signal.rows, 1, cv.CV_32FC1,
          new Array(signal.rows).fill(0).fill(diff.data32F[(i-1)*3], i, signal.rows));
        let adjG = cv.matFromArray(signal.rows, 1, cv.CV_32FC1,
          new Array(signal.rows).fill(0).fill(diff.data32F[(i-1)*3+1], i, signal.rows));
        let adjB = cv.matFromArray(signal.rows, 1, cv.CV_32FC1,
          new Array(signal.rows).fill(0).fill(diff.data32F[(i-1)*3+2], i, signal.rows));
        adjV.push_back(adjR); adjV.push_back(adjG); adjV.push_back(adjB);
        let adj = new cv.Mat();
        cv.merge(adjV, adj);
        cv.subtract(signal, adj, signal);
        adjV.delete(); adjR.delete(); adjG.delete(); adjB.delete();
        adj.delete();
      }
    }
    diff.delete();
  }
  // Standardize signal
  standardize(signal) {
    let mean = new cv.Mat();
    let stdDev = new cv.Mat();
    let t1 = new cv.Mat();
    cv.meanStdDev(signal, mean, stdDev, t1);
    let means_c3 = cv.matFromArray(1, 1, cv.CV_32FC3, [mean.data64F[0], mean.data64F[1], mean.data64F[2]]);
    let stdDev_c3 = cv.matFromArray(1, 1, cv.CV_32FC3, [stdDev.data64F[0], stdDev.data64F[1], stdDev.data64F[2]]);
    let means = new cv.Mat(signal.rows, 1, cv.CV_32FC3);
    let stdDevs = new cv.Mat(signal.rows, 1, cv.CV_32FC3);
    cv.repeat(means_c3, signal.rows, 1, means);
    cv.repeat(stdDev_c3, signal.rows, 1, stdDevs);
    cv.subtract(signal, means, signal, t1, -1);
    cv.divide(signal, stdDevs, signal, 1, -1);
    mean.delete(); stdDev.delete(); t1.delete();
    means_c3.delete(); stdDev_c3.delete();
    means.delete(); stdDevs.delete();
  }
  // Remove trend in signal
  detrend(signal, lambda) {
    let h = cv.Mat.zeros(signal.rows-2, signal.rows, cv.CV_32FC1);
    let i = cv.Mat.eye(signal.rows, signal.rows, cv.CV_32FC1);
    let t1 = cv.Mat.ones(signal.rows-2, 1, cv.CV_32FC1)
    let t2 = cv.matFromArray(signal.rows-2, 1, cv.CV_32FC1,
      new Array(signal.rows-2).fill(-2));
    let t3 = new cv.Mat();
    t1.copyTo(h.diag(0)); t2.copyTo(h.diag(1)); t1.copyTo(h.diag(2));
    cv.gemm(h, h, lambda*lambda, t3, 0, h, cv.GEMM_1_T);
    cv.add(i, h, h, t3, -1);
    cv.invert(h, h, cv.DECOMP_LU);
    cv.subtract(i, h, h, t3, -1);
    let s = new cv.MatVector();
    cv.split(signal, s);
    cv.gemm(h, s.get(0), 1, t3, 0, s.get(0), 0);
    cv.gemm(h, s.get(1), 1, t3, 0, s.get(1), 0);
    cv.gemm(h, s.get(2), 1, t3, 0, s.get(2), 0);
    cv.merge(s, signal);
    h.delete(); i.delete();
    t1.delete(); t2.delete(); t3.delete();
    s.delete();
  }
  // Moving average on signal
  movingAverage(signal, n, kernelSize) {
    for (var i = 0; i < n; i++) {
      cv.blur(signal, signal, {height: kernelSize, width: 1});
    }
  }
  // TODO solve this more elegantly
  selectGreen(signal) {
    let rgb = new cv.MatVector();
    cv.split(signal, rgb);
    // TODO possible memory leak, delete rgb?
    let result = rgb.get(1);
    rgb.delete();
    return result;
  }
  // Convert from time to frequency domain
  timeToFrequency(signal, magnitude) {
    // Prepare planes
    let planes = new cv.MatVector();
    planes.push_back(signal);
    planes.push_back(new cv.Mat.zeros(signal.rows, 1, cv.CV_32F))
    let powerSpectrum = new cv.Mat();
    cv.merge(planes, signal);
    // Fourier transform
    cv.dft(signal, signal, cv.DFT_COMPLEX_OUTPUT);
    if (magnitude) {
      cv.split(signal, planes);
      cv.magnitude(planes.get(0), planes.get(1), signal);
    }
  }
  updateOverlayLayout() {
    if (!this.frameRGB || this.frameRGB.empty()) {
      return;
    }
    const frameWidth = this.frameRGB.cols;
    const frameHeight = this.frameRGB.rows;
    const margin = Math.max(Math.round(frameWidth * 0.02), 12);
    const spacing = Math.max(Math.round(frameHeight * 0.015), 8);
    const targetWidth = Math.round(frameWidth * 0.35);
    const availableWidth = Math.max(frameWidth - margin * 2, 40);
    const overlayWidth = Math.min(targetWidth, availableWidth);
    const maxPanelHeight = frameHeight - margin * 2 - spacing - 1;
    const targetHeight = Math.round(frameHeight * 0.2);
    const overlayHeight = Math.min(targetHeight, Math.floor(maxPanelHeight / 2));
    const timeRect = {
      x: margin,
      y: margin,
      width: overlayWidth,
      height: overlayHeight
    };
    const freqRect = {
      x: margin,
      y: margin + overlayHeight + spacing,
      width: overlayWidth,
      height: overlayHeight
    };
    const bpmX = Math.min(timeRect.x + timeRect.width + 20, frameWidth - margin - 80);
    this.overlayRects = {
      time: timeRect,
      freq: freqRect,
      bpm: {
        x: bpmX,
        y: Math.max(timeRect.y + 30, margin + 20)
      }
    };
  }
  drawOverlayBackground() {
    if (!this.overlayRects || !this.overlayLayer) {
      return;
    }
    const sections = [
      { key: 'time', label: 'TIME' },
      { key: 'freq', label: 'FREQ' }
    ];
    sections.forEach(section => {
      const rect = this.overlayRects[section.key];
      if (!rect) return;
      const topLeft = new cv.Point(rect.x, rect.y);
      const bottomRight = new cv.Point(rect.x + rect.width, rect.y + rect.height);
      cv.rectangle(this.overlayLayer, topLeft, bottomRight, [255, 255, 255, 120], 2, cv.LINE_4, 0);
      const labelY = Math.max(rect.y - 6, 12);
      cv.putText(this.overlayLayer, section.label,
        new cv.Point(rect.x, labelY),
        cv.FONT_HERSHEY_PLAIN, 1, [255, 255, 255, 200], 1);
    });
  }
  // Draw time domain signal directly on frameRGB (white waveform)
  drawTime(signal) {
    if (!this.overlayRects || !this.overlayRects.time || signal.empty() || !this.overlayLayer) {
      return;
    }
    let rect = this.overlayRects.time;
    // Display size
    let displayHeight = Math.max(rect.height - 8, 4);
    let displayWidth = Math.max(rect.width - 8, 4);
    // Signal
    let result = cv.minMaxLoc(signal);
    let range = Math.max(result.maxVal - result.minVal, 1e-3);
    let heightMult = displayHeight/range;
    let widthMult = displayWidth/Math.max(signal.rows-1, 1);
    let drawAreaTlX = rect.x + 4;
    let drawAreaBaseY = rect.y + rect.height - 4;
    let start = new cv.Point(drawAreaTlX,
      drawAreaBaseY - (signal.data32F[0]-result.minVal)*heightMult);
    for (var i = 1; i < signal.rows; i++) {
      let end = new cv.Point(drawAreaTlX+i*widthMult,
        drawAreaBaseY - (signal.data32F[i]-result.minVal)*heightMult);
      cv.line(this.overlayLayer, start, end, [255, 0, 0, 255], 2, cv.LINE_4, 0);
      start = end;
    }
  }
  // Draw frequency domain signal directly on frameRGB (red spectrum)
  drawFrequency(signal, low, high, stats=null) {
    if (!this.overlayRects || !this.overlayRects.freq || signal.empty() || !this.overlayLayer) {
      return;
    }
    let rect = this.overlayRects.freq;
    // Display size
    let displayHeight = Math.max(rect.height - 8, 4);
    let displayWidth = Math.max(rect.width - 8, 4);
    // Signal
    let result = stats || cv.minMaxLoc(signal);
    let range = Math.max(result.maxVal - result.minVal, 1e-3);
    let heightMult = displayHeight/range;
    let widthRange = Math.max(high - low, 1);
    let widthMult = displayWidth/widthRange;
    let drawAreaTlX = rect.x + 4;
    let drawAreaBaseY = rect.y + rect.height - 4;
    let start = new cv.Point(drawAreaTlX,
      drawAreaBaseY - (signal.data32F[low]-result.minVal)*heightMult);
    for (var i = low + 1; i <= high; i++) {
      let end = new cv.Point(drawAreaTlX+(i-low)*widthMult,
        drawAreaBaseY - (signal.data32F[i]-result.minVal)*heightMult);
      cv.line(this.overlayLayer, start, end, [255, 0, 0, 255], 2, cv.LINE_4, 0);
      start = end;
    }
  }
  // Draw tracking corners
  drawCorners(corners) {
    for (var i = 0; i < corners.rows; i++) {
      cv.circle(this.frameRGB, new cv.Point(
        corners.data32F[i*2], corners.data32F[i*2+1]),
        5, [0, 255, 0, 255], -1);
      //circle(frameRGB, corners[i], r, WHITE, -1, 8, 0);
      //line(frameRGB, Point(corners[i].x-5,corners[i].y), Point(corners[i].x+5,corners[i].y), GREEN, 1);
      //line(frameRGB, Point(corners[i].x,corners[i].y-5), Point(corners[i].x,corners[i].y+5), GREEN, 1);
    }
  }
  // Draw bpm string directly on frameRGB (red digits)
  drawBPM(bpm) {
    this.currentBpm = bpm;
    let point;
    if (this.overlayRects && this.overlayRects.bpm) {
      point = new cv.Point(this.overlayRects.bpm.x, this.overlayRects.bpm.y);
    } else {
      point = new cv.Point(this.face.x, this.face.y - 10);
    }
    const target = this.overlayLayer || this.frameRGB;
    cv.putText(target, `${bpm.toFixed(0)} bpm`,
      point,
      cv.FONT_HERSHEY_PLAIN, 1.5, [0, 0, 255, 255], 2);
  }
  renderBpmOnFrame() {
    if (typeof this.currentBpm !== 'number') {
      return;
    }
    let point;
    if (this.overlayRects && this.overlayRects.bpm) {
      point = new cv.Point(this.overlayRects.bpm.x, this.overlayRects.bpm.y);
    } else if (this.face && this.face.width) {
      point = new cv.Point(this.face.x, Math.max(20, this.face.y - 10));
    } else {
      point = new cv.Point(20, 40);
    }
    cv.putText(this.frameRGB, `${Math.round(this.currentBpm)} bpm`,
      point,
      cv.FONT_HERSHEY_PLAIN, 1.5, [0, 0, 255, 255], 2);
  }
  setSignalUpdateCallback(callback) {
    if (typeof callback === 'function') {
      this.onSignalUpdate = callback;
    } else {
      this.onSignalUpdate = null;
    }
  }
  emitHrMetrics(detail) {
    if (typeof this.onSignalUpdate === 'function') {
      try {
        console.log('[Heartbeat] emitHrMetrics', { fps: detail && detail.fps, len: detail && detail.timeSeries ? detail.timeSeries.length : undefined });
        this.onSignalUpdate(detail);
      } catch (err) {
        console.warn('Heartbeat signal update callback error:', err);
      }
    }
  }
  // Clean up resources
  stop() {
    clearInterval(this.rppgTimer);
    clearInterval(this.scanTimer);
    if (this.webcam) {
      this.webcamVideoElement.pause();
      this.webcamVideoElement.srcObject = null;
    }
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
    this.invalidateFace();
    this.streaming = false;
    this.frameRGB.delete();
    this.lastFrameGray.delete();
    this.frameGray.delete();
    if (this.overlayLayer) {
      this.overlayLayer.delete();
      this.overlayLayer = null;
    }
  }
}

// 暴露到全局作用域，便于非模块脚本直接使用
if (typeof window !== 'undefined') {
  window.Heartbeat = Heartbeat;
}