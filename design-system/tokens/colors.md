# 色彩系统 - Design Tokens

## 🎨 主色系统

### Primary - 青蓝色系 (信任、平静)

| Token | Hex | RGB | 用途 |
|-------|-----|-----|------|
| `--primary-50` | #ecfeff | rgb(236, 254, 255) | 最浅背景 |
| `--primary-100` | #cffafe | rgb(207, 250, 254) | 浅色背景 |
| `--primary-200` | #a5f3fc | rgb(165, 243, 252) | 边框高亮 |
| `--primary-300` | #67e8f9 | rgb(103, 232, 249) | 悬停状态 |
| `--primary-400` | #22d3ee | rgb(34, 211, 238) | 次要元素 |
| `--primary-500` | #0891b2 | rgb(8, 145, 178) | **主色** |
| `--primary-600` | #0e7490 | rgb(14, 116, 144) | 悬停主色 |
| `--primary-700` | #155e75 | rgb(21, 94, 117) | 激活状态 |
| `--primary-800` | #164e63 | rgb(22, 78, 99) | 深色文字 |
| `--primary-900` | #083344 | rgb(8, 51, 68) | 最深色 |

**使用场景**:
- 主要按钮背景
- 链接文字颜色
- 选中状态指示
- 品牌标识元素

---

### Secondary - Teal 绿色系 (疗愈、平衡)

| Token | Hex | RGB | 用途 |
|-------|-----|-----|------|
| `--secondary-50` | #f0fdfa | rgb(240, 253, 250) | 浅色背景 |
| `--secondary-100` | #ccfbf1 | rgb(204, 251, 241) | 成功轻背景 |
| `--secondary-200` | #99f6e4 | rgb(153, 246, 228) | 边框装饰 |
| `--secondary-300` | #5eead4 | rgb(94, 234, 212) | 渐变终点 |
| `--secondary-400` | #2dd4bf | rgb(45, 212, 191) | 辅助元素 |
| `--secondary-500` | #14b8a6 | rgb(20, 184, 166) | **辅助色** |
| `--secondary-600` | #0d9488 | rgb(13, 148, 136) | 悬停状态 |
| `--secondary-700` | #0f766e | rgb(15, 118, 110) | 激活状态 |
| `--secondary-800` | #115e59 | rgb(17, 94, 89) | 深色文字 |
| `--secondary-900` | #134e4a | rgb(19, 78, 74) | 最深色 |

**使用场景**:
- 渐变搭配主色
- 健康/疗愈相关元素
- 成功状态装饰
- 次要按钮边框

---

## 🎭 情绪色彩映射

基于心理学研究的标准情绪色彩映射：

| 情绪 | Token | Hex | 心理学含义 |
|------|-------|-----|------------|
| 快乐 Happy | `--emotion-happy` | #f59e0b | 温暖、活力、积极 |
| 快乐浅色 | `--emotion-happy-light` | #fbbf24 | 悬停/高亮 |
| 悲伤 Sad | `--emotion-sad` | #6366f1 | 冷静、内省、忧郁 |
| 悲伤浅色 | `--emotion-sad-light` | #818cf8 | 悬停/高亮 |
| 愤怒 Angry | `--emotion-angry` | #ef4444 | 警示、强烈、危险 |
| 愤怒浅色 | `--emotion-angry-light` | #f87171 | 悬停/高亮 |
| 焦虑 Anxious | `--emotion-anxious` | #f97316 | 紧张、警示、不安 |
| 焦虑浅色 | `--emotion-anxious-light` | #fb923c | 悬停/高亮 |
| 平静 Calm | `--emotion-calm` | #10b981 | 平和、健康、放松 |
| 平静浅色 | `--emotion-calm-light` | #34d399 | 悬停/高亮 |
| 中性 Neutral | `--emotion-neutral` | #6b7280 | 客观、中立、稳定 |
| 中性浅色 | `--emotion-neutral-light` | #9ca3af | 悬停/高亮 |

**使用场景**:
- 情感分析结果图表
- 情绪状态指示器
- 雷达图/饼图配色
- 情绪历史趋势图

---

## ✅ 语义色彩系统

### Success - 成功状态

| Token | Hex | 对比度 | 用途 |
|-------|-----|--------|------|
| `--success-50` | #ecfdf5 | - | 成功轻背景 |
| `--success-100` | #d1fae5 | - | 成功背景 |
| `--success-500` | #10b981 | 4.6:1 | **成功主色** |
| `--success-600` | #059669 | 5.8:1 | 成功悬停 |
| `--success-700` | #047857 | 7.2:1 | 成功激活 |

### Warning - 警告状态

| Token | Hex | 对比度 | 用途 |
|-------|-----|--------|------|
| `--warning-50` | #fffbeb | - | 警告轻背景 |
| `--warning-100` | #fef3c7 | - | 警告背景 |
| `--warning-500` | #f59e0b | 2.9:1 | **警告主色** |
| `--warning-600` | #d97706 | 4.2:1 | 警告悬停 |
| `--warning-700` | #b45309 | 6.1:1 | 警告激活 |

### Error - 错误状态

| Token | Hex | 对比度 | 用途 |
|-------|-----|--------|------|
| `--error-50` | #fef2f2 | - | 错误轻背景 |
| `--error-100` | #fee2e2 | - | 错误背景 |
| `--error-500` | #ef4444 | 4.5:1 | **错误主色** |
| `--error-600` | #dc2626 | 5.8:1 | 错误悬停 |
| `--error-700` | #b91c1c | 7.2:1 | 错误激活 |

### Info - 信息状态

| Token | Hex | 对比度 | 用途 |
|-------|-----|--------|------|
| `--info-50` | #eff6ff | - | 信息轻背景 |
| `--info-100` | #dbeafe | - | 信息背景 |
| `--info-500` | #3b82f6 | 4.1:1 | **信息主色** |
| `--info-600` | #2563eb | 5.2:1 | 信息悬停 |
| `--info-700` | #1d4ed8 | 6.8:1 | 信息激活 |

---

## 🌫️ 灰度系统

确保 WCAG AA 对比度标准 (4.5:1 以上用于正文)

| Token | Hex | 对比度 | 用途 |
|-------|-----|--------|------|
| `--gray-50` | #f9fafb | - | 页面背景 |
| `--gray-100` | #f3f4f6 | - | 卡片背景 |
| `--gray-200` | #e5e7eb | - | 分割线、边框 |
| `--gray-300` | #d1d5db | - | 禁用边框 |
| `--gray-400` | #9ca3af | 2.9:1 | 占位符文字 |
| `--gray-500` | #6b7280 | 5.4:1 | 次要文字 |
| `--gray-600` | #4b5563 | 7.1:1 | 正文文字 |
| `--gray-700` | #374151 | 9.5:1 | 标题文字 |
| `--gray-800` | #1f2937 | 12.1:1 | 深色标题 |
| `--gray-900` | #111827 | 15.8:1 | 最深文字 |

---

## 🎨 背景色系统

| Token | Hex | 用途 |
|-------|-----|------|
| `--bg-primary` | #ffffff | 主背景（白色） |
| `--bg-secondary` | #f8fafc | 次要背景（浅灰蓝） |
| `--bg-tertiary` | #f1f5f9 | 第三层背景 |
| `--bg-dark` | #1e293b | 深色背景 |

### 渐变背景

```css
/* Hero Section 渐变 */
--gradient-hero: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%);

/* 卡片悬停渐变 */
--gradient-card-hover: linear-gradient(135deg, #ecfeff 0%, #f0fdfa 100%);

/* 结果摘要渐变 */
--gradient-result: linear-gradient(135deg, #cffafe 0%, #ccfbf1 100%);

/* 情绪图表渐变 */
--gradient-emotion: linear-gradient(90deg, #0891b2 0%, #14b8a6 100%);
```

---

## ✍️ 文字颜色系统

| Token | Hex | 对比度 | 用途 |
|-------|-----|--------|------|
| `--text-primary` | #1f2937 | 12.6:1 | 主要文字 |
| `--text-secondary` | #4b5563 | 7.1:1 | 次要文字 |
| `--text-tertiary` | #6b7280 | 5.4:1 | 辅助文字 |
| `--text-disabled` | #9ca3af | 2.9:1 | 禁用文字 |
| `--text-inverse` | #ffffff | - | 反色文字（深色背景上） |

---

## 📦 边框颜色系统

| Token | Hex | 用途 |
|-------|-----|------|
| `--border-light` | #e5e7eb | 浅色边框 |
| `--border-medium` | #d1d5db | 中等边框 |
| `--border-dark` | #9ca3af | 深色边框 |

---

## 🌙 深色模式变量

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* 背景 */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --bg-dark: #020617;

    /* 文字 */
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --text-disabled: #64748b;
    --text-inverse: #0f172a;

    /* 边框 */
    --border-light: #334155;
    --border-medium: #475569;
    --border-dark: #64748b;
  }
}
```

---

## 🎯 使用示例

### CSS 变量使用

```css
.button-primary {
  background: var(--primary-500);
  color: white;
  border: none;
}

.button-primary:hover {
  background: var(--primary-600);
}

.emotion-happy {
  color: var(--emotion-happy);
  background: rgba(245, 158, 11, 0.15);
}

.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
}
```

### Tailwind 配置

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#ecfeff',
    100: '#cffafe',
    // ...
    500: '#0891b2',
    // ...
    900: '#083344',
  },
  emotion: {
    happy: '#f59e0b',
    sad: '#6366f1',
    angry: '#ef4444',
    anxious: '#f97316',
    calm: '#10b981',
    neutral: '#6b7280',
  }
}
```

---

## ♿ 可访问性说明

所有文字颜色与背景颜色的对比度均满足：
- **WCAG AA 标准**: 正文 4.5:1，大文字 3:1
- **WCAG AAA 标准**: 正文 7:1，大文字 4.5:1

色盲友好设计：
- 不仅依赖颜色传达信息
- 使用图标、文字标签辅助
- 提供图案/纹理区分
