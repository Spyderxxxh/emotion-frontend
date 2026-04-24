// 心理评估模块：逐题问答、计时、进度与结果展示（与 index.html 原逻辑一致）
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const startAssessmentBtn = document.getElementById('start-assessment-btn');
  const assessmentStart = document.getElementById('assessment-start');
  const assessmentQuestions = document.getElementById('assessment-questions');
  const assessmentResults = document.getElementById('assessment-results');
  const questionCategory = document.getElementById('question-category');
  const questionText = document.getElementById('question-text');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const prevQuestionBtn = document.getElementById('prev-question-btn');
  const nextQuestionBtn = document.getElementById('next-question-btn');
  const restartAssessmentBtn = document.getElementById('restart-assessment-btn');
  const downloadResultsBtn = document.getElementById('download-results-btn');
  const professionalHelp = document.getElementById('professional-help');
  const recommendationsContainer = document.getElementById('recommendations-container');
  
  // New Rest/Break Elements
  const restModal = document.getElementById('rest-modal');
  const continueBtn = document.getElementById('continue-assessment-btn');
  const takeBreakBtn = document.getElementById('take-break-btn');
  const restModalText = document.getElementById('rest-modal-text');

  if (!startAssessmentBtn || !assessmentQuestions) return;

  // Assessment state
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let assessmentTimer;
  let elapsedSeconds = 0;

  // 100 Psychological assessment questions（保持与原页一致）
  const questions = [
    { id: 1, text: "我感到情绪低落、沮丧或绝望。", category: "情绪状态" },
    { id: 2, text: "我对做事情失去了兴趣或乐趣。", category: "情绪状态" },
    { id: 3, text: "我感到疲倦或精力不足。", category: "情绪状态" },
    { id: 4, text: "我感到自卑，或认为自己是个失败者。", category: "情绪状态" },
    { id: 5, text: "我难以集中注意力。", category: "情绪状态" },
    { id: 6, text: "我有睡眠障碍（入睡困难、早醒或睡眠过多）。", category: "情绪状态" },
    { id: 7, text: "我的食欲发生了明显变化（食欲增加或减少）。", category: "情绪状态" },
    { id: 8, text: "我感到烦躁或易怒。", category: "情绪状态" },
    { id: 9, text: "我感到焦虑或紧张。", category: "情绪状态" },
    { id: 10, text: "我感到孤独或与他人隔离。", category: "情绪状态" },
    { id: 11, text: "我对未来感到希望。", category: "情绪状态" },
    { id: 12, text: "我能够体验到快乐或满足感。", category: "情绪状态" },
    { id: 13, text: "我的情绪波动较大。", category: "情绪状态" },
    { id: 14, text: "我感到紧张或坐立不安。", category: "情绪状态" },
    { id: 15, text: "我感到恐慌或害怕。", category: "情绪状态" },
    { id: 16, text: "我感到愤怒或怨恨。", category: "情绪状态" },
    { id: 17, text: "我感到内疚或自责。", category: "情绪状态" },
    { id: 18, text: "我感到无助或绝望。", category: "情绪状态" },
    { id: 19, text: "我感到麻木或情感迟钝。", category: "情绪状态" },
    { id: 20, text: "我能够从日常活动中获得乐趣。", category: "情绪状态" },
    { id: 21, text: "我喜欢与他人交往。", category: "社交能力" },
    { id: 22, text: "我有亲密的朋友或家人。", category: "社交能力" },
    { id: 23, text: "我能够表达自己的想法和感受。", category: "社交能力" },
    { id: 24, text: "我能够理解他人的感受。", category: "社交能力" },
    { id: 25, text: "我在社交场合感到舒适。", category: "社交能力" },
    { id: 26, text: "我能够建立新的人际关系。", category: "社交能力" },
    { id: 27, text: "我感到被他人接受和尊重。", category: "社交能力" },
    { id: 28, text: "我能够解决人际冲突。", category: "社交能力" },
    { id: 29, text: "我感到孤独或与他人隔离。", category: "社交能力" },
    { id: 30, text: "我害怕被拒绝或批评。", category: "社交能力" },
    { id: 31, text: "我能够信任他人。", category: "社交能力" },
    { id: 32, text: "我感到自己是团队的一部分。", category: "社交能力" },
    { id: 33, text: "我避免社交场合。", category: "社交能力" },
    { id: 34, text: "我感到难以与他人沟通。", category: "社交能力" },
    { id: 35, text: "我担心他人对我的看法。", category: "社交能力" },
    { id: 36, text: "我能够支持他人。", category: "社交能力" },
    { id: 37, text: "我感到自己与他人有情感联系。", category: "社交能力" },
    { id: 38, text: "我感到自己在社交方面不够自信。", category: "社交能力" },
    { id: 39, text: "我喜欢参加集体活动。", category: "社交能力" },
    { id: 40, text: "我感到自己在社交方面很有能力。", category: "社交能力" },
    { id: 41, text: "我感到压力很大。", category: "压力水平" },
    { id: 42, text: "我感到身体紧张或紧绷。", category: "压力水平" },
    { id: 43, text: "我有头痛、肌肉酸痛或其他身体不适。", category: "压力水平" },
    { id: 44, text: "我感到疲惫或精力不足。", category: "压力水平" },
    { id: 45, text: "我难以放松。", category: "压力水平" },
    { id: 46, text: "我感到时间紧迫或被任务压得喘不过气。", category: "压力水平" },
    { id: 47, text: "我感到焦虑或担忧。", category: "压力水平" },
    { id: 48, text: "我有消化问题（如胃痛、腹泻或便秘）。", category: "压力水平" },
    { id: 49, text: "我感到心跳加速或心悸。", category: "压力水平" },
    { id: 50, text: "我感到呼吸急促或呼吸困难。", category: "压力水平" },
    { id: 51, text: "我能够有效地管理压力。", category: "压力水平" },
    { id: 52, text: "我有良好的应对压力的策略。", category: "压力水平" },
    { id: 53, text: "我感到不堪重负。", category: "压力水平" },
    { id: 54, text: "我感到自己无法控制生活中的重要事情。", category: "压力水平" },
    { id: 55, text: "我感到自己能够应对挑战。", category: "压力水平" },
    { id: 56, text: "我感到自己的生活很平衡。", category: "压力水平" },
    { id: 57, text: "我经常感到匆忙或急躁。", category: "压力水平" },
    { id: 58, text: "我有充足的休息和放松时间。", category: "压力水平" },
    { id: 59, text: "我感到自己的工作或学习压力很大。", category: "压力水平" },
    { id: 60, text: "我感到自己能够放松和享受生活。", category: "压力水平" },
    { id: 61, text: "我对自己感到满意。", category: "自我认知" },
    { id: 62, text: "我了解自己的优点和缺点。", category: "自我认知" },
    { id: 63, text: "我有清晰的人生目标。", category: "自我认知" },
    { id: 64, text: "我感到自己有价值。", category: "自我认知" },
    { id: 65, text: "我接受自己的不完美。", category: "自我认知" },
    { id: 66, text: "我感到自己有能力应对挑战。", category: "自我认知" },
    { id: 67, text: "我对自己的未来感到乐观。", category: "自我认知" },
    { id: 68, text: "我感到自己在不断成长和进步。", category: "自我认知" },
    { id: 69, text: "我有良好的自尊。", category: "自我认知" },
    { id: 70, text: "我感到自己与他人平等。", category: "自我认知" },
    { id: 71, text: "我经常自我怀疑。", category: "自我认知" },
    { id: 72, text: "我感到自己不如他人。", category: "自我认知" },
    { id: 73, text: "我有明确的价值观和信念。", category: "自我认知" },
    { id: 74, text: "我感到自己能够做出明智的决策。", category: "自我认知" },
    { id: 75, text: "我感到自己有创造力。", category: "自我认知" },
    { id: 76, text: "我感到自己有领导能力。", category: "自我认知" },
    { id: 77, text: "我感到自己在社交方面很有能力。", category: "自我认知" },
    { id: 78, text: "我感到自己在学习或工作方面很有能力。", category: "自我认知" },
    { id: 79, text: "我感到自己能够表达自己的想法和感受。", category: "自我认知" },
    { id: 80, text: "我感到自己有良好的人际关系。", category: "自我认知" },
    { id: 81, text: "我对自己的生活感到满意。", category: "生活满意度" },
    { id: 82, text: "我感到自己的生活有意义。", category: "生活满意度" },
    { id: 83, text: "我感到自己的生活很充实。", category: "生活满意度" },
    { id: 84, text: "我感到自己的生活很平衡。", category: "生活满意度" },
    { id: 85, text: "我感到自己的生活很幸福。", category: "生活满意度" },
    { id: 86, text: "我感到自己的生活有目标。", category: "生活满意度" },
    { id: 87, text: "我感到自己的生活有方向。", category: "生活满意度" },
    { id: 88, text: "我感到自己的生活很有价值。", category: "生活满意度" },
    { id: 89, text: "我感到自己的生活很成功。", category: "生活满意度" },
    { id: 90, text: "我感到自己的生活很快乐。", category: "生活满意度" },
    { id: 91, text: "我感到自己的生活很有成就感。", category: "生活满意度" },
    { id: 92, text: "我感到自己的生活很有希望。", category: "生活满意度" },
    { id: 93, text: "我感到自己的生活很有意义。", category: "生活满意度" },
    { id: 94, text: "我感到自己的生活很有乐趣。", category: "生活满意度" },
    { id: 95, text: "我感到自己的生活很有激情。", category: "生活满意度" },
    { id: 96, text: "我感到自己的生活很有创造力。", category: "生活满意度" },
    { id: 97, text: "我感到自己的生活很有冒险精神。", category: "生活满意度" },
    { id: 98, text: "我感到自己的生活很有挑战性。", category: "生活满意度" },
    { id: 99, text: "我感到自己的生活很有安全感。", category: "生活满意度" },
    { id: 100, text: "我感到自己的生活很有自由。", category: "生活满意度" }
  ];

  // Start assessment
  startAssessmentBtn.addEventListener('click', function() {
    // Check for saved progress
    const saved = localStorage.getItem('assessment_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (confirm(`检测到您有上次未完成的进度（第 ${data.index + 1} 题），是否继续？`)) {
          userAnswers = data.answers;
          elapsedSeconds = data.time || 0;
          currentQuestionIndex = data.index;
          assessmentStart.classList.add('hidden');
          assessmentQuestions.classList.remove('hidden');
          startElapsedTimer();
          loadQuestion(currentQuestionIndex);
          return;
        }
      } catch (e) {
        console.error('Failed to load assessment progress:', e);
      }
    }
    
    assessmentStart.classList.add('hidden');
    assessmentQuestions.classList.remove('hidden');
    userAnswers = Array(questions.length).fill(null);
    elapsedSeconds = 0;
    startElapsedTimer();
    loadQuestion(0);
  });

  // Load question
  function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    questionCategory.textContent = question.category;
    questionText.textContent = question.text;
    
    // Update question group indicator
    const groupNum = Math.floor(index / 10) + 1;
    const groupStart = (groupNum - 1) * 10 + 1;
    const groupEnd = Math.min(groupNum * 10, questions.length);
    const groupProgressText = `${groupStart}-${groupEnd} 题`;
    
    const currentGroupEl = document.getElementById('current-group');
    const groupProgressEl = document.getElementById('group-progress');
    if (currentGroupEl) currentGroupEl.textContent = `第 ${groupNum} 组`;
    if (groupProgressEl) groupProgressEl.textContent = groupProgressText;

    const progress = Math.round((index + 1) / questions.length * 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${index + 1}/${questions.length}`;
    prevQuestionBtn.disabled = index === 0;
    prevQuestionBtn.classList.toggle('opacity-50', index === 0);
    prevQuestionBtn.classList.toggle('cursor-not-allowed', index === 0);
    
    if (index === questions.length - 1) {
      nextQuestionBtn.innerHTML = '提交评估 <i class="fa fa-check ml-2"></i>';
    } else {
      nextQuestionBtn.innerHTML = '下一题 <i class="fa fa-arrow-right ml-2"></i>';
    }

    // Reset all radio buttons and selection classes
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
      radio.checked = false;
      const label = radio.closest('.assessment-option');
      if (label) label.classList.remove('selected');
    });

    if (userAnswers[index] !== null) {
      const savedValue = userAnswers[index];
      const targetRadio = document.querySelector(`input[name="answer"][value="${savedValue}"]`);
      if (targetRadio) {
        targetRadio.checked = true;
        const label = targetRadio.closest('.assessment-option');
        if (label) label.classList.add('selected');
      }
    }
    
    // Auto-save progress
    saveProgress();
  }

  // Save progress to localStorage
  function saveProgress() {
    const progressData = {
      index: currentQuestionIndex,
      answers: userAnswers,
      time: elapsedSeconds
    };
    localStorage.setItem('assessment_progress', JSON.stringify(progressData));
  }

  // Handle option clicks for visual feedback
  document.querySelectorAll('.assessment-option').forEach(label => {
    label.onclick = function(e) {
      // 找到内部的 radio
      const radio = this.querySelector('input[type="radio"]');
      if (!radio) return;

      // 1. 清除所有选项的选中状态
      document.querySelectorAll('.assessment-option').forEach(opt => {
        opt.classList.remove('selected');
      });

      // 2. 设为选中
      this.classList.add('selected');
      radio.checked = true;

      // 3. 记录答案并保存进度
      userAnswers[currentQuestionIndex] = parseInt(radio.value);
      saveProgress();
      
      console.log(`Question ${currentQuestionIndex + 1} answered: ${radio.value}`);
    };
  });

  // 同时也监听 radio 的 change 事件以防万一
  document.querySelectorAll('input[name="answer"]').forEach(radio => {
    radio.onchange = function() {
      document.querySelectorAll('.assessment-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      const label = this.closest('.assessment-option');
      if (label) label.classList.add('selected');
      userAnswers[currentQuestionIndex] = parseInt(this.value);
      saveProgress();
    };
  });

  // Start elapsed time counter (no per-question countdown — avoids anxiety)
  function startElapsedTimer() {
    clearInterval(assessmentTimer);
    assessmentTimer = setInterval(function() {
      elapsedSeconds++;
      updateElapsedDisplay();
    }, 1000);
  }

  // Update elapsed time display
  function updateElapsedDisplay() {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const timerElement = document.getElementById('elapsed-time');
    if (!timerElement) return;
    const timeSpan = timerElement.querySelector('span');
    if (timeSpan) {
      timeSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  // Previous question
  prevQuestionBtn.addEventListener('click', function() {
    if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1);
  });

  // Next question
  nextQuestionBtn.addEventListener('click', nextQuestion);
  function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) { alert('请选择一个选项。'); return; }
    userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);
    
    const nextIdx = currentQuestionIndex + 1;
    
    // Check if it's the end of a group of 10
    if (nextIdx > 0 && nextIdx % 10 === 0 && nextIdx < questions.length) {
      showRestModal(nextIdx);
    } else if (currentQuestionIndex === questions.length - 1) {
      calculateResults();
      assessmentQuestions.classList.add('hidden');
      assessmentResults.classList.remove('hidden');
      clearInterval(assessmentTimer);
      localStorage.removeItem('assessment_progress'); // Clear on completion
    } else {
      loadQuestion(nextIdx);
    }
  }

  // Show rest modal
  function showRestModal(nextIndex) {
    if (!restModal) return;
    
    // Save current state before showing modal
    saveProgress();
    
    const groupNum = nextIndex / 10;
    if (restModalText) {
      restModalText.textContent = `您已完成第 ${groupNum} 组（1-10 题），数据已暂存。建议休息片刻以保持评估的准确性。`;
    }
    
    restModal.classList.remove('hidden');
    
    // Pause timer
    clearInterval(assessmentTimer);
  }

  // Rest Modal Button Handlers
  if (continueBtn) {
    continueBtn.addEventListener('click', function() {
      restModal.classList.add('hidden');
      startElapsedTimer();
      loadQuestion(currentQuestionIndex + 1);
    });
  }

  if (takeBreakBtn) {
    takeBreakBtn.addEventListener('click', function() {
      // 改变文案，让用户知道数据已保存
      if (restModalText) {
        restModalText.textContent = "数据已安全保存。您可以离开页面休息，稍后回来点击“开始评估”即可恢复进度。";
      }
      this.textContent = "已进入休息模式";
      this.disabled = true;
    });
  }

  // Calculate results
  function calculateResults() {
    const totalScore = userAnswers.reduce((sum, score) => sum + score, 0);
    const categories = ['情绪状态', '社交能力', '压力水平', '自我认知', '生活满意度'];
    const categoryScores = {};
    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const categoryAnswers = categoryQuestions.map(q => userAnswers[questions.findIndex(question => question.id === q.id)]);
      const categoryScore = categoryAnswers.reduce((sum, score) => sum + score, 0) / categoryAnswers.length;
      categoryScores[category] = categoryScore;
    });
    let overallStatus, statusColor, statusDescription;
    if (totalScore < 150) { overallStatus = '健康'; statusColor = '#10B981'; statusDescription = '您的心理健康状况良好'; }
    else if (totalScore < 250) { overallStatus = '轻度风险'; statusColor = '#F59E0B'; statusDescription = '您可能需要关注自己的心理健康'; }
    else { overallStatus = '建议介入'; statusColor = '#EF4444'; statusDescription = '建议寻求专业心理支持'; professionalHelp?.classList.remove('hidden'); }
    const statusTextEl = document.getElementById('status-text');
    const statusDescEl = document.getElementById('status-description');
    if (statusTextEl) statusTextEl.textContent = overallStatus;
    if (statusDescEl) statusDescEl.textContent = statusDescription;
    createDashboardChart(statusColor);
    updateCategoryAnalysis(categoryScores);
    renderRecommendations(totalScore, categoryScores);
  }

  // Restart assessment
  restartAssessmentBtn.addEventListener('click', function() {
    currentQuestionIndex = 0;
    userAnswers = [];
    elapsedSeconds = 0;
    clearInterval(assessmentTimer);
    localStorage.removeItem('assessment_progress'); // Clear saved progress
    assessmentResults.classList.add('hidden');
    assessmentStart.classList.remove('hidden');
    professionalHelp?.classList.add('hidden');
  });

  // Download results
  downloadResultsBtn.addEventListener('click', function() {
    alert('报告已生成，正在下载...');
    setTimeout(function() { if (typeof showNotification === 'function') showNotification('报告已成功下载'); }, 1000);
  });

  // Helpers
  function createDashboardChart(statusColor) {
    const ctx = document.getElementById('status-dashboard')?.getContext('2d');
    if (!ctx) return;
    // 若 Chart 未加载（CDN 网络问题），则跳过图表绘制，避免报错
    if (typeof Chart === 'undefined') return;
    let percentage; if (statusColor === '#10B981') percentage = 85; else if (statusColor === '#F59E0B') percentage = 60; else percentage = 30;
    new Chart(ctx, { type: 'doughnut', data: { datasets: [{ data: [percentage, 100 - percentage], backgroundColor: [statusColor, 'rgba(200,200,200,0.2)'], borderWidth: 0, cutout: '80%' }] } , options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }, animation: { animateRotate: true, animateScale: true } });
  }

  function updateCategoryAnalysis(categoryScores) {
    const categoryMap = { '情绪状态': 'emotional-stability', '社交能力': 'social-ability', '压力水平': 'stress-level', '自我认知': 'self-awareness', '生活满意度': 'life-satisfaction' };
    Object.keys(categoryScores).forEach(category => {
      const score = categoryScores[category];
      const percentage = Math.round((score / 5) * 100);
      const elementId = categoryMap[category];
      if (elementId) {
        const barElement = document.getElementById(`${elementId}-bar`);
        const scoreElement = document.getElementById(`${elementId}-score`);
        if (barElement && scoreElement) {
          scoreElement.textContent = `${percentage}%`;
          if (typeof gsap !== 'undefined') gsap.to(barElement, { width: `${percentage}%`, duration: 1 });
          if (percentage >= 70) { barElement.classList.remove('bg-yellow-500', 'bg-red-500'); barElement.classList.add('bg-green-500'); }
          else if (percentage >= 40) { barElement.classList.remove('bg-green-500', 'bg-red-500'); barElement.classList.add('bg-yellow-500'); }
          else { barElement.classList.remove('bg-green-500', 'bg-yellow-500'); barElement.classList.add('bg-red-500'); }
        }
      }
    });
  }

  function renderRecommendations(totalScore, categoryScores) {
    if (!recommendationsContainer) return;
    recommendationsContainer.innerHTML = '';
    const recommendations = [];
    if (totalScore < 150) {
      recommendations.push({ title: '保持健康的生活方式', description: '规律作息、均衡饮食和适量运动有助于维持良好的心理健康状态。', icon: 'check', color: 'green' });
      recommendations.push({ title: '保持社交互动', description: '与亲朋好友保持联系，参加社交活动，有助于缓解压力和焦虑。', icon: 'comments', color: 'green' });
    } else if (totalScore < 250) {
      recommendations.push({ title: '学习放松技巧', description: '尝试冥想、深呼吸或瑜伽等放松技巧，有助于减轻压力和改善情绪。', icon: 'lightbulb-o', color: 'yellow' });
      recommendations.push({ title: '关注情绪变化', description: '留意自己的情绪变化，尝试记录情绪日记，了解情绪触发因素。', icon: 'heart', color: 'yellow' });
    } else {
      recommendations.push({ title: '寻求专业帮助', description: '建议咨询学校心理咨询中心或专业心理医生，获取更详细的评估和支持。', icon: 'exclamation-triangle', color: 'red' });
      recommendations.push({ title: '建立支持网络', description: '与亲朋好友分享自己的感受，建立支持网络，不要独自面对困难。', icon: 'users', color: 'red' });
    }
    Object.keys(categoryScores).forEach(category => {
      const score = categoryScores[category];
      if (score < 2.5) {
        let title, description, icon, color;
        switch (category) {
          case '情绪状态': title = '关注情绪健康'; description = '尝试每天做一些让自己开心的事情，培养积极情绪。'; icon = 'smile-o'; color = 'yellow'; break;
          case '社交能力': title = '提升社交技能'; description = '参加社交技能培训课程，逐步提高社交自信。'; icon = 'handshake-o'; color = 'yellow'; break;
          case '压力水平': title = '管理压力'; description = '学习时间管理技巧，合理安排任务，避免过度压力。'; icon = 'clock-o'; color = 'yellow'; break;
          case '自我认知': title = '增强自我认知'; description = '尝试自我反思，了解自己的优点和缺点，接纳自己。'; icon = 'user'; color = 'yellow'; break;
          case '生活满意度': title = '寻找生活意义'; description = '尝试新的爱好或兴趣，寻找生活的意义和目标。'; icon = 'star'; color = 'yellow'; break;
        }
        if (title) recommendations.push({ title, description, icon, color });
      }
    });
    const topRecommendations = recommendations.slice(0, 3);
    topRecommendations.forEach(rec => {
      const recElement = document.createElement('div');
      recElement.className = 'flex items-start mb-4';
      recElement.innerHTML = `
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-${rec.color}-100 flex items-center justify-center mr-4">
          <i class="fa fa-${rec.icon} text-${rec.color}-500"></i>
        </div>
        <div>
          <h5 class="font-medium mb-1">${rec.title}</h5>
          <p class="text-gray-600">${rec.description}</p>
        </div>
      `;
      recommendationsContainer.appendChild(recElement);
    });
  }
});