# 交互动效规范

## 🎬 动画设计原则

### 核心原则

1. **有意义**: 每个动画都应有目的，引导用户注意力或提供反馈
2. **流畅**: 使用合适的缓动函数，避免生硬过渡
3. **克制**: 动画时长控制在 200-500ms，避免过度炫技
4. **一致**: 相同类型的交互使用一致的动画效果
5. **可访问**: 尊重 `prefers-reduced-motion` 设置

---

## ⏱️ 动画时长规范

| 类型 | 时长 | 用途 |
|------|------|------|
| 微交互 | 150ms | 按钮状态、图标变化 |
| 快速反馈 | 200ms | 悬停效果、小元素过渡 |
| 标准过渡 | 300ms | 页面切换、模态框 |
| 复杂动画 | 500ms | 图表加载、数据展示 |
| 持续动画 | 1-3s | 加载指示器、背景动画 |

---

## 🎯 缓动函数

### 标准缓动

```css
/* 标准缓动 - 大多数过渡 */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* 减速缓动 - 元素进入 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* 加速缓动 - 元素退出 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* 弹性缓动 - 强调效果 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* 弹簧缓动 - 自然运动 */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### 使用场景

```css
/* 按钮悬停 - 标准缓动 */
.button {
  transition: all 200ms var(--ease-default);
}

/* 模态框进入 - 减速缓动 */
.modal {
  animation: fadeInUp 300ms var(--ease-out);
}

/* 模态框退出 - 加速缓动 */
.modal.closing {
  animation: fadeOutDown 200ms var(--ease-in);
}

/* 成功提示 - 弹性缓动 */
.toast.success {
  animation: bounceIn 500ms var(--ease-bounce);
}
```

---

## 🎭 页面加载动画

### 入场序列

```
Header:     fadeInDown,  0.5s, delay: 0s
Hero 标题:   fadeInUp,    0.6s, delay: 0.2s
Hero 副标题: fadeInUp,    0.6s, delay: 0.3s
Hero 按钮:   fadeInUp,    0.6s, delay: 0.4s
Hero 插图:   fadeIn + scale, 0.8s, delay: 0.3s
```

### CSS 实现

```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 使用 */
.hero-title {
  animation: fadeInUp 600ms var(--ease-out) 200ms both;
}
```

---

## 🖱️ 悬停效果

### 按钮悬停

```css
.btn-primary {
  transition: all 200ms var(--ease-default);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
  transition-duration: 100ms;
}
```

### 卡片悬停

```css
.card {
  transition: all 300ms var(--ease-default);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
```

### 链接悬停

```css
.link {
  position: relative;
  transition: color 200ms var(--ease-default);
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-500);
  transition: width 200ms var(--ease-default);
}

.link:hover::after {
  width: 100%;
}
```

---

## 📊 数据可视化动画

### 进度条动画

```css
@keyframes fillProgress {
  from { width: 0; }
}

.progress-fill {
  animation: fillProgress 800ms var(--ease-out) forwards;
}

/* 交错动画 */
.progress-item:nth-child(1) .progress-fill { animation-delay: 0ms; }
.progress-item:nth-child(2) .progress-fill { animation-delay: 100ms; }
.progress-item:nth-child(3) .progress-fill { animation-delay: 200ms; }
.progress-item:nth-child(4) .progress-fill { animation-delay: 300ms; }
```

### 数字计数动画

```css
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-number {
  animation: countUp 500ms var(--ease-out) forwards;
}
```

### 雷达图动画

```css
@keyframes drawRadar {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.radar-path {
  stroke-dasharray: 1000;
  animation: drawRadar 1000ms var(--ease-out) forwards;
}
```

---

## 🔄 状态切换动画

### Tab 切换

```css
.tab-content {
  animation: fadeIn 300ms var(--ease-out);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Tab 指示器滑动 */
.tab-indicator {
  transition: transform 300ms var(--ease-spring);
}
```

### 模态框

```css
/* 进入 */
.modal-overlay {
  animation: fadeIn 200ms var(--ease-out);
}

.modal-content {
  animation: scaleIn 300ms var(--ease-spring);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 退出 */
.modal-overlay.closing {
  animation: fadeOut 200ms var(--ease-in) forwards;
}

.modal-content.closing {
  animation: scaleOut 200ms var(--ease-in) forwards;
}

@keyframes scaleOut {
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}
```

### Toast 提示

```css
/* 进入 */
.toast {
  animation: slideInRight 300ms var(--ease-spring);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 退出 */
.toast.hiding {
  animation: slideOutRight 200ms var(--ease-in) forwards;
}

@keyframes slideOutRight {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

---

## ⏳ 加载状态

### 骨架屏

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-100) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 加载 Spinner

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-medium);
  border-top-color: var(--primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

### 脉冲动画

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 🎪 特殊效果

### 心跳效果

```css
@keyframes heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.1); }
  28% { transform: scale(1); }
  42% { transform: scale(1.15); }
  70% { transform: scale(1); }
}

.heart-beat {
  animation: heartbeat 1.5s ease-in-out infinite;
}
```

### 呼吸效果

```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.breathe {
  animation: breathe 3s ease-in-out infinite;
}
```

### 闪烁效果

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.blink {
  animation: blink 1s ease-in-out infinite;
}
```

### 抖动效果（错误提示）

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake {
  animation: shake 500ms var(--ease-default);
}
```

---

## 🎨 SVG 动画

### 路径绘制

```css
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.animated-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 2s var(--ease-out) forwards;
}
```

### 波浪动画

```css
@keyframes wave {
  0%, 100% {
    d: path('M0,50 Q25,30 50,50 T100,50');
  }
  50% {
    d: path('M0,50 Q25,70 50,50 T100,50');
  }
}

.wave-path {
  animation: wave 2s ease-in-out infinite;
}
```

### 数据流动

```css
@keyframes flow {
  to {
    stroke-dashoffset: -20;
  }
}

.data-flow {
  stroke-dasharray: 5, 5;
  animation: flow 1s linear infinite;
}
```

---

## ♿ 无障碍考虑

### 减少动画

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 焦点状态

```css
/* 可见的焦点指示器 */
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  transition: outline-offset 150ms var(--ease-default);
}

/* 平滑的焦点过渡 */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.3);
}
```

---

## 🛠️ 性能优化

### 硬件加速

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* 动画完成后移除 will-change */
.animated-element.animation-complete {
  will-change: auto;
}
```

### 避免布局抖动

```css
/* 好的做法 - 只动画 transform 和 opacity */
.good-animation {
  transition: transform 300ms, opacity 300ms;
}

/* 避免 - 动画布局属性 */
.bad-animation {
  transition: width 300ms, height 300ms, top 300ms;
}
```

### 使用 requestAnimationFrame

```javascript
// JavaScript 动画使用 RAF
function animate() {
  // 更新动画状态
  updateAnimation();
  
  // 继续下一帧
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

---

## 📱 触摸设备优化

### 移除悬停效果

```css
@media (hover: none) {
  .card:hover {
    transform: none;
    box-shadow: var(--shadow-sm);
  }
  
  /* 使用激活状态替代 */
  .card:active {
    transform: scale(0.98);
  }
}
```

### 触摸反馈

```css
.touch-feedback {
  transition: transform 100ms var(--ease-default);
}

.touch-feedback:active {
  transform: scale(0.95);
}
```
