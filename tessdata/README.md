# tessdata 本地语言包

将 `chi_sim.traineddata` 放入本目录，以便 Tesseract.js 在本地加载中文简体语言包。

推荐文件来源：
- 官方仓库（手动下载后放置）：https://github.com/tesseract-ocr/tessdata
- 仅需中文简体：`chi_sim.traineddata`

使用方式：
- 本项目的前端会从 `http://localhost:5500/tessdata/chi_sim.traineddata` 拉取语言包。
- 如果你使用其他端口或路径，请相应修改 `src/js/features/image.js` 中的 `langPath`。

注意：
- 该文件较大（几十 MB），请确保本地服务器可访问。
- 若未放置该文件，前端 OCR 将提示本地语言包缺失并无法识别。