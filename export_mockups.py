import asyncio
import os
from playwright.async_api import async_playwright

async def export_mockups():
    # 创建导出的目录
    output_dir = "mockup_exports"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    async with async_playwright() as p:
        # 启动浏览器
        browser = await p.chromium.launch()
        # 设置较窄的视口宽度 (例如 750px) 强制触发竖排布局
        # 并锁定高度或让内容撑开，确保输出是竖长的
        context = await browser.new_context(
            viewport={'width': 750, 'height': 1334}, # 标准 16:9 竖屏比例起始高度
            device_scale_factor=2 
        )
        page = await context.new_page()
        
        # 访问本地 9999 端口的模型预览页
        url = "http://localhost:9999/mockup_preview.html"
        print(f"正在访问: {url}")
        
        try:
            await page.goto(url, wait_until="networkidle")
            await asyncio.sleep(2) # 等待初始渐入动画
            
            # 模块列表，对应 JS 中的 showView(id)
            views = [
                ('homepage', '01_首页展示'),
                ('audio', '02_语音分析模型'),
                ('face', '03_人脸分析模型'),
                ('ocr', '04_文本分析模型'),
                ('rppg', '05_生理指标模型'),
                ('assessment', '06_心理测评模型')
            ]
            
            for view_id, name in views:
                print(f"正在捕获: {name}...")
                
                # 1. 切换视图
                await page.evaluate(f"showView('{view_id}')")
                
                # 2. 等待视图渐显动画完成
                await asyncio.sleep(1)
                
                filename = os.path.join(output_dir, f"{name}.png")
                
                # 获取当前激活视图的元素句柄
                view_element = await page.query_selector(f"#view-{view_id}")
                
                if view_element:
                    # 获取元素的 bounding box
                    box = await view_element.bounding_box()
                    if box:
                        # 我们希望输出一个统一宽度的竖图
                        # 即使内容很短，我们也给它一个最小高度，或者完全根据内容撑开
                        # 这里采用 full_page=False 但指定区域截图，Playwright 会根据元素高度截取
                        await view_element.screenshot(path=filename)
                else:
                    await page.screenshot(path=filename, full_page=True)
                
                print(f"✅ 已保存: {filename}")
                
            print(f"\n✨ 所有模型图已成功导出至: {os.path.abspath(output_dir)}")
            
        except Exception as e:
            print(f"❌ 导出过程中出错: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(export_mockups())
