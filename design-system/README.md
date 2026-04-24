# 多模心探 - 高保真视觉设计系统

## 🎨 设计概述

**项目名称**: 多模心探 - 多模态情感分析系统  
**设计风格**: 温暖治愈风格 (Warm Healing Style)  
**目标用户**: 关注心理健康的个人用户、医疗机构、心理咨询平台  
**设计原则**: 信任感、专业感、亲和力、可访问性

---

## 🎯 设计理念

### 温暖治愈风格核心要素

1. **色彩心理学**
   - 主色调采用青蓝色系 (#0891b2) - 代表平静、信任、专业
   - 辅助色采用 teal 绿色系 (#14b8a6) - 代表疗愈、平衡、生机
   - 情绪色彩映射符合常规认知心理学

2. **视觉层次**
   - 清晰的视觉引导，降低用户认知负荷
   - 重要信息突出，次要信息弱化
   - 情感数据可视化直观易懂

3. **交互体验**
   - 流畅的微交互动画
   - 即时反馈机制
   - 无障碍设计（WCAG AA 标准）

---

## 📐 设计系统架构

```
design-system/
├── tokens/           # 设计令牌
│   ├── colors.md     # 色彩系统
│   ├── typography.md # 字体系统
│   ├── spacing.md    # 间距系统
│   └── shadows.md    # 阴影系统
├── components/       # 组件规范
│   ├── buttons.md    # 按钮组件
│   ├── cards.md      # 卡片组件
│   ├── forms.md      # 表单组件
│   └── charts.md     # 图表组件
├── layouts/          # 布局规范
│   ├── responsive.md # 响应式设计
│   └── grids.md      # 网格系统
├── interactions/     # 交互规范
│   ├── animations.md # 动画规范
│   ├── states.md     # 状态设计
│   └── gestures.md   # 手势交互
└── figma/           # Figma 规范
    ├── export.md     # 导出规范
    └── naming.md     # 命名规范
```

---

## 🖼️ 界面预览

### 主要界面

1. **首页 (Landing Page)**
   - Hero Section: 品牌展示 + 核心价值主张
   - 功能轮播: 5大分析模块快速入口
   - 数据统计: 系统能力展示

2. **分析工具页 (Analysis Tool)**
   - Tab 导航: 5个分析模块切换
   - 实时分析面板: 视频/音频输入 + 结果展示
   - 疲劳监测面板: 眨眼检测实时指标

3. **结果展示页 (Results)**
   - 情感分析图表: 雷达图、柱状图、趋势图
   - 心理健康报告: 综合评估 + 建议
   - 历史记录: 时间轴展示

---

## 📱 响应式断点

| 断点 | 宽度 | 设备类型 | 布局策略 |
|------|------|----------|----------|
| Mobile | < 640px | 手机 | 单列布局，底部导航 |
| Tablet | 640px - 1024px | 平板 | 双列布局，侧边导航 |
| Desktop | 1024px - 1280px | 桌面 | 三列布局，顶部导航 |
| Large | > 1280px | 大屏 | 最大化内容区，固定侧边栏 |

---

## 🎨 色彩系统

详见 [tokens/colors.md](./tokens/colors.md)

## 🔤 字体系统

详见 [tokens/typography.md](./tokens/typography.md)

## 📏 间距系统

详见 [tokens/spacing.md](./tokens/spacing.md)

## 🎭 组件库

详见 [components/](./components/)

---

## 🚀 快速开始

### 开发者使用

```css
/* 引入设计令牌 */
@import 'design-system/tokens.css';

/* 使用组件类 */
<button class="btn-primary">分析</button>
<div class="card card-hover">内容</div>
```

### 设计师使用

1. 打开 Figma 设计文件
2. 使用已发布的组件库
3. 遵循命名规范创建新页面
4. 导出资源时遵循导出规范

---

## 📄 许可

© 2026 多模心探 - 保留所有权利
