// Core app initialization: AOS, mobile menu, back-to-top, tabs & feature buttons
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('tab-active'));
      tabPanes.forEach(pane => pane.classList.add('hidden'));
      // Add active class to clicked tab
      this.classList.add('tab-active');
      const pane = document.getElementById(`${tabId}-tab`);
      if (pane) pane.classList.remove('hidden');
    });
  });

  // Feature Buttons jump to analysis tool and activate tab
  const featureButtons = document.querySelectorAll('.feature-btn');
  const analysisTool = document.getElementById('analysis-tool');
  featureButtons.forEach(button => {
    button.addEventListener('click', function() {
      const feature = this.getAttribute('data-feature');
      if (analysisTool) {
        analysisTool.scrollIntoView({ behavior: 'smooth' });
        analysisTool.classList.remove('hidden');
      }
      tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === feature) {
          btn.click();
        }
      });
    });
  });

  // Get Started Button
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn && analysisTool) {
    getStartedBtn.addEventListener('click', function() {
      analysisTool.scrollIntoView({ behavior: 'smooth' });
      analysisTool.classList.remove('hidden');
    });
  }
});

// 全局通知函数，供各模块调用（替代内联脚本中的实现）
window.showNotification = function(message) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  if (!notification || !notificationMessage) return;
  notificationMessage.textContent = message;
  notification.classList.remove('opacity-0', 'invisible');
  notification.classList.add('opacity-100', 'visible');
  setTimeout(() => {
    notification.classList.remove('opacity-100', 'visible');
    notification.classList.add('opacity-0', 'invisible');
  }, 3000);
};