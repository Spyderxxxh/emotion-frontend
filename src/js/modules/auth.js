// 认证模块：注册、登录、验证码与登录状态
document.addEventListener('DOMContentLoaded', function() {
  const registerBtn = document.getElementById('register-btn');
  const registerModal = document.getElementById('register-modal');
  const loginModal = document.getElementById('login-modal');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const userNameEl = document.getElementById('user-name');

  if (!registerBtn || !registerModal || !loginModal || !registerForm || !loginForm) return;

  checkLoginStatus();

  // 打开注册弹窗
  registerBtn.addEventListener('click', function() {
    registerModal.classList.remove('hidden');
  });

  // 切换登录/注册
  loginLink?.addEventListener('click', function(e) {
    e.preventDefault();
    registerModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
  });
  registerLink?.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.classList.add('hidden');
    registerModal.classList.remove('hidden');
  });

  // 模拟发送验证码（仅前端提示）
  const verificationInput = document.getElementById('verification-code');
  if (verificationInput) {
    verificationInput.addEventListener('focus', function() {
      if (typeof showNotification === 'function') {
        showNotification('验证码已发送，请查收');
      }
    });
  }

  // 注册提交
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const verificationCode = verificationInput?.value.trim();
    if (!verificationCode || verificationCode.length !== 6) {
      alert('请输入6位验证码');
      return;
    }
    const formData = new FormData(registerForm);
    const name = formData.get('register-name') || '用户';
    const phone = formData.get('register-phone');
    const password = formData.get('register-password');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify({ name, phone }));
    registerModal.classList.add('hidden');
    loginModal.classList.add('hidden');
    if (userNameEl && name) userNameEl.textContent = String(name);
    registerBtn.classList.add('hidden');
    if (typeof showNotification === 'function') showNotification('注册成功，已自动登录');
  });

  // 登录提交
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const phoneNumber = (document.getElementById('login-phone')?.value || '').trim();
    const password = document.getElementById('login-password')?.value || '';
    if (!phoneNumber || !password) {
      alert('请输入手机号和密码');
      return;
    }
    // 模拟登录成功
    localStorage.setItem('isLoggedIn', 'true');
    const existingUser = localStorage.getItem('userData');
    const userData = existingUser ? JSON.parse(existingUser) : { name: '用户', phone: phoneNumber };
    localStorage.setItem('userData', JSON.stringify(userData));
    loginModal.classList.add('hidden');
    registerModal.classList.add('hidden');
    if (userNameEl && userData.name) userNameEl.textContent = userData.name;
    registerBtn.classList.add('hidden');
    if (typeof showNotification === 'function') showNotification('登录成功');
  });

  function checkLoginStatus() {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const userDataStr = localStorage.getItem('userData');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    if (loginStatus === 'true' || loginStatus === 'session') {
      if (userData && userData.name && userNameEl) userNameEl.textContent = userData.name;
      registerBtn.classList.add('hidden');
    } else {
      registerBtn.classList.remove('hidden');
    }
  }
});