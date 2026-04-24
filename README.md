# 🧠 多模心探 - 大学生心理健康量化分析系统

> 整合语音、人脸、文本与生理信号，为大学生提供全方位的心理健康自我觉察与量化辅助决策。

![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Linux%20%7C%20Cloud-brightgreen)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 产品定位

**多模心探** 专为大学生设计，结合多模态识别技术，在学业压力、社交焦虑、抑郁倾向等关键时刻，提供：

- 📊 **量化的自我觉察**：将主观情绪转化为客观数据
- 🔔 **及时的风险预警**：早发现、早干预
- 🎓 **校园场景深度适配**：贴合大学生常见的心理困惑

---

## 🧩 核心功能模块

| 模块 | 技术实现 | 典型场景 |
|------|----------|----------|
| 🎤 **语音分析** | 声学特征提取 + Moonshot VLM | 识别学业焦虑、社交回避 |
| 😊 **人脸分析** | MediaPipe Face Mesh + EAR 算法 | 监测微表情缺失、眨眼频率、抑郁风险 |
| 📝 **文本分析** | RapidOCR + NLP 情感建模 | 捕捉日记/笔记中的自我否定信号 |
| ❤️ **心率监测** | rPPG (远程光电容积描记术) | 量化应激状态下的自主神经反应 |
| 📋 **心理测评** | SCL-90 / PHQ-9 / GAD-7 量表 | 标准化的心理健康自评 |

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────┐
│                     前端 (HTML/CSS/JS)                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐ │
│  │语音分析 │ │人脸检测 │ │OCR识别  │ │ rPPG心率 │ │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬─────┘ │
└───────┼───────────┼───────────┼───────────┼───────┘
        │           │           │           │
        └───────────┴─────┬─────┴───────────┘
                         │ WebSocket + REST
        ┌────────────────▼────────────────┐
        │      后端 (Python/FastAPI)        │
        │  • Blink Server (眨眼/疲劳检测)   │
        │  • OCR Engine (RapidOCR + Moonshot)│
        │  • LLM 分析 (Moonshot/DeepSeek)   │
        └──────────────────────────────────┘
```

---

## 🚀 快速部署

### 环境要求

- Python 3.10+
- macOS / Linux / Cloud Server
- 网络摄像头（用于人脸/心率检测）

### 本地运行

```bash
# 1. 克隆项目
git clone https://github.com/你的用户名/emotion-frontend.git
cd emotion-frontend

# 2. 创建虚拟环境
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 3. 安装依赖
pip install -r requirements.txt

# 4. 配置环境变量
cp .env.example .env
# 编辑 .env，填入你的 API Key:
# MOONSHOT_API_KEY=sk-xxxx

# 5. 启动服务
python blink_server.py
```

访问 `http://localhost:9999` 即可使用。

### 公网部署

推荐使用 **Cloudflare Tunnel**，无需公网 IP 自带 HTTPS：

```bash
# 1. 在服务器上安装 cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# 2. 创建隧道
cloudflared tunnel create emotion-tunnel

# 3. 启动服务
pm2 start "python blink_server.py" --name emotion-app
pm2 save && pm2 startup

# 4. 将隧道 URL 配置到 Cloudflare 控制台即可
```

---

## 📁 项目结构

```
emotion-frontend/
├── blink_server.py          # 后端主服务（FastAPI + MediaPipe）
├── index.html              # 主前端页面
├── mockup_preview.html     # 高保真视觉模型预览
├── requirements.txt       # Python 依赖
├── src/
│   ├── js/features/       # 各功能模块 JS（人脸/语音/OCR等）
│   └── styles/             # Tailwind CSS 样式
├── assets/css/            # UI 增强样式
├── design-system/         # 完整 UI 设计系统文档
│   ├── tokens/            # 设计令牌（颜色/字体/间距）
│   ├── components/        # 组件规范
│   └── prototypes/        # 高保真原型说明
├── deploy/
│   ├── nginx/             # Nginx 反向代理配置
│   └── systemd/           # Linux 服务配置
└── vendor/                # 前端 OCR (Tesseract.js)
```

---

## 🔑 API Keys 申请

本项目依赖以下大模型 API，请自行申请：

| 服务 | 申请地址 | 用途 |
|------|----------|------|
| Moonshot (推荐) | https://platform.moonshot.cn/ | OCR 文字提取 + LLM 情感分析 |
| DeepSeek | https://platform.deepseek.com/ | LLM 情感分析（备选） |

---

## 🎨 设计系统

本项目拥有完整的 **UI 设计系统**，包括：

- **色彩系统**：`design-system/tokens/colors.md`
- **字体规范**：`design-system/tokens/typography.md`
- **组件文档**：`design-system/components/`
- **原型说明**：`design-system/prototypes/`

---

## ⚠️ 免责声明

- 本系统**不能替代专业心理诊断**，结果仅供参考。
- 如发现严重心理困扰，请及时寻求学校心理咨询中心或专业医师帮助。
- 人脸/语音分析结果可能存在误差，请勿作为唯一决策依据。

---

## 📄 License

MIT License - 欢迎 Star ⭐ 和 Fork！

---

## 👨‍💻 技术栈

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40"/>
</p>

- **后端**：Python 3.10+ / FastAPI / Uvicorn / MediaPipe
- **前端**：HTML5 / Tailwind CSS / Vanilla JS
- **AI**：Moonshot VLM / DeepSeek / RapidOCR
- **部署**：PM2 / Nginx / Cloudflare Tunnel / Docker
