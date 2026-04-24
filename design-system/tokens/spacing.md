# 间距系统 - Design Tokens

## 📏 基础间距单位

基础单位: **4px** (0.25rem)

基于 4px 网格系统，确保视觉一致性和开发效率。

---

## 📐 间距令牌

| Token | 数值 | 像素 | 用途 |
|-------|------|------|------|
| `--space-0` | 0 | 0px | 无间距 |
| `--space-px` | 1px | 1px | 细线、边框 |
| `--space-0-5` | 0.125rem | 2px | 极紧凑 |
| `--space-1` | 0.25rem | 4px | **基础单位** |
| `--space-2` | 0.5rem | 8px | 图标间距、紧凑内联 |
| `--space-3` | 0.75rem | 12px | 小间距、按钮内边距 |
| `--space-4` | 1rem | 16px | **标准间距** |
| `--space-5` | 1.25rem | 20px | 中等间距 |
| `--space-6` | 1.5rem | 24px | 卡片内边距 |
| `--space-8` | 2rem | 32px | 大间距、区块间距 |
| `--space-10` | 2.5rem | 40px | 大区块间距 |
| `--space-12` | 3rem | 48px | Section 间距 |
| `--space-16` | 4rem | 64px | 大 Section 间距 |
| `--space-20` | 5rem | 80px | Hero 间距 |
| `--space-24` | 6rem | 96px | 超大间距 |

---

## 🎯 间距使用规范

### 组件内边距

| 组件 | 水平内边距 | 垂直内边距 | Token |
|------|------------|------------|-------|
| 小按钮 | 12px | 8px | `px-3 py-2` |
| 标准按钮 | 20px | 12px | `px-5 py-3` |
| 大按钮 | 24px | 16px | `px-6 py-4` |
| 输入框 | 16px | 12px | `px-4 py-3` |
| 小卡片 | 16px | 16px | `p-4` |
| 标准卡片 | 24px | 24px | `p-6` |
| 大卡片 | 32px | 32px | `p-8` |
| 模态框 | 24px | 24px | `p-6` |

### 组件外边距

| 场景 | 间距 | Token |
|------|------|-------|
| 表单元素间距 | 16px | `space-y-4` |
| 按钮组间距 | 12px | `gap-3` |
| 卡片列表间距 | 24px | `gap-6` |
| 图标与文字 | 8px | `gap-2` |
| 标题与内容 | 16px | `mb-4` |
| 段落间距 | 16px | `mb-4` |

---

## 📦 布局间距

### 容器内边距

```css
/* 移动端 */
.container-mobile {
  padding-left: 16px;
  padding-right: 16px;
}

/* 平板端 */
.container-tablet {
  padding-left: 24px;
  padding-right: 24px;
}

/* 桌面端 */
.container-desktop {
  padding-left: 32px;
  padding-right: 32px;
}

/* 大屏 */
.container-large {
  padding-left: 48px;
  padding-right: 48px;
}
```

### Section 间距

```css
/* 标准 Section */
.section {
  padding-top: 64px;
  padding-bottom: 64px;
}

/* 大 Section */
.section-large {
  padding-top: 96px;
  padding-bottom: 96px;
}

/* 紧凑 Section */
.section-compact {
  padding-top: 32px;
  padding-bottom: 32px;
}
```

---

## 🔲 圆角系统

| Token | 数值 | 像素 | 用途 |
|-------|------|------|------|
| `--radius-none` | 0 | 0px | 无圆角 |
| `--radius-sm` | 0.125rem | 2px | 小标签、紧凑元素 |
| `--radius-md` | 0.375rem | 6px | 小按钮、输入框 |
| `--radius-lg` | 0.5rem | 8px | **标准圆角** |
| `--radius-xl` | 0.75rem | 12px | 卡片、模态框 |
| `--radius-2xl` | 1rem | 16px | 大卡片、面板 |
| `--radius-3xl` | 1.5rem | 24px | 超大元素 |
| `--radius-full` | 9999px | - | 圆形、胶囊形 |

### 组件圆角规范

| 组件 | 圆角 | Token |
|------|------|-------|
| 按钮 | 8px | `rounded-lg` |
| 输入框 | 8px | `rounded-lg` |
| 小卡片 | 12px | `rounded-xl` |
| 标准卡片 | 16px | `rounded-2xl` |
| 模态框 | 16px | `rounded-2xl` |
| 头像 | 9999px | `rounded-full` |
| 标签/徽章 | 9999px | `rounded-full` |
| 进度条 | 9999px | `rounded-full` |

---

## 📱 响应式间距

### 断点间距调整

```css
/* 基础（移动端优先） */
:root {
  --section-padding-y: 48px;
  --container-padding-x: 16px;
  --card-padding: 16px;
  --element-gap: 16px;
}

/* 平板端 (640px+) */
@media (min-width: 640px) {
  :root {
    --section-padding-y: 64px;
    --container-padding-x: 24px;
    --card-padding: 24px;
    --element-gap: 20px;
  }
}

/* 桌面端 (1024px+) */
@media (min-width: 1024px) {
  :root {
    --section-padding-y: 80px;
    --container-padding-x: 32px;
    --card-padding: 32px;
    --element-gap: 24px;
  }
}

/* 大屏 (1280px+) */
@media (min-width: 1280px) {
  :root {
    --section-padding-y: 96px;
    --container-padding-x: 48px;
  }
}
```

---

## 🎨 实际应用示例

### 卡片组件

```css
.card {
  padding: 24px;                    /* p-6 */
  border-radius: 16px;              /* rounded-2xl */
  gap: 16px;                        /* gap-4 */
}

.card-header {
  margin-bottom: 16px;              /* mb-4 */
  padding-bottom: 16px;             /* pb-4 */
}

.card-title {
  margin-bottom: 8px;               /* mb-2 */
}
```

### 表单布局

```css
.form-group {
  margin-bottom: 20px;              /* mb-5 */
}

.form-label {
  margin-bottom: 8px;               /* mb-2 */
}

.form-input {
  padding: 12px 16px;               /* py-3 px-4 */
  border-radius: 8px;               /* rounded-lg */
}

.form-error {
  margin-top: 8px;                  /* mt-2 */
}
```

### 按钮组

```css
.button-group {
  display: flex;
  gap: 12px;                        /* gap-3 */
}

.button-primary {
  padding: 12px 20px;               /* py-3 px-5 */
  border-radius: 8px;               /* rounded-lg */
}
```

### 分析结果面板

```css
.analysis-panel {
  padding: 32px;                    /* p-8 */
  border-radius: 16px;              /* rounded-2xl */
}

.analysis-header {
  margin-bottom: 24px;              /* mb-6 */
  padding-bottom: 16px;             /* pb-4 */
}

.emotion-grid {
  display: grid;
  gap: 16px;                        /* gap-4 */
}
```

---

## 📐 网格系统

### 12 列网格

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;                        /* gap-6 */
}

/* 常见布局 */
.grid-2-columns {
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.grid-3-columns {
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.grid-4-columns {
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
```

### 响应式网格

```css
/* 移动端单列 */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 平板端双列 */
@media (min-width: 640px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* 桌面端三列 */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

/* 大屏四列 */
@media (min-width: 1280px) {
  .responsive-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 🎯 Figma 自动布局规范

### 常用自动布局配置

| 组件 | 方向 | 间距 | 内边距 | 对齐 |
|------|------|------|--------|------|
| 按钮 | Horizontal | 8px | 12px 20px | Center |
| 卡片 | Vertical | 16px | 24px | Left |
| 表单 | Vertical | 16px | 0 | Stretch |
| 列表项 | Horizontal | 12px | 16px | Center |
| 标签组 | Horizontal | 8px | 0 | Left |
| 图标+文字 | Horizontal | 8px | 0 | Center |

### 自动布局嵌套

```
Card (Auto Layout)
├── Header (Auto Layout, Horizontal)
│   ├── Icon (Fixed)
│   └── Title (Fill)
├── Content (Auto Layout, Vertical)
│   ├── Description
│   └── Metadata
└── Footer (Auto Layout, Horizontal)
    ├── Left Actions
    └── Right Actions
```
