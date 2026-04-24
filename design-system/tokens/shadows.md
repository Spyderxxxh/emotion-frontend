# 阴影系统 - Design Tokens

## 🌑 阴影令牌

| Token | 值 | 用途 |
|-------|-----|------|
| `--shadow-none` | none | 无阴影 |
| `--shadow-sm` | 0 1px 2px 0 rgb(0 0 0 / 0.05) | 轻微提升 |
| `--shadow-md` | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) | **标准阴影** |
| `--shadow-lg` | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) | 卡片悬停 |
| `--shadow-xl` | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) | 模态框、下拉菜单 |
| `--shadow-2xl` | 0 25px 50px -12px rgb(0 0 0 / 0.25) | 对话框、浮层 |
| `--shadow-inner` | inset 0 2px 4px 0 rgb(0 0 0 / 0.05) | 内阴影、凹陷效果 |

---

## 🎨 彩色阴影

### 主色阴影

```css
--shadow-primary-sm: 0 1px 3px rgba(8, 145, 178, 0.3);
--shadow-primary-md: 0 4px 12px rgba(8, 145, 178, 0.4);
--shadow-primary-lg: 0 10px 25px rgba(8, 145, 178, 0.5);
```

### 情绪色彩阴影

```css
--shadow-happy: 0 4px 12px rgba(245, 158, 11, 0.3);
--shadow-sad: 0 4px 12px rgba(99, 102, 241, 0.3);
--shadow-angry: 0 4px 12px rgba(239, 68, 68, 0.3);
--shadow-calm: 0 4px 12px rgba(16, 185, 129, 0.3);
```

---

## 📦 组件阴影规范

| 组件 | 默认状态 | 悬停状态 | 激活状态 |
|------|----------|----------|----------|
| 卡片 | shadow-sm | shadow-lg | shadow-md |
| 按钮 | shadow-sm | shadow-md | shadow-sm |
| 主按钮 | shadow-primary-sm | shadow-primary-md | shadow-primary-sm |
| 模态框 | shadow-2xl | - | - |
| 下拉菜单 | shadow-xl | - | - |
| 输入框 | none | shadow-sm | shadow-md |
| 浮动按钮 | shadow-lg | shadow-xl | shadow-md |
| 提示框 | shadow-lg | - | - |

---

## 🎯 使用示例

```css
/* 标准卡片 */
.card {
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

/* 主要按钮 */
.btn-primary {
  box-shadow: var(--shadow-primary-sm);
}

.btn-primary:hover {
  box-shadow: var(--shadow-primary-md);
}

/* 模态框 */
.modal {
  box-shadow: var(--shadow-2xl);
}

/* 情绪卡片 */
.emotion-card.happy {
  box-shadow: var(--shadow-happy);
}
```

---

## 🌙 深色模式阴影

```css
@media (prefers-color-scheme: dark) {
  :root {
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5);
  }
}
```
