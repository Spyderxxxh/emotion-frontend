# 卡片组件规范

## 🎯 卡片类型

### 标准卡片 (Standard Card)

**用途**: 通用内容容器，如功能介绍、信息展示

```
视觉规范:
┌─────────────────────────────────────────┐
│                                         │
│   [可选: 图片区域]                       │
│                                         │
│   卡片标题                               │
│   ─────────────────                     │
│   卡片描述文字，可以包含多行内容。         │
│   描述文字通常用于解释卡片的主要内容。     │
│                                         │
│   [操作按钮]                             │
│                                         │
└─────────────────────────────────────────┘

默认状态:
├── 背景: 白色 (#ffffff)
├── 边框: 1px solid #e5e7eb
├── 圆角: 12px (rounded-xl)
├── 阴影: 0 1px 2px rgba(0,0,0,0.05)
├── 内边距: 24px (p-6)
└── 宽度: 自适应或固定

悬停状态:
├── 变换: translateY(-4px)
├── 阴影: 0 10px 15px -3px rgba(0,0,0,0.1)
├── 边框: #d1d5db
└── 过渡: 300ms ease
```

**结构变体**:

| 变体 | 图片位置 | 内边距 | 用途 |
|------|----------|--------|------|
| Default | 无 | 24px | 纯文字卡片 |
| With Image Top | 顶部 | 24px | 图文卡片 |
| With Image Background | 背景 | 24px | 背景图卡片 |
| Horizontal | 左侧 | 20px | 水平布局 |

---

### 功能卡片 (Feature Card)

**用途**: 首页功能展示、模块入口

```
视觉规范:
┌─────────────────────────────────────────┐
│                                         │
│         ┌──────────┐                   │
│         │          │                   │
│         │   图标    │  64x64px          │
│         │          │                   │
│         └──────────┘                   │
│              图标背景                    │
│           渐变或浅色                     │
│                                         │
│           功能名称                       │
│         功能描述文字                     │
│                                         │
│      [了解更多 →]                        │
│                                         │
└─────────────────────────────────────────┘

规范:
├── 图标区域:
│   ├── 尺寸: 64x64px
│   ├── 圆角: 12px
│   ├── 背景: 渐变或浅色
│   └── 图标: 32x32px, 居中
├── 标题: 20px, font-semibold, mt-4
├── 描述: 14px, text-secondary, mt-2
└── 操作: text button, mt-4

悬停效果:
├── 卡片: translateY(-8px), shadow-lg
├── 图标: scale(1.05)
└── 箭头: translateX(4px)
```

**颜色主题**:

| 模块 | 图标背景 | 图标颜色 |
|------|----------|----------|
| 语音分析 | 蓝色渐变 | #3b82f6 |
| 人脸分析 | 绿色渐变 | #10b981 |
| OCR分析 | 紫色渐变 | #8b5cf6 |
| 心率分析 | 红色渐变 | #ef4444 |
| 心理评估 | 橙色渐变 | #f97316 |

---

### 分析结果卡片 (Result Card)

**用途**: 展示情感分析结果

```
视觉规范:
┌─────────────────────────────────────────┐
│  😊 主导情感: 快乐                       │
│  ═══════════════════════                │
│                                         │
│  置信度                                 │
│  ┌──────────────────────────┐          │
│  │████████████████████░░░░░░│  85%     │
│  └──────────────────────────┘          │
│                                         │
│  情绪细分                               │
│  开心  ████████████████████  85%        │
│  悲伤  ██░░░░░░░░░░░░░░░░░░   5%        │
│  愤怒  █░░░░░░░░░░░░░░░░░░░   3%        │
│  中性  ██░░░░░░░░░░░░░░░░░░   7%        │
│                                         │
└─────────────────────────────────────────┘

规范:
├── 头部:
│   ├── 情绪图标: 48x48px, 圆形
│   ├── 标签: "主导情感"
│   └── 情绪名称: 24px, font-bold
├── 置信度:
│   ├── 标签: 14px, text-secondary
│   ├── 进度条: 高度 8px, 圆角全满
│   └── 百分比: 16px, font-semibold
└── 情绪细分:
    ├── 每项: 标签 + 进度条 + 百分比
    ├── 进度条: 高度 6px
    └── 颜色: 对应情绪色
```

---

### 疲劳监测卡片 (Fatigue Monitor Card)

**用途**: 实时显示疲劳监测指标

```
视觉规范:
┌─────────────────────────────────────────┐
│  ● 实时疲劳监测          [展开 ▼]       │
│  ═══════════════════════════════════    │
│                                         │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │             │  │  EAR 左眼       │  │
│  │   摄像头    │  │  ┌─────────┐    │  │
│  │   预览      │  │  │  0.25   │    │  │
│  │  160x120    │  │  └─────────┘    │  │
│  │             │  │                 │  │
│  └─────────────┘  │  EAR 右眼       │  │
│                   │  ┌─────────┐    │  │
│  [开始] [停止]    │  │  0.26   │    │  │
│                   │  └─────────┘    │  │
│                   └─────────────────┘  │
│                                         │
│  ┌────────┐┌────────┐┌────────┐        │
│  │PERCLOS ││疲劳指数││ 状态   │        │
│  │  0.12  ││  15%   ││ 正常 ● │        │
│  └────────┘└────────┘└────────┘        │
│                                         │
└─────────────────────────────────────────┘

规范:
├── 头部:
│   ├── 状态指示器: 8px 圆点
│   ├── 标题: 16px, font-semibold
│   └── 展开按钮: 右侧
├── 摄像头预览:
│   ├── 尺寸: 160x120px
│   ├── 圆角: 8px
│   └── 背景: bg-dark
├── 指标网格:
│   ├── 布局: 3列
│   ├── 每项: bg-secondary, rounded-lg, p-3
│   ├── 标签: 12px, text-tertiary
│   └── 数值: 18px, font-bold, font-mono
└── 状态指示:
    ├── 正常: success-500
    ├── 注意: warning-500
    └── 疲劳: error-500 + 脉冲动画
```

---

### 问卷选项卡片 (Assessment Option Card)

**用途**: 心理评估问卷选项

```
视觉规范:
┌─────────────────────────────────────────┐
│                                         │
│   ○  选项文字内容                        │
│      选项描述（可选）                     │
│                                         │
└─────────────────────────────────────────┘

未选中状态:
├── 背景: 白色
├── 边框: 1.5px solid #d1d5db
├── 圆角: 8px
├── 内边距: 16px
├── 单选按钮: 20px, 边框 #d1d5db
└── 文字: 16px, text-primary

悬停状态:
├── 边框: #0891b2
├── 背景: #ecfeff @ 30%
└── 过渡: 200ms ease

选中状态:
├── 边框: 2px solid #0891b2
├── 背景: #0891b2
├── 文字: 白色
├── 单选按钮: 填充 #ffffff, 内圆 #0891b2
└── 变换: scale(1.02)

禁用状态:
├── 透明度: 60%
├── 背景: #f3f4f6
└── 边框: #e5e7eb
```

---

## 🔄 卡片状态

### 选中状态

```
未选中:                          选中:
┌──────────────────┐            ┌──────────────────┐
│                  │            │ ✓                │
│   卡片内容        │            │   卡片内容        │
│                  │            │                  │
└──────────────────┘            └──────────────────┘
 边框: border-light               边框: primary-500
 阴影: shadow-sm                  阴影: shadow-primary-md
 背景: white                      背景: primary-50

选中标记:
├── 位置: 左上角
├── 图标: check-circle
├── 颜色: primary-500
└── 背景: white, 圆形
```

### 加载状态

```
┌─────────────────────────────────────────┐
│                                         │
│         ┌──────────┐                   │
│         │ 骨架屏    │                   │
│         │ 动画      │                   │
│         └──────────┘                   │
│                                         │
│   ┌────────────────────────────────┐   │
│   │ ████████████████████████████   │   │
│   │ ██████████████████░░░░░░░░░░   │   │
│   └────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘

骨架屏规范:
├── 背景: 线性渐变动画
├── 颜色: gray-200 → gray-100 → gray-200
├── 动画: shimmer, 1.5s infinite
└── 圆角: 对应内容区域
```

---

## 📐 卡片布局

### 网格布局

```
桌面端 (4列):
┌────────┐┌────────┐┌────────┐┌────────┐
│ 卡片1  ││ 卡片2  ││ 卡片3  ││ 卡片4  │
└────────┘└────────┘└────────┘└────────┘

平板端 (2列):
┌──────────┐┌──────────┐
│   卡片1   ││   卡片2   │
└──────────┘└──────────┘
┌──────────┐┌──────────┐
│   卡片3   ││   卡片4   │
└──────────┘└──────────┘

移动端 (1列):
┌────────────────┐
│      卡片1      │
└────────────────┘
┌────────────────┐
│      卡片2      │
└────────────────┘
```

### 间距规范

```
卡片网格:
├── 桌面端: gap-6 (24px)
├── 平板端: gap-4 (16px)
└── 移动端: gap-4 (16px)

卡片内部:
├── 标准: p-6 (24px)
├── 紧凑: p-4 (16px)
└── 宽松: p-8 (32px)
```

---

## ♿ 无障碍规范

### 键盘导航

```
可交互卡片:
├── Tab: 聚焦到卡片
├── Enter/Space: 激活卡片
├── 焦点环: 2px solid primary-500, 2px offset
└── 激活: 显示选中状态

焦点可见:
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │         卡片内容                     │ │
│ │                                     │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
         ↑ 2px 外框 + 2px 偏移
```

### ARIA 属性

```html
<!-- 可点击卡片 -->
<div class="card" role="button" tabindex="0" aria-pressed="false">
  卡片内容
</div>

<!-- 选中卡片 -->
<div class="card is-selected" role="button" tabindex="0" aria-pressed="true">
  <span class="sr-only">已选中</span>
  卡片内容
</div>

<!-- 选项卡片组 -->
<div role="radiogroup" aria-label="选择情感">
  <div class="card-option" role="radio" aria-checked="false" tabindex="0">
    快乐
  </div>
  <div class="card-option" role="radio" aria-checked="true" tabindex="0">
    悲伤
  </div>
</div>
```

---

## 🎨 Figma 组件结构

### 主组件

```
Card/Standard:
├── Variant Properties:
│   ├── State: Default, Hover, Selected, Disabled
│   ├── Padding: Compact, Default, Loose
│   └── Has Image: true, false
├── Structure:
│   ├── Auto Layout (Vertical, Hug)
│   ├── Padding: 24px
│   ├── Gap: 16px
│   ├── Fill: White
│   ├── Stroke: 1px Gray-200
│   ├── Corner Radius: 12px
│   └── Effects: Drop Shadow
└── Sub-components:
    ├── Image (Optional)
    ├── Header (Text)
    ├── Content (Text)
    └── Footer (Actions)
```

### 变体矩阵

```
Card/Standard:
├── Default/Compact/NoImage
├── Default/Default/NoImage
├── Default/Loose/NoImage
├── Hover/Default/NoImage
├── Selected/Default/NoImage
├── Disabled/Default/NoImage
├── Default/Default/WithImage
└── Hover/Default/WithImage

Card/Feature:
├── Voice/Default
├── Voice/Hover
├── Face/Default
├── Face/Hover
├── OCR/Default
├── OCR/Hover
├── HeartRate/Default
├── HeartRate/Hover
├── Assessment/Default
└── Assessment/Hover
```

---

## 💻 代码实现

### CSS 类名

```css
/* 基础卡片 */
.card { }
.card-hover { }
.card-selected { }
.card-disabled { }

/* 功能卡片 */
.card-feature { }
.card-feature-voice { }
.card-feature-face { }
.card-feature-ocr { }
.card-feature-heartrate { }
.card-feature-assessment { }

/* 结果卡片 */
.card-result { }
.card-result-emotion { }

/* 监测卡片 */
.card-monitor { }
.card-monitor-fatigue { }

/* 问卷选项 */
.card-option { }
.card-option-selected { }
```

### HTML 结构

```html
<!-- 标准卡片 -->
<div class="card">
  <h3 class="card-title">卡片标题</h3>
  <p class="card-description">卡片描述</p>
  <button class="btn btn-text">了解更多</button>
</div>

<!-- 功能卡片 -->
<div class="card card-feature card-feature-voice">
  <div class="card-icon">
    <svg>...</svg>
  </div>
  <h3 class="card-title">语音分析</h3>
  <p class="card-description">分析语音中的情感线索</p>
  <button class="btn btn-text">
    开始分析 <span class="arrow">→</span>
  </button>
</div>

<!-- 结果卡片 -->
<div class="card card-result">
  <div class="result-header">
    <span class="emotion-icon happy">😊</span>
    <div>
      <span class="result-label">主导情感</span>
      <h3 class="result-emotion">快乐</h3>
    </div>
  </div>
  <div class="result-confidence">
    <span>置信度</span>
    <div class="progress-bar">
      <div class="progress-fill" style="width: 85%"></div>
    </div>
    <span>85%</span>
  </div>
</div>

<!-- 问卷选项卡片 -->
<div class="card-option" role="radio" tabindex="0">
  <span class="radio-indicator"></span>
  <div class="option-content">
    <span class="option-text">选项文字</span>
    <span class="option-description">选项描述</span>
  </div>
</div>
```
