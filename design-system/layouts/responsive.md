# 响应式设计规范

## 📱 响应式断点系统

| 断点名称 | 最小宽度 | 最大宽度 | 设备类型 | 布局策略 |
|----------|----------|----------|----------|----------|
| `xs` | - | 639px | 手机竖屏 | 单列布局，底部导航 |
| `sm` | 640px | 767px | 手机横屏/小平板 | 单列/双列，底部导航 |
| `md` | 768px | 1023px | 平板竖屏 | 双列布局，侧边导航 |
| `lg` | 1024px | 1279px | 平板横屏/小桌面 | 三列布局，顶部导航 |
| `xl` | 1280px | 1535px | 桌面显示器 | 最大化内容区 |
| `2xl` | 1536px | - | 大屏/超宽屏 | 固定最大宽度，居中 |

---

## 🎯 断点详细规范

### XS - 手机竖屏 (< 640px)

**布局特点**:
- 单列布局，内容垂直堆叠
- 全宽容器，16px 水平内边距
- 底部固定导航栏
- 汉堡菜单收起导航链接
- Tab 转换为下拉选择器

**组件适配**:
```css
/* 容器 */
.container {
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

/* 字体缩放 */
.text-hero {
  font-size: 28px;
}

/* 卡片 */
.card {
  width: 100%;
  margin-bottom: 16px;
}

/* 按钮 */
.btn-group {
  flex-direction: column;
  width: 100%;
}

.btn {
  width: 100%;
}
```

**导航**:
- Header 高度: 64px
- Logo 仅显示图标
- 导航链接收起至汉堡菜单
- 用户头像保留

**Hero Section**:
- 单列布局
- 文字居中
- 按钮垂直堆叠
- SVG 插图缩小至 280px 宽

**轮播**:
- 单卡片显示
- 支持左右滑动
- 指示器显示为圆点

**分析工具页**:
- Tab 转为下拉菜单
- 输入/结果区域垂直堆叠
- 实时监测面板固定底部
- 图表简化显示

---

### SM - 手机横屏/小平板 (640px - 767px)

**布局特点**:
- 可支持简单双列布局
- 24px 水平内边距
- 部分导航链接可显示
- Tab 水平滚动

**组件适配**:
```css
.container {
  max-width: 640px;
  padding-left: 24px;
  padding-right: 24px;
}

/* 双列网格 */
.grid-2-sm {
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
```

**Hero Section**:
- 可保持单列或简单双列
- 按钮水平排列

**分析工具页**:
- Tab 水平显示（可滚动）
- 输入/结果可并排（比例 1:1）

---

### MD - 平板竖屏 (768px - 1023px)

**布局特点**:
- 双列布局为主
- 侧边导航可选
- 32px 水平内边距
- 完整 Tab 导航

**组件适配**:
```css
.container {
  max-width: 768px;
  padding-left: 32px;
  padding-right: 32px;
}

/* 双列布局 */
.grid-2-md {
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* 三列网格 */
.grid-3-md {
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

**导航**:
- Header 高度: 72px
- 完整 Logo（图标+文字）
- 导航链接水平显示
- 可考虑左侧边栏导航

**Hero Section**:
- 双列布局，比例 1:1
- 文字左对齐
- 按钮水平排列

**分析工具页**:
- 完整 Tab 导航
- 输入/结果双列，比例 1:1
- 实时监测可侧边显示

---

### LG - 平板横屏/小桌面 (1024px - 1279px)

**布局特点**:
- 三列布局可用
- 顶部导航固定
- 32px 水平内边距
- 最大内容区宽度

**组件适配**:
```css
.container {
  max-width: 1024px;
  padding-left: 32px;
  padding-right: 32px;
}

/* 三列布局 */
.grid-3-lg {
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* 四列网格 */
.grid-4-lg {
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
```

**导航**:
- 完整顶部导航
- 所有链接可见
- 用户菜单下拉

**Hero Section**:
- 双列布局，比例 5:7
- 更大 SVG 插图（400px）

**分析工具页**:
- 输入/结果双列，比例 5:7
- 实时监测右侧边栏
- 完整图表显示

---

### XL - 桌面显示器 (1280px - 1535px)

**布局特点**:
- 最大化内容展示
- 48px 水平内边距
- 固定侧边栏可选
- 更宽松的间距

**组件适配**:
```css
.container {
  max-width: 1280px;
  padding-left: 48px;
  padding-right: 48px;
}

/* 四列布局 */
.grid-4-xl {
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
```

**分析工具页**:
- 三列布局可能（输入/结果/监测）
- 更宽松的卡片间距
- 更大的图表区域

---

### 2XL - 大屏/超宽屏 (≥ 1536px)

**布局特点**:
- 固定最大宽度，居中显示
- 两侧留白
- 保持 XL 的布局比例

**组件适配**:
```css
.container {
  max-width: 1280px; /* 保持可读性 */
  margin-left: auto;
  margin-right: auto;
  padding-left: 48px;
  padding-right: 48px;
}
```

---

## 📐 容器系统

### 容器宽度

```css
/* 默认容器 */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* 响应式容器 */
@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

### 容器变体

```css
/* 窄容器 - 适合阅读 */
.container-narrow {
  max-width: 768px;
}

/* 宽容器 - 适合数据展示 */
.container-wide {
  max-width: 1440px;
}

/* 全宽容器 */
.container-fluid {
  max-width: none;
}
```

---

## 🎯 响应式工具类

### 显示/隐藏

```css
/* 隐藏 */
.hidden-xs { @media (max-width: 639px) { display: none; } }
.hidden-sm { @media (min-width: 640px) and (max-width: 767px) { display: none; } }
.hidden-md { @media (min-width: 768px) and (max-width: 1023px) { display: none; } }
.hidden-lg { @media (min-width: 1024px) and (max-width: 1279px) { display: none; } }
.hidden-xl { @media (min-width: 1280px) { display: none; } }

/* 仅显示 */
.block-xs { @media (max-width: 639px) { display: block; } }
.block-sm { @media (min-width: 640px) and (max-width: 767px) { display: block; } }
/* ... */
```

### 间距响应式

```css
/* 响应式 Section 内边距 */
.section {
  padding-top: 48px;
  padding-bottom: 48px;
}

@media (min-width: 768px) {
  .section {
    padding-top: 64px;
    padding-bottom: 64px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}
```

### 字体响应式

```css
/* 响应式标题 */
.text-responsive-hero {
  font-size: 28px;
}

@media (min-width: 640px) {
  .text-responsive-hero { font-size: 32px; }
}

@media (min-width: 768px) {
  .text-responsive-hero { font-size: 40px; }
}

@media (min-width: 1024px) {
  .text-responsive-hero { font-size: 48px; }
}
```

---

## 🖼️ 图片响应式

### 图片尺寸

```css
.img-responsive {
  max-width: 100%;
  height: auto;
}

/* 不同断点的图片 */
.img-xs { max-width: 100%; }
.img-sm { max-width: 320px; }
.img-md { max-width: 480px; }
.img-lg { max-width: 640px; }
.img-xl { max-width: 800px; }
```

### 背景图片

```css
.bg-hero {
  background-image: url('hero-mobile.jpg');
}

@media (min-width: 768px) {
  .bg-hero {
    background-image: url('hero-tablet.jpg');
  }
}

@media (min-width: 1024px) {
  .bg-hero {
    background-image: url('hero-desktop.jpg');
  }
}
```

---

## 📊 表格响应式

### 横向滚动

```css
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-responsive table {
  min-width: 640px;
}
```

### 卡片式转换

```css
@media (max-width: 767px) {
  .table-cards thead {
    display: none;
  }
  
  .table-cards tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
  }
  
  .table-cards td {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border: none;
    border-bottom: 1px solid var(--border-light);
  }
  
  .table-cards td::before {
    content: attr(data-label);
    font-weight: 600;
  }
}
```

---

## 🎨 Figma 响应式设计

### 设计稿尺寸

| 断点 | 设计稿宽度 | 设计稿高度 | 用途 |
|------|------------|------------|------|
| Mobile | 375px | 812px | iPhone X 尺寸 |
| Tablet | 768px | 1024px | iPad 竖屏 |
| Desktop | 1440px | 900px | 标准桌面 |

### 自动布局约束

```
组件约束规则:
├── 左对齐元素: Left + Top
├── 右对齐元素: Right + Top
├── 居中元素: Center + Top
├── 全宽元素: Left + Right + Top
└── 固定尺寸: 固定宽高 + Center
```

### 断点预览

在 Figma 中使用 Frame 创建不同断点预览:
- Mobile Frame: 375px 宽
- Tablet Frame: 768px 宽
- Desktop Frame: 1440px 宽

使用 Constraints 和 Auto Layout 确保组件正确缩放。

---

## 🧪 测试清单

### 功能测试

- [ ] 所有断点布局正确
- [ ] 图片正确缩放
- [ ] 文字可读性良好
- [ ] 交互元素可点击（最小 44px）
- [ ] 水平滚动无溢出

### 性能测试

- [ ] 图片懒加载
- [ ] 字体子集化
- [ ] 关键 CSS 内联
- [ ] 动画性能流畅

### 可访问性测试

- [ ] 缩放至 200% 可读
- [ ] 屏幕阅读器正确朗读
- [ ] 键盘导航完整
- [ ] 颜色对比度符合标准
