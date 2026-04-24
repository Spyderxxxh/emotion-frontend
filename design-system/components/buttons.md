# 按钮组件规范

## 🎯 按钮类型

### 主要按钮 (Primary Button)

**用途**: 页面主要操作，如"开始分析"、"提交"、"保存"

```
视觉规范:
┌─────────────────────────────────────────┐
│                                         │
│   [图标]  按钮文字                       │
│                                         │
└─────────────────────────────────────────┘

默认状态:
├── 背景: linear-gradient(135deg, #0891b2, #0e7490)
├── 文字: 白色, 16px, font-weight 500
├── 内边距: 12px 20px (py-3 px-5)
├── 圆角: 8px (rounded-lg)
├── 阴影: 0 1px 3px rgba(8, 145, 178, 0.3)
└── 图标: 16x16px, 左侧, 间距 8px

悬停状态:
├── 背景: #0e7490 (加深)
├── 阴影: 0 4px 12px rgba(8, 145, 178, 0.4)
├── 变换: translateY(-2px)
└── 过渡: 200ms ease

激活状态:
├── 背景: #155e75
├── 阴影: 0 1px 3px rgba(8, 145, 178, 0.3)
├── 变换: translateY(0)
└── 过渡: 100ms ease

禁用状态:
├── 背景: #0891b2 @ 60% 透明度
├── 光标: not-allowed
└── 无阴影、无变换
```

**尺寸变体**:

| 尺寸 | 高度 | 水平内边距 | 字体大小 | 用途 |
|------|------|------------|----------|------|
| Small | 32px | 12px | 14px | 紧凑布局、表格操作 |
| Medium | 40px | 20px | 16px | **默认尺寸** |
| Large | 48px | 24px | 18px | 主要CTA、Hero区域 |

---

### 次要按钮 (Secondary Button)

**用途**: 次要操作，如"取消"、"返回"、"了解更多"

```
视觉规范:
┌─────────────────────────────────────────┐
│                                         │
│   [图标]  按钮文字                       │
│                                         │
└─────────────────────────────────────────┘

默认状态:
├── 背景: 透明
├── 边框: 1.5px solid #0891b2
├── 文字: #0e7490, 16px, font-weight 500
├── 内边距: 12px 20px
├── 圆角: 8px
└── 图标: 16x16px, 左侧, 间距 8px

悬停状态:
├── 背景: #ecfeff (primary-50)
├── 边框: #0e7490
├── 文字: #155e75
└── 过渡: 200ms ease

激活状态:
├── 背景: #cffafe (primary-100)
├── 边框: #155e75
└── 过渡: 100ms ease
```

---

### 文字按钮 (Text Button)

**用途**: 低优先级操作，如"编辑"、"删除"、"查看详情"

```
视觉规范:
┌──────────────────┐
│ [图标] 按钮文字   │
└──────────────────┘

默认状态:
├── 背景: 透明
├── 文字: #0e7490, 16px, font-weight 500
├── 内边距: 8px 12px
├── 圆角: 6px
└── 图标: 16x16px, 左侧, 间距 4px

悬停状态:
├── 背景: #ecfeff
├── 文字: #155e75
└── 过渡: 200ms ease
```

---

### 危险按钮 (Danger Button)

**用途**: 破坏性操作，如"删除"、"退出"、"重置"

```
视觉规范:
┌─────────────────────────────────────────┐
│                                         │
│   [图标]  删除                           │
│                                         │
└─────────────────────────────────────────┘

默认状态:
├── 背景: #ef4444
├── 文字: 白色, 16px, font-weight 500
├── 内边距: 12px 20px
├── 圆角: 8px
└── 阴影: 0 1px 3px rgba(239, 68, 68, 0.3)

悬停状态:
├── 背景: #dc2626
├── 阴影: 0 4px 12px rgba(239, 68, 68, 0.4)
└── 变换: translateY(-2px)
```

---

### 图标按钮 (Icon Button)

**用途**: 工具栏操作，如"关闭"、"刷新"、"设置"

```
视觉规范:
┌──────────┐
│          │
│    🎤    │
│          │
└──────────┘

默认状态:
├── 尺寸: 40x40px (medium)
├── 背景: 透明
├── 图标: 20x20px, #6b7280
├── 圆角: 8px
└── 边框: none

悬停状态:
├── 背景: #f3f4f6
├── 图标: #374151
└── 过渡: 150ms ease

激活状态:
├── 背景: #e5e7eb
└── 图标: #1f2937

尺寸变体:
├── Small: 32x32px, 图标 16x16px
├── Medium: 40x40px, 图标 20x20px
└── Large: 48x48px, 图标 24x24px
```

---

## 🔄 按钮状态

### 加载状态

```
┌─────────────────────────────────────────┐
│                                         │
│   ↻  加载中...                          │
│                                         │
└─────────────────────────────────────────┘

规范:
├── 左侧: spinner 动画图标
├── 文字: "加载中..." 或保持原文字
├── 背景: 当前状态背景色
├── 禁用点击
└── Spinner: 16x16px, 白色
```

### 成功状态

```
┌─────────────────────────────────────────┐
│                                         │
│   ✓  已完成                             │
│                                         │
└─────────────────────────────────────────┘

规范:
├── 图标: check-circle, #10b981
├── 背景: #ecfdf5
├── 文字: #047857
└── 2秒后恢复默认状态
```

---

## 📐 按钮组

### 水平按钮组

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│  取消    │ │  保存    │ │  提交    │
└──────────┘ └──────────┘ └──────────┘
           ↑ 间距: 12px (gap-3)

规范:
├── 方向: 水平
├── 间距: 12px
├── 对齐: 左对齐 (默认), 居中, 右对齐
└── 响应式: 移动端垂直堆叠
```

### 垂直按钮组

```
┌──────────────────┐
│     主要操作     │
├──────────────────┤
│     次要操作     │
├──────────────────┤
│     文字操作     │
└──────────────────┘
      ↑ 间距: 12px

规范:
├── 方向: 垂直
├── 间距: 12px
├── 宽度: 全宽 (默认) 或自适应
└── 常用于移动端
```

### 分离式按钮组

```
┌──────────────────┬──────────┐
│    保存并继续    │    ▼     │
└──────────────────┴──────────┘

规范:
├── 主按钮: 左侧，主要操作
├── 下拉按钮: 右侧，40px 宽
├── 边框: 共享边框
└── 下拉: 显示更多选项
```

---

## ♿ 无障碍规范

### 键盘导航

```
Tab 键:
├── 焦点移动到按钮
├── 显示焦点环 (2px solid primary-500, 2px offset)
└── 焦点环阴影: 0 0 0 3px rgba(8, 145, 178, 0.3)

Enter/Space:
├── 激活按钮
├── 触发点击事件
└── 显示激活状态
```

### ARIA 属性

```html
<!-- 标准按钮 -->
<button type="button" class="btn-primary">
  开始分析
</button>

<!-- 加载状态 -->
<button type="button" class="btn-primary" aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span>
  分析中...
</button>

<!-- 图标按钮 -->
<button type="button" class="btn-icon" aria-label="关闭">
  <svg aria-hidden="true">...</svg>
</button>

<!-- 禁用状态 -->
<button type="button" class="btn-primary" aria-disabled="true" disabled>
  提交
</button>
```

### 触摸目标

```
最小触摸尺寸: 44x44px

Small 按钮:
├── 视觉尺寸: 32px 高
├── 触摸区域: 44x44px (通过 padding 扩展)
└── 确保可点击

Medium/Large 按钮:
├── 视觉尺寸 ≥ 40px
├── 满足触摸要求
└── 无需额外扩展
```

---

## 🎨 Figma 组件结构

### 主组件

```
Button/Primary:
├── Variant Properties:
│   ├── State: Default, Hover, Active, Focus, Disabled, Loading
│   └── Size: Small, Medium, Large
├── Structure:
│   ├── Auto Layout (Horizontal, Hug)
│   ├── Padding: 12px 20px
│   ├── Gap: 8px
│   ├── Fill: Primary-500
│   ├── Corner Radius: 8px
│   └── Effects: Drop Shadow
└── Sub-components:
    ├── Icon (Instance, Optional)
    └── Text (Text Layer)
```

### 变体组织

```
Button/
├── Primary/
│   ├── Default/Small
│   ├── Default/Medium
│   ├── Default/Large
│   ├── Hover/Medium
│   ├── Active/Medium
│   ├── Focus/Medium
│   ├── Disabled/Medium
│   └── Loading/Medium
├── Secondary/
│   └── ...
├── Text/
│   └── ...
└── Danger/
    └── ...
```

---

## 💻 代码实现

### CSS 类名

```css
/* 主要按钮 */
.btn-primary { }
.btn-primary:hover { }
.btn-primary:active { }
.btn-primary:disabled { }
.btn-primary.is-loading { }

/* 尺寸 */
.btn-sm { }
.btn-md { } /* 默认 */
.btn-lg { }

/* 图标按钮 */
.btn-icon { }
.btn-icon-sm { }
.btn-icon-lg { }
```

### HTML 结构

```html
<!-- 主要按钮 -->
<button type="button" class="btn btn-primary">
  开始分析
</button>

<!-- 带图标的主要按钮 -->
<button type="button" class="btn btn-primary">
  <svg class="btn-icon" aria-hidden="true">...</svg>
  开始分析
</button>

<!-- 次要按钮 -->
<button type="button" class="btn btn-secondary">
  取消
</button>

<!-- 文字按钮 -->
<button type="button" class="btn btn-text">
  查看详情
</button>

<!-- 危险按钮 -->
<button type="button" class="btn btn-danger">
  删除
</button>

<!-- 图标按钮 -->
<button type="button" class="btn btn-icon" aria-label="设置">
  <svg aria-hidden="true">...</svg>
</button>

<!-- 加载状态 -->
<button type="button" class="btn btn-primary is-loading" disabled>
  <span class="spinner" aria-hidden="true"></span>
  加载中...
</button>
```

---

## 📱 响应式行为

### 移动端适配

```
< 640px:
├── 按钮组垂直堆叠
├── 按钮宽度: 100%
├── 字体大小保持 16px (避免缩放)
└── 触摸目标: 确保 44px 最小高度

640px+:
├── 按钮组水平排列
├── 按钮宽度: 自适应
└── 间距: 12px
```

### 示例

```html
<!-- 移动端垂直，桌面端水平 -->
<div class="btn-group flex-col sm:flex-row gap-3">
  <button class="btn btn-secondary w-full sm:w-auto">取消</button>
  <button class="btn btn-primary w-full sm:w-auto">确认</button>
</div>
```
