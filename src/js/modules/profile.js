// 用户资料模块：头像、名字、下拉菜单、注销与通知
document.addEventListener('DOMContentLoaded', function() {
  const profileButton = document.getElementById('profile-button');
  const profileDropdown = document.getElementById('profile-dropdown');
  const changeNameBtn = document.getElementById('change-name-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const changeNameModal = document.getElementById('change-name-modal');
  const changeNameForm = document.getElementById('change-name-form');
  const userNameEl = document.getElementById('user-name');
  const avatarUpload = document.getElementById('avatar-upload');
  const avatarPreview = document.getElementById('avatar-preview');
  const registerBtn = document.getElementById('register-btn');

  if (!profileButton || !profileDropdown) return;

  // 下拉菜单切换
  profileButton.addEventListener('click', function() {
    profileDropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', function(e) {
    if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.add('hidden');
    }
  });

  // 修改名字
  changeNameBtn?.addEventListener('click', function() {
    profileDropdown.classList.add('hidden');
    changeNameModal?.classList.remove('hidden');
  });
  changeNameForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(changeNameForm);
    const newName = formData.get('new-name');
    if (newName && userNameEl) {
      userNameEl.textContent = String(newName);
      localStorage.setItem('userData', JSON.stringify({ name: String(newName) }));
      if (typeof showNotification === 'function') showNotification('用户名已更新');
    }
    changeNameModal?.classList.add('hidden');
  });
  // 关闭模态框（点击遮罩）
  changeNameModal?.addEventListener('click', function(e) {
    if (e.target === changeNameModal) changeNameModal.classList.add('hidden');
  });

  // 头像上传预览
  avatarUpload?.addEventListener('change', function(e) {
    const file = avatarUpload.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function() {
      if (avatarPreview) {
        avatarPreview.src = reader.result;
        avatarPreview.classList.remove('hidden');
      }
      if (typeof showNotification === 'function') showNotification('头像已更新');
    };
    reader.readAsDataURL(file);
  });

  // 注销
  logoutBtn?.addEventListener('click', function() {
    profileDropdown.classList.add('hidden');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    if (registerBtn) registerBtn.classList.remove('hidden');
    if (typeof showNotification === 'function') showNotification('您已退出登录');
  });

  // 初始化登录显示状态
  const loginStatus = localStorage.getItem('isLoggedIn');
  const userDataStr = localStorage.getItem('userData');
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  if ((loginStatus === 'true' || loginStatus === 'session') && userData) {
    if (userNameEl && userData.name) userNameEl.textContent = userData.name;
    registerBtn?.classList.add('hidden');
  } else {
    registerBtn?.classList.remove('hidden');
  }
});