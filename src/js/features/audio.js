// 语音情感分析模块：录音与文件上传、情感分析、交互式对话
document.addEventListener('DOMContentLoaded', function() {
  const audioAnalysisForm = document.getElementById('audio-analysis-form');
  const audioFileInput    = document.getElementById('audio-file');
  const recordBtn         = document.getElementById('record-btn');
  const stopBtn           = document.getElementById('stop-btn');
  const recordingStatus   = document.getElementById('recording-status');
  const audioResults      = document.getElementById('audio-results');
  const audioPlaceholder  = document.getElementById('audio-placeholder');

  // 对话 UI 元素
  const chatMessages  = document.getElementById('audio-chat-messages');
  const chatInput     = document.getElementById('audio-chat-input');
  const chatSend      = document.getElementById('audio-chat-send');
  const chatMic       = document.getElementById('audio-chat-mic');
  const chatVoiceBar  = document.getElementById('chat-voice-bar');
  const chatVoiceText = document.getElementById('chat-voice-transcript');

  if (!audioAnalysisForm) return;

  let mediaRecorder;
  let audioChunks   = [];
  let recognition   = null;
  let liveTranscript = '';
  let isRecognizing  = false;

  // Moonshot API Key
  const MOONSHOT_API_KEY = new URLSearchParams(window.location.search).get('moonshot_key')
    || window.localStorage.getItem('moonshot_api_key') || '';

  // ── 多轮对话状态 ──────────────────────────────────────────────
  let chatHistory = [];   // { role: 'user'|'assistant', content: string }[]
  let isChatting  = false;

  // 对话录音状态
  let chatRecorder    = null;
  let chatRecording   = false;
  let chatRecognition = null;
  let chatLiveText    = '';

  // ── 录音 ──────────────────────────────────────────────────────
  if (recordBtn && stopBtn && recordingStatus) {
    recordBtn.addEventListener('click', function() {
      recordBtn.classList.add('hidden');
      stopBtn.classList.remove('hidden');
      recordingStatus.classList.remove('hidden');
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorder = new MediaRecorder(stream);
          audioChunks = [];
          mediaRecorder.addEventListener('dataavailable', e => audioChunks.push(e.data));
          mediaRecorder.addEventListener('stop', () => {
            const blob = new Blob(audioChunks, { type: 'audio/wav' });
            const file = new File([blob], 'recorded_audio.wav', { type: 'audio/wav' });
            const dt = new DataTransfer();
            dt.items.add(file);
            if (audioFileInput) audioFileInput.files = dt.files;
            updateAudioUploadArea(file);
          });
          mediaRecorder.start();

          try {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SR && !isRecognizing) {
              recognition = new SR();
              recognition.lang = 'zh-CN';
              recognition.continuous = true;
              recognition.interimResults = true;
              liveTranscript = '';
              recognition.onresult = (event) => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                  if (event.results[i].isFinal)
                    liveTranscript += (event.results[i][0].transcript || '') + ' ';
                }
              };
              recognition.onerror = () => {};
              recognition.onend = () => { isRecognizing = false; };
              recognition.start();
              isRecognizing = true;
            }
          } catch (e) { console.warn('语音转写不可用:', e); }
        })
        .catch(err => {
          console.error('麦克风权限失败:', err);
          alert('获取麦克风权限失败，请确保已授予权限。');
          recordBtn.classList.remove('hidden');
          stopBtn.classList.add('hidden');
          recordingStatus.classList.add('hidden');
        });
    });

    stopBtn.addEventListener('click', function() {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
      recordBtn.classList.remove('hidden');
      stopBtn.classList.add('hidden');
      recordingStatus.classList.add('hidden');
      mediaRecorder?.stream?.getTracks().forEach(t => t.stop());
      try { if (recognition && isRecognizing) { recognition.stop(); isRecognizing = false; } } catch {}
    });
  }

  // ── 表单提交 ──────────────────────────────────────────────────
  audioAnalysisForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!audioFileInput?.files?.length) {
      alert('请上传音频文件或录制您的声音。');
      return;
    }
    analyzeAudio();
  });

  // ── 主分析流程 ────────────────────────────────────────────────
  async function analyzeAudio() {
    if (!audioPlaceholder || !audioResults) return;

    // 重置对话
    chatHistory = [];
    isChatting = false;
    if (chatMessages) {
      chatMessages.innerHTML = '<p id="audio-chat-placeholder" class="text-gray-400 text-sm text-center mt-auto">正在分析中，请稍候…</p>';
    }
    if (chatInput)  { chatInput.disabled = true; chatInput.value = ''; }
    if (chatSend)   chatSend.disabled = true;

    audioPlaceholder.classList.remove('hidden');
    audioResults.classList.add('hidden');
    audioPlaceholder.innerHTML = '<div class="flex flex-col items-center justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div><p class="text-gray-500">正在分析音频…</p></div>';

    try {
      const file = audioFileInput?.files?.[0];
      if (!file) { alert('未找到音频文件。'); return; }

      let transcript = '';
      try {
        transcript = liveTranscript?.trim() || await transcribeUploadedFile(file);
      } catch (e) { console.warn('转写失败:', e); }

      const features = await extractAudioFeatures(file);
      const result   = await requestEmotionAnalysis(features, transcript);

      // 更新情绪条
      audioPlaceholder.classList.add('hidden');
      audioResults.classList.remove('hidden');

      const scores = result?.scores || {};
      const label  = result?.label  || inferLabelFromScores(scores);

      const labelEl = document.getElementById('audio-emotion-label');
      const scoreEl = document.getElementById('audio-emotion-score');
      if (labelEl) labelEl.textContent = mapLabelToZh(label);
      if (scoreEl) {
        const mainPct = Math.max(...Object.values(scores).map(Number));
        scoreEl.textContent = `${Math.round(mainPct)}%`;
      }
      ['happy','sad','angry','neutral'].forEach(type => {
        const v = Math.round(scores?.[type] ?? 0);
        const sp = document.getElementById(`${type}-score`);
        const bar = document.getElementById(`${type}-bar`);
        if (sp) sp.textContent = `${v}%`;
        if (typeof gsap !== 'undefined' && bar) gsap.to(`#${type}-bar`, { width: `${v}%`, duration: 0.8 });
        else if (bar) bar.style.width = `${v}%`;
      });

      // 更新问题定位
      await updateIssueSummary(label, scores, transcript);

      // 启动对话：构建系统提示并发送第一条 AI 消息
      await startChat(label, scores, features, transcript);

    } catch (err) {
      console.error('分析失败:', err);
      audioPlaceholder.classList.add('hidden');
      audioResults.classList.remove('hidden');
      const fallback = { label: 'neutral', scores: { happy: 25, sad: 25, angry: 10, neutral: 40 } };
      const labelEl = document.getElementById('audio-emotion-label');
      const scoreEl = document.getElementById('audio-emotion-score');
      if (labelEl) labelEl.textContent = mapLabelToZh(fallback.label);
      if (scoreEl) scoreEl.textContent = `${fallback.scores.neutral}%`;
      ['happy','sad','angry','neutral'].forEach(type => {
        const v = fallback.scores[type];
        const sp = document.getElementById(`${type}-score`);
        const bar = document.getElementById(`${type}-bar`);
        if (sp) sp.textContent = `${v}%`;
        if (bar) bar.style.width = `${v}%`;
      });
      // 问题定位回退
      const issueBox  = document.getElementById('audio-issue-box');
      const issueText = document.getElementById('audio-issue-text');
      if (issueBox && issueText) {
        issueText.textContent = '分析遇到问题，情绪状态未能完整识别。';
        issueBox.classList.remove('hidden');
      }
      appendMessage('assistant', fallbackComfortByLabel('neutral'));
      enableChatInput();
    }
  }

  // ── 问题定位 ──────────────────────────────────────────────────
  async function updateIssueSummary(label, scores, transcript) {
    const issueBox  = document.getElementById('audio-issue-box');
    const issueText = document.getElementById('audio-issue-text');
    if (!issueBox || !issueText) return;

    issueBox.classList.remove('hidden');
    issueText.textContent = '正在生成问题定位…';

    try {
      const zhLabel = mapLabelToZh(label);
      const prompt = `根据以下语音情感分析结果，用一句话（20字以内）简洁指出用户当前的情绪问题或状态核心，不要建议，只描述问题。
主导情绪：${zhLabel}，分布：开心${scores.happy??0}% 伤心${scores.sad??0}% 生气${scores.angry??0}% 中性${scores.neutral??0}%
转写内容：${transcript || '（无）'}
只返回一句话，不加任何前缀或标点以外的内容。`;

      const summary = await callMoonshot([
        { role: 'system', content: '你是情感分析助手，只输出简短的问题定位描述。' },
        { role: 'user', content: prompt }
      ]);
      issueText.textContent = summary || `当前主导情绪为${zhLabel}`;
    } catch (e) {
      console.warn('问题定位生成失败:', e);
      issueText.textContent = `当前主导情绪为${mapLabelToZh(label)}`;
    }
  }

  // ── 问题定位摘要 ──────────────────────────────────────────────
  async function updateIssueSummary(label, scores, transcript) {
    const issueBox  = document.getElementById('audio-issue-box');
    const issueText = document.getElementById('audio-issue-text');
    if (!issueBox || !issueText) return;

    issueText.textContent = '正在生成问题定位…';
    issueBox.classList.remove('hidden');

    try {
      const summary = await callMoonshot([
        { role: 'system', content: '你是情感分析助手。根据情绪分析结果，用一句话（20字以内）精准概括用户当前的情绪问题或状态，语气客观简洁，不要安慰，不要建议。' },
        { role: 'user', content: `主导情绪：${mapLabelToZh(label)}，分布：开心${scores.happy??0}% 伤心${scores.sad??0}% 生气${scores.angry??0}% 中性${scores.neutral??0}%，转写：${transcript||'（无）'}` }
      ]);
      issueText.textContent = summary || '情绪状态已分析完成。';
    } catch (e) {
      issueText.textContent = `主导情绪为${mapLabelToZh(label)}，情绪状态已识别。`;
    }
  }

  // ── 对话初始化 ────────────────────────────────────────────────
  async function startChat(label, scores, features, transcript) {
    const systemPrompt = buildSystemPrompt(label, scores, features, transcript);
    chatHistory = [{ role: 'system', content: systemPrompt }];

    // 清空占位符
    if (chatMessages) chatMessages.innerHTML = '';

    // 让 AI 先说第一句
    const firstMsg = await callMoonshot(chatHistory);
    chatHistory.push({ role: 'assistant', content: firstMsg });
    appendMessage('assistant', firstMsg);
    enableChatInput();
  }

  // ── 用户发送消息 ──────────────────────────────────────────────
  async function sendUserMessage() {
    const text = chatInput?.value?.trim();
    if (!text || isChatting) return;

    chatInput.value = '';
    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    isChatting = true;
    chatInput.disabled = true;
    chatSend.disabled  = true;

    // 打字指示器
    const typingId = appendTypingIndicator();

    try {
      const reply = await callMoonshot(chatHistory);
      chatHistory.push({ role: 'assistant', content: reply });
      removeTypingIndicator(typingId);
      appendMessage('assistant', reply);
    } catch (e) {
      console.error('对话请求失败:', e);
      removeTypingIndicator(typingId);
      appendMessage('assistant', '抱歉，网络出了点问题，请稍后再试。');
    } finally {
      isChatting = false;
      enableChatInput();
    }
  }

  if (chatSend) chatSend.addEventListener('click', sendUserMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendUserMessage(); }
    });
  }

  // ── 对话录音切换 ──────────────────────────────────────────────
  if (chatMic) {
    chatMic.addEventListener('click', function() {
      if (!chatRecording) startChatRecording();
      else stopChatRecording();
    });
  }

  function startChatRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      chatRecording = true;
      chatLiveText  = '';

      // 切换 UI：隐藏文字输入，显示录音条，麦克风按钮变红
      chatInput.classList.add('hidden');
      chatVoiceBar?.classList.remove('hidden');
      chatVoiceBar?.classList.add('flex');
      if (chatVoiceText) chatVoiceText.textContent = '正在聆听…';
      chatMic.classList.add('text-red-500', 'border-red-400', 'bg-red-50');
      chatMic.classList.remove('text-gray-500', 'border-gray-300', 'bg-white');
      chatMic.setAttribute('aria-label', '停止录音');
      chatMic.querySelector('i').className = 'fa fa-stop';
      chatSend.disabled = true;

      // MediaRecorder（备用：录音完成后作为音频上传）
      chatRecorder = new MediaRecorder(stream);
      chatRecorder.addEventListener('stop', () => {
        stream.getTracks().forEach(t => t.stop());
      });
      chatRecorder.start();

      // SpeechRecognition 实时转写
      try {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SR) {
          chatRecognition = new SR();
          chatRecognition.lang = 'zh-CN';
          chatRecognition.continuous = true;
          chatRecognition.interimResults = true;
          chatRecognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const r = event.results[i];
              if (r.isFinal) chatLiveText += r[0].transcript;
              else interim += r[0].transcript;
            }
            if (chatVoiceText) chatVoiceText.textContent = (chatLiveText + interim) || '正在聆听…';
          };
          chatRecognition.onerror = () => {};
          chatRecognition.onend   = () => {};
          chatRecognition.start();
        }
      } catch (e) { console.warn('对话录音转写不可用:', e); }

    }).catch(err => {
      console.error('麦克风权限失败:', err);
      alert('无法获取麦克风权限。');
    });
  }

  function stopChatRecording() {
    chatRecording = false;

    // 停止录音
    if (chatRecorder && chatRecorder.state !== 'inactive') chatRecorder.stop();
    try { chatRecognition?.stop(); } catch {}

    // 恢复 UI
    chatInput.classList.remove('hidden');
    chatVoiceBar?.classList.add('hidden');
    chatVoiceBar?.classList.remove('flex');
    chatMic.classList.remove('text-red-500', 'border-red-400', 'bg-red-50');
    chatMic.classList.add('text-gray-500', 'border-gray-300', 'bg-white');
    chatMic.setAttribute('aria-label', '切换语音输入');
    chatMic.querySelector('i').className = 'fa fa-microphone';

    // 把转写文本填入输入框并自动发送
    const text = chatLiveText.trim();
    if (text) {
      chatInput.value = text;
      sendUserMessage();
    } else {
      chatSend.disabled = false;
      chatInput.focus();
    }
  }

  // ── Moonshot API 调用（走后端代理，Key 不暴露在前端） ────────
  async function callMoonshot(messages) {
    const proxyUrl = (window.SERVICE_ENDPOINTS?.main || window.location.origin) + '/chat';
    const resp = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'moonshot-v1-8k', messages, temperature: 0.8 })
    });
    if (!resp.ok) {
      const t = await resp.text();
      throw new Error(`Chat proxy ${resp.status}: ${t}`);
    }
    const data = await resp.json();
    return (data?.choices?.[0]?.message?.content || '').trim();
  }

  // ── 情绪分析请求 ──────────────────────────────────────────────
  async function requestEmotionAnalysis(features, transcript) {
    const messages = [
      { role: 'system', content: '你是语音情感分析助手。根据音频声学特征与语音内容转写共同推断情绪分布：{happy(开心), sad(伤心), angry(生气), neutral(中性)}，给出四类的百分比分布（总和为100）和主标签label。严格只返回JSON，不要任何多余文字。' },
      { role: 'user', content: `特征: ${JSON.stringify(features)}\n转写: ${transcript || '（无）'}\n请返回形如 {"label":"happy","scores":{"happy":70,"sad":10,"angry":5,"neutral":15}} 的JSON对象。` }
    ];
    const proxyUrl = (window.SERVICE_ENDPOINTS?.main || window.location.origin) + '/chat';
    const resp = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'moonshot-v1-8k', messages })
    });
    if (!resp.ok) { const t = await resp.text(); throw new Error(`Chat proxy ${resp.status}: ${t}`); }
    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || '';
    const match = content.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : JSON.parse(content);
  }

  // ── 系统提示构建 ──────────────────────────────────────────────
  function buildSystemPrompt(label, scores, features, transcript) {
    const zhLabel = mapLabelToZh(label);
    const styleHint = comfortStyleHint(label);
    return `你是一位温暖、专业的情感支持助手，正在与一位刚完成语音情感分析的用户进行对话。

【分析结果】
- 主导情绪：${zhLabel}（${label}）
- 情绪分布：开心 ${scores.happy ?? 0}%，伤心 ${scores.sad ?? 0}%，生气 ${scores.angry ?? 0}%，中性 ${scores.neutral ?? 0}%
- 声学特征：响度 ${Math.round(features.volumeDb)}dB，语音活动比例 ${(features.activityRatio * 100).toFixed(0)}%，基频约 ${Math.round(features.pitchHz)}Hz
- 语音转写：${transcript || '（未获取）'}

【对话风格】
${styleHint}
- 每次回复控制在 60 字以内，自然口语化，不使用列表或标题
- 主动关心用户感受，适时提出开放性问题引导倾诉
- 不做诊断，不给医疗建议，遇到严重情绪问题建议寻求专业帮助
- 第一条消息：先用一句话回应情绪，再用一个问题邀请用户分享`;
  }

  // ── UI 辅助函数 ───────────────────────────────────────────────
  function appendMessage(role, text) {
    if (!chatMessages) return;
    const isUser = role === 'user';
    const wrap = document.createElement('div');
    wrap.className = `flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`;

    if (!isUser) {
      wrap.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 self-end">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-white fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21s-6-4.35-9-7.5C1 10 3.5 7 6.5 7 8.5 7 10 8 12 9.5 14 8 15.5 7 17.5 7 20.5 7 23 10 21 13.5 18 16.65 12 21 12 21z"/>
          </svg>
        </div>
        <div class="max-w-[80%] bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-gray-800 shadow-sm leading-relaxed">${escapeHtml(text)}</div>`;
    } else {
      wrap.innerHTML = `
        <div class="max-w-[80%] bg-primary text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm shadow-sm leading-relaxed">${escapeHtml(text)}</div>`;
    }

    chatMessages.appendChild(wrap);
    requestAnimationFrame(() => { chatMessages.scrollTop = chatMessages.scrollHeight; });
  }

  function appendTypingIndicator() {
    if (!chatMessages) return null;
    const id = 'typing-' + Date.now();
    const wrap = document.createElement('div');
    wrap.id = id;
    wrap.className = 'flex justify-start items-end gap-2';
    wrap.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21s-6-4.35-9-7.5C1 10 3.5 7 6.5 7 8.5 7 10 8 12 9.5 14 8 15.5 7 17.5 7 20.5 7 23 10 21 13.5 18 16.65 12 21 12 21z"/>
        </svg>
      </div>
      <div class="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <span class="flex gap-1 items-center">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
        </span>
      </div>`;
    chatMessages.appendChild(wrap);
    requestAnimationFrame(() => { chatMessages.scrollTop = chatMessages.scrollHeight; });
    return id;
  }

  function removeTypingIndicator(id) {
    if (id) document.getElementById(id)?.remove();
  }

  function enableChatInput() {
    if (chatInput) chatInput.disabled = false;
    if (chatSend)  chatSend.disabled  = false;
    if (chatMic)   chatMic.disabled   = false;
    chatInput?.focus();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── 音频特征提取 ──────────────────────────────────────────────
  async function extractAudioFeatures(file) {
    const arrayBuffer = await file.arrayBuffer();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await new Promise((resolve, reject) => {
      audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
    });
    const sr   = audioBuffer.sampleRate;
    const data = audioBuffer.numberOfChannels > 0 ? audioBuffer.getChannelData(0) : new Float32Array();
    const N    = data.length;

    let sumSq = 0;
    for (let i = 0; i < N; i++) sumSq += data[i] * data[i];
    const rms      = Math.sqrt(sumSq / Math.max(N, 1));
    const volumeDb = 20 * Math.log10(rms + 1e-12);

    let zc = 0;
    for (let i = 1; i < N; i++) {
      if ((data[i-1] >= 0 && data[i] < 0) || (data[i-1] < 0 && data[i] >= 0)) zc++;
    }
    const zcr = zc / Math.max(N, 1);

    const midStart   = Math.max(0, Math.floor(N / 3));
    const windowSize = Math.min(8192, N - midStart);
    const segment    = data.slice(midStart, midStart + windowSize);
    const pitchHz    = estimatePitch(segment, sr);

    let activeCount = 0;
    const th = rms * 0.6;
    for (let i = 0; i < segment.length; i++) if (Math.abs(segment[i]) > th) activeCount++;
    const activityRatio = activeCount / Math.max(segment.length, 1);

    return { sampleRate: sr, durationSec: N / sr, rms, volumeDb, zcr, pitchHz, activityRatio };
  }

  function estimatePitch(x, sr) {
    const minLag = Math.floor(sr / 500);
    const maxLag = Math.floor(sr / 50);
    let bestLag = 0, bestCorr = -Infinity;
    for (let lag = minLag; lag <= Math.min(maxLag, x.length - 1); lag++) {
      let corr = 0;
      for (let i = 0; i + lag < x.length; i++) corr += x[i] * x[i + lag];
      corr /= (x.length - lag);
      if (corr > bestCorr) { bestCorr = corr; bestLag = lag; }
    }
    return (bestLag > 0 && bestCorr > 0) ? Math.round(sr / bestLag) : 0;
  }

  async function transcribeUploadedFile(file) {
    const STT_ENDPOINT = '';
    if (!STT_ENDPOINT) return '';
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('language', 'zh-CN');
    const resp = await fetch(STT_ENDPOINT, { method: 'POST', body: form });
    if (!resp.ok) throw new Error(`STT ${resp.status}`);
    const data = await resp.json().catch(() => null);
    return typeof data?.text === 'string' ? data.text : '';
  }

  // ── 工具函数 ──────────────────────────────────────────────────
  function comfortStyleHint(label) {
    const l = (label || '').toLowerCase();
    if (l === 'sad')    return '更多共情、理解与温柔支持，语气轻柔';
    if (l === 'angry')  return '稳重平和，建议自我调节与放松，不指责';
    if (l === 'happy')  return '积极肯定、鼓励保持状态，分享喜悦';
    return '平和轻柔，给予小鼓励与建议';
  }

  function fallbackComfortByLabel(label) {
    const l = (label || '').toLowerCase();
    if (l === 'sad')   return '我在，慢慢来，给自己一点温柔。';
    if (l === 'angry') return '先深呼吸放松片刻，等心稳了再处理。';
    if (l === 'happy') return '保持这份好状态，分享快乐也会更好。';
    return '给自己一点小休息，补充能量会更轻松。';
  }

  function mapLabelToZh(label) {
    return { happy: '开心', sad: '伤心', angry: '生气', neutral: '中性' }[(label || '').toLowerCase()] || '中性';
  }

  function inferLabelFromScores(scores) {
    let best = 'neutral', maxV = -1;
    for (const k of ['happy','sad','angry','neutral']) {
      if ((scores?.[k] ?? -1) > maxV) { maxV = scores[k]; best = k; }
    }
    return best;
  }

  function updateAudioUploadArea(file) {
    const hint     = document.getElementById('audio-upload-hint');
    const selected = document.getElementById('audio-upload-selected');
    const nameEl   = document.getElementById('audio-file-name');
    if (hint)     hint.classList.add('hidden');
    if (selected) { selected.classList.remove('hidden'); selected.classList.add('flex'); }
    if (nameEl)   nameEl.textContent = file.name;
  }
});
