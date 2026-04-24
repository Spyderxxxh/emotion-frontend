# 字体系统 - Design Tokens

## 🔤 字体家族

### 主字体 - Inter

```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**选择理由**:
- 专为屏幕阅读优化
- 优秀的数字显示效果
- 支持多语言字符
- 开源免费商用

### 等宽字体 - JetBrains Mono

```css
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

**使用场景**:
- 代码展示
- 数据数值
- 时间戳
- 技术参数

---

## 📏 字体比例 (Type Scale)

基于 1.25 比例因子（Major Third）

| Token | 尺寸 | 行高 | 字重 | 字间距 | 用途 |
|-------|------|------|------|--------|------|
| `--text-xs` | 12px / 0.75rem | 16px | 400 | 0 | 标签、辅助说明 |
| `--text-sm` | 14px / 0.875rem | 20px | 400 | 0 | 次要文字、描述 |
| `--text-base` | 16px / 1rem | 24px | 400 | 0 | **正文标准** |
| `--text-lg` | 18px / 1.125rem | 28px | 400 | -0.01em | 大段落 |
| `--text-xl` | 20px / 1.25rem | 28px | 500 | -0.01em | 小标题 |
| `--text-2xl` | 24px / 1.5rem | 32px | 600 | -0.02em | 模块标题 |
| `--text-3xl` | 30px / 1.875rem | 36px | 600 | -0.02em | 页面标题 |
| `--text-4xl` | 36px / 2.25rem | 40px | 700 | -0.02em | Hero 标题 |
| `--text-5xl` | 48px / 3rem | 48px | 700 | -0.03em | 大标题 |
| `--text-6xl` | 60px / 3.75rem | 60px | 800 | -0.03em | 超大标题 |

---

## 🎯 字体层级 (Typography Hierarchy)

### 页面标题 (Page Title)

```css
.page-title {
  font-size: var(--text-4xl);    /* 36px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
```

**使用场景**: Hero Section 主标题、页面顶部大标题

---

### 章节标题 (Section Title)

```css
.section-title {
  font-size: var(--text-3xl);    /* 30px */
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
```

**使用场景**: 各功能区块标题、分析结果标题

---

### 模块标题 (Module Title)

```css
.module-title {
  font-size: var(--text-2xl);    /* 24px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}
```

**使用场景**: 卡片标题、Tab 标题、面板标题

---

### 卡片标题 (Card Title)

```css
.card-title {
  font-size: var(--text-xl);     /* 20px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}
```

**使用场景**: 分析卡片、结果卡片标题

---

### 正文 (Body Text)

```css
.body-text {
  font-size: var(--text-base);   /* 16px */
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  color: var(--text-secondary);
}
```

**使用场景**: 段落文字、描述说明

---

### 辅助文字 (Caption)

```css
.caption {
  font-size: var(--text-sm);     /* 14px */
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--text-tertiary);
}
```

**使用场景**: 表单说明、时间戳、次要信息

---

### 标签文字 (Label)

```css
.label {
  font-size: var(--text-xs);     /* 12px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}
```

**使用场景**: 表单标签、徽章、状态标签

---

## ⚖️ 字重 (Font Weights)

| Token | 数值 | 用途 |
|-------|------|------|
| `--font-normal` | 400 | 正文、描述 |
| `--font-medium` | 500 | 按钮、标签、强调 |
| `--font-semibold` | 600 | 标题、重要文字 |
| `--font-bold` | 700 | 页面标题、数字 |
| `--font-extrabold` | 800 | Hero 标题、超大数字 |

---

## 📝 特殊文字样式

### 渐变文字

```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**使用场景**: 品牌名称、特色功能标题

---

### 数字显示

```css
.numeric-display {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}
```

**使用场景**: 心率数值、疲劳指数、百分比

---

### 百分比大数字

```css
.percentage-large {
  font-size: var(--text-5xl);    /* 48px */
  font-weight: 700;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
```

**使用场景**: 情感分析百分比、置信度显示

---

## 📐 行高规范

| Token | 数值 | 用途 |
|-------|------|------|
| `--leading-none` | 1 | 大标题、单行文字 |
| `--leading-tight` | 1.25 | 标题、紧凑布局 |
| `--leading-snug` | 1.375 | 小标题、卡片标题 |
| `--leading-normal` | 1.5 | 正文标准 |
| `--leading-relaxed` | 1.625 | 长段落、阅读优化 |
| `--leading-loose` | 2 | 宽松排版、无障碍阅读 |

---

## 📱 响应式字体

### 移动端适配

```css
/* 手机端字体缩小 */
@media (max-width: 640px) {
  :root {
    --text-6xl: 40px;
    --text-5xl: 32px;
    --text-4xl: 28px;
    --text-3xl: 24px;
    --text-2xl: 20px;
  }
}
```

### 平板端适配

```css
/* 平板端适中 */
@media (min-width: 641px) and (max-width: 1024px) {
  :root {
    --text-6xl: 48px;
    --text-5xl: 40px;
    --text-4xl: 32px;
  }
}
```

---

## 🎯 组件文字规范

### 按钮文字

```css
/* 主要按钮 */
.btn-primary {
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1;
}

/* 小按钮 */
.btn-sm {
  font-size: var(--text-sm);
  font-weight: 500;
}

/* 大按钮 */
.btn-lg {
  font-size: var(--text-lg);
  font-weight: 500;
}
```

### 输入框文字

```css
.input-field {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.5;
}

.input-field::placeholder {
  font-size: var(--text-base);
  color: var(--text-disabled);
}
```

### 导航文字

```css
.nav-link {
  font-size: var(--text-base);
  font-weight: 500;
}

.nav-link-active {
  font-weight: 600;
  color: var(--primary-600);
}
```

---

## ♿ 无障碍字体规范

### 最小字号

- **正文最小**: 16px (避免 iOS 自动缩放)
- **标签最小**: 12px (配合高对比度)
- **大文字定义**: ≥ 18px 或 ≥ 14px bold

### 行高建议

- **正文最佳**: 1.5 - 1.6 (阅读舒适度)
- **WCAG 建议**: 行高至少 1.5 倍
- **段落间距**: 至少 2 倍字号

### 对比度要求

- **正文文字**: 4.5:1 对比度 (AA 级)
- **大文字**: 3:1 对比度 (AA 级)
- **增强级**: 7:1 对比度 (AAA 级)

---

## 🎨 Figma 文字样式

### 命名规范

```
Heading/Page Title
Heading/Section Title
Heading/Module Title
Heading/Card Title

Body/Large
Body/Regular
Body/Small

Label/Uppercase
Label/Caption

Numeric/Display
Numeric/Percentage
```

### 样式属性

| 样式名 | 字体 | 大小 | 字重 | 行高 |
|--------|------|------|------|------|
| Heading/Page Title | Inter | 36 | Bold | 40 |
| Heading/Section Title | Inter | 30 | SemiBold | 36 |
| Heading/Module Title | Inter | 24 | SemiBold | 32 |
| Heading/Card Title | Inter | 20 | Medium | 28 |
| Body/Large | Inter | 18 | Regular | 28 |
| Body/Regular | Inter | 16 | Regular | 24 |
| Body/Small | Inter | 14 | Regular | 20 |
| Label/Uppercase | Inter | 12 | Medium | 16 |
| Numeric/Display | JetBrains Mono | 48 | Bold | 48 |
| Numeric/Percentage | JetBrains Mono | 36 | Bold | 40 |
