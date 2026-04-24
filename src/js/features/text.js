// 文本情感分析模块
document.addEventListener('DOMContentLoaded', function() {
  const textAnalysisForm = document.getElementById('text-analysis-form');
  const textInput = document.getElementById('text-input');
  const textResults = document.getElementById('text-results');
  const textPlaceholder = document.getElementById('text-placeholder');

  if (!textAnalysisForm) return;

  textAnalysisForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!textInput || textInput.value.trim() === '') {
      alert('请输入要分析的文本。');
      return;
    }
    simulateTextAnalysis(textInput.value);
  });

  function simulateTextAnalysis(text) {
    if (!textResults || !textPlaceholder) return;
    // 加载态
    textPlaceholder.innerHTML = '<div class="flex flex-col items-center justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div><p class="text-gray-500">正在分析文本...</p></div>';
    setTimeout(function() {
      textPlaceholder.classList.add('hidden');
      textResults.classList.remove('hidden');
      const positiveScore = Math.floor(Math.random() * 50) + 50; // 50-100
      const negativeScore = 100 - positiveScore;
      const sentimentLabelEl = document.getElementById('sentiment-label');
      const sentimentScoreEl = document.getElementById('sentiment-score');
      const positiveScoreEl = document.getElementById('positive-score');
      const negativeScoreEl = document.getElementById('negative-score');
      if (sentimentLabelEl) sentimentLabelEl.textContent = positiveScore > 70 ? '积极' : positiveScore > 40 ? '中性' : '消极';
      if (sentimentScoreEl) sentimentScoreEl.textContent = `${positiveScore}%`;
      if (positiveScoreEl) positiveScoreEl.textContent = `${positiveScore}%`;
      if (negativeScoreEl) negativeScoreEl.textContent = `${negativeScore}%`;
      if (typeof gsap !== 'undefined') {
        gsap.to('#positive-bar', { width: `${positiveScore}%`, duration: 1 });
        gsap.to('#negative-bar', { width: `${negativeScore}%`, duration: 1 });
      } else {
        const posBar = document.querySelector('#positive-bar');
        const negBar = document.querySelector('#negative-bar');
        if (posBar) posBar.style.width = `${positiveScore}%`;
        if (negBar) negBar.style.width = `${negativeScore}%`;
      }
    }, 1500);
  }
});