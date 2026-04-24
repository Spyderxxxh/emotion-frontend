# 竖排中文 OCR 支持

为识别竖排中文，请在本目录放置 `chi_sim_vert.traineddata`，并在页面勾选“识别竖排中文”。

本地路径示例（开发端口 5500）：
- `http://localhost:5500/tessdata/chi_sim_vert.traineddata`

行为说明：
- 勾选“识别竖排中文”后，前端将优先使用 `chi_sim_vert`；若加载失败或文本过短，会自动回退到 `chi_sim` / `chi_sim+eng` 并尝试不同 PSM。
- 未勾选时，默认使用 `chi_sim+eng` 进行横排识别。

注意：
- 语言包体积较大（10–25MB），请确保本地服务器可访问。
- 若语言包缺失或被 CSP 限制，前端会提示并自动回退到其它模式。