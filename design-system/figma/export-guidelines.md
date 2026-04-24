# Figma 导出规范

## 📁 文件组织结构

```
多模心探 - 设计系统/
├── 🎨 Design System/
│   ├── 🎯 Tokens/
│   │   ├── Colors
│   │   ├── Typography
│   │   ├── Spacing
│   │   └── Shadows
│   ├── 🧩 Components/
│   │   ├── Buttons
│   │   ├── Inputs
│   │   ├── Cards
│   │   ├── Charts
│   │   └── Navigation
│   └── 📐 Layouts/
│       ├── Grid System
│       ├── Breakpoints
│       └── Spacing
│
├── 📱 Pages/
│   ├── 🏠 01-Homepage
│   ├── 🔬 02-Analysis-Tool
│   ├── 📊 03-Results
│   ├── 📈 04-Dashboard
│   └── 👤 05-Profile
│
├── 🎭 Prototypes/
│   ├── Homepage-Flow
│   ├── Analysis-Flow
│   └── Mobile-Flow
│
└── 🖼️ Assets/
    ├── Icons
    ├── Illustrations
    └── Photos
```

---

## 🎨 颜色样式命名

### 命名规范

```
格式: [类别]/[名称]/[变体]

示例:
├── Primary/500
├── Primary/600 (Hover)
├── Secondary/500
├── Emotion/Happy
├── Emotion/Sad
├── Semantic/Success/500
├── Semantic/Error/500
├── Gray/50 (Background)
├── Gray/900 (Text Primary)
└── Gradient/Primary-Secondary
```

### Figma 颜色样式设置

```
Primary/500:
├── Name: Primary/500
├── Color: #0891B2
├── Description: 主色 - 按钮、链接、选中状态

Primary/600 (Hover):
├── Name: Primary/600
├── Color: #0E7490
├── Description: 主色悬停状态

Emotion/Happy:
├── Name: Emotion/Happy
├── Color: #F59E0B
├── Description: 快乐情绪 - 图表、标签
```

---

## 🔤 文字样式命名

### 命名规范

```
格式: [层级]/[尺寸]/[字重]

示例:
├── Heading/Page Title
├── Heading/Section Title
├── Heading/Module Title
├── Heading/Card Title
├── Body/Large
├── Body/Regular
├── Body/Small
├── Label/Uppercase
├── Label/Caption
└── Numeric/Display
```

### Figma 文字样式设置

```
Heading/Page Title:
├── Name: Heading/Page Title
├── Font: Inter
├── Size: 36px
├── Weight: Bold (700)
├── Line Height: 110%
├── Letter Spacing: -2%

Body/Regular:
├── Name: Body/Regular
├── Font: Inter
├── Size: 16px
├── Weight: Regular (400)
├── Line Height: 150%
├── Letter Spacing: 0%

Numeric/Display:
├── Name: Numeric/Display
├── Font: JetBrains Mono
├── Size: 48px
├── Weight: Bold (700)
├── Line Height: 100%
├── Letter Spacing: -3%
```

---

## 🧩 组件命名

### 命名规范

```
格式: [类别]/[组件名]/[变体]/[状态]/[尺寸]

示例:
├── Button/Primary/Default/Default/Medium
├── Button/Primary/Default/Hover/Medium
├── Button/Primary/Default/Disabled/Medium
├── Button/Secondary/Default/Default/Medium
├── Input/Text/Default/Default
├── Input/Text/Default/Error
├── Input/Text/Default/Disabled
├── Card/Default/Default/Default
├── Card/Default/Hover/Default
├── Card/Selectable/Default/Default
└── Card/Selectable/Selected/Default
```

### 组件变体结构

```
Button:
├── Category: Primary, Secondary, Text, Danger
├── State: Default, Hover, Active, Focus, Disabled, Loading
└── Size: Small, Medium, Large

Input:
├── Type: Text, Textarea, Select
├── State: Default, Hover, Focus, Error, Success, Disabled
└── Size: Small, Medium, Large

Card:
├── Type: Default, Selectable, Interactive
├── State: Default, Hover, Selected, Disabled
└── Size: Small, Medium, Large
```

---

## 📐 自动布局规范

### 按钮自动布局

```
Button/Primary:
├── Direction: Horizontal
├── Spacing: 8px (gap)
├── Padding: 12px 20px (vertical horizontal)
├── Alignment: Center, Center
└── Constraints: Hug contents

子元素:
├── Icon (可选)
│   └── Size: 16x16px
└── Text
    └── Auto width
```

### 卡片自动布局

```
Card:
├── Direction: Vertical
├── Spacing: 16px (gap)
├── Padding: 24px
├── Alignment: Left, Top
└── Constraints: Hug contents / Fixed width

子元素:
├── Header (Horizontal)
│   ├── Icon
│   └── Title
├── Content (Vertical)
│   └── Description
└── Footer (Horizontal)
    └── Actions
```

### 表单自动布局

```
Form Group:
├── Direction: Vertical
├── Spacing: 16px (gap)
├── Padding: 0
└── Alignment: Stretch, Top

子元素:
├── Label
├── Input
└── Helper Text / Error
```

---

## 🖼️ 导出规范

### 图标导出

```
格式: SVG (首选), PNG (备选)
尺寸: 24x24px (标准), 20x20px (紧凑), 32x32px (大)
命名: icon-[name].svg

示例:
├── icon-microphone.svg
├── icon-camera.svg
├── icon-heart.svg
├── icon-chart.svg
└── icon-user.svg

导出设置:
├── Format: SVG
├── Include: id, class
├── Outline text: Yes
└── Simplify: Yes
```

### 图片导出

```
格式: WebP (首选), PNG (透明), JPG (照片)
质量: 80-90%
命名: [page]-[description].[format]

示例:
├── hero-illustration.webp
├── feature-voice.webp
├── feature-face.webp
└── avatar-default.png

导出设置:
├── Format: WebP
├── Quality: 85%
├── Width: 2x for retina
└── Compression: Lossy
```

### 组件导出

```
格式: PNG, SVG
背景: 透明
命名: [component]-[state]-[size].[format]

示例:
├── button-primary-default.png
├── button-primary-hover.png
├── input-text-default.png
├── input-text-error.png
└── card-default.png

导出设置:
├── Format: PNG
├── Background: Transparent
├── Scale: 1x, 2x
└── Prefix: component-
```

---

## 📱 响应式 Frame 设置

### Frame 尺寸

```
Mobile:
├── Width: 375px
├── Height: Auto (min 812px)
└── Constraints: Left, Top

Tablet:
├── Width: 768px
├── Height: Auto (min 1024px)
└── Constraints: Left, Top

Desktop:
├── Width: 1440px
├── Height: Auto
└── Constraints: Center, Top
```

### 约束设置

```
Header:
├── Horizontal: Left & Right
├── Vertical: Top
└── Behavior: Fixed

Content:
├── Horizontal: Left & Right
├── Vertical: Top
└── Behavior: Hug

Footer:
├── Horizontal: Left & Right
├── Vertical: Bottom
└── Behavior: Fixed
```

---

## 🎭 原型设置

### 交互规范

```
页面切换:
├── Animation: Smart Animate
├── Duration: 300ms
└── Easing: Ease Out

模态框:
├── Animation: Smart Animate
├── Duration: 200ms
└── Easing: Spring

悬停效果:
├── Trigger: Mouse Enter
├── Animation: Smart Animate
└── Duration: 150ms
```

### 流程连接

```
Homepage Flow:
├── Start: Homepage
├── [开始使用] → Analysis Tool
├── [模块卡片] → 对应 Tab
└── [登录] → Login Modal

Analysis Flow:
├── Start: Analysis Tool
├── Tab 切换 → 对应内容
├── [分析] → Loading → Results
└── [实时监测] → Expand Panel
```

---

## 🏷️ 图层命名规范

### 命名规则

```
格式: [类型]/[描述]/[状态]

类型前缀:
├── 🟦 bg/     - 背景
├── 🟨 txt/    - 文字
├── 🟥 btn/    - 按钮
├── 🟩 icon/   - 图标
├── 🟪 img/    - 图片
├── ⬜ card/   - 卡片
├── ⬛ input/  - 输入框
└── 🔲 group/  - 组

示例:
├── bg/hero-gradient
├── txt/page-title
├── btn/primary-default
├── icon/microphone
├── img/user-avatar
├── card/feature-voice
├── input/email-field
└── group/form-section
```

### 图层组织

```
Page:
├── 📱 Header (Component)
│   ├── bg/header-background
│   ├── logo/brand
│   ├── nav/navigation
│   └── user/profile
├── 🎨 Hero Section (Group)
│   ├── bg/hero-gradient
│   ├── txt/hero-title
│   ├── txt/hero-subtitle
│   ├── btn/cta-primary
│   ├── btn/cta-secondary
│   └── img/hero-illustration
├── 🎴 Features Section (Group)
│   ├── txt/section-title
│   └── cards/feature-cards (Component)
└── 📄 Footer (Component)
    ├── bg/footer-background
    └── links/footer-links
```

---

## 📋 设计交付清单

### 设计稿交付

- [ ] 所有页面设计完成
- [ ] 响应式版本（Mobile/Tablet/Desktop）
- [ ] 交互原型可点击
- [ ] 设计说明文档
- [ ] 设计令牌整理

### 资源导出

- [ ] 图标库（SVG）
- [ ] 图片资源（WebP/PNG）
- [ ] 组件切片（PNG/SVG）
- [ ] 字体文件（如需特殊字体）

### 开发交接

- [ ] Figma Dev Mode 链接
- [ ] 设计规范文档
- [ ] 动画说明
- [ ] 响应式断点说明
- [ ] 可访问性要求

---

## 🔗 资源链接

```
Figma 文件:
├── Design System: [链接]
├── Web Pages: [链接]
├── Mobile App: [链接]
└── Prototype: [链接]

资源库:
├── Icons: [链接]
├── Illustrations: [链接]
└── Photos: [链接]

文档:
├── Design Tokens: [链接]
├── Component Library: [链接]
└── Style Guide: [链接]
```
