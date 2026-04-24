from fastapi import FastAPI, UploadFile, File, WebSocket, Request
from fastapi.responses import JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
import mediapipe as mp
import numpy as np
import cv2
import base64
import json
import os
import urllib.request
import urllib.error
import tempfile
import re
import math
from collections import deque
from rapidocr_onnxruntime import RapidOCR
from dotenv import load_dotenv

# 加载 .env
load_dotenv()
MOONSHOT_API_KEY = os.environ.get('MOONSHOT_API_KEY', '').strip()
DEEPSEEK_API_KEY = os.environ.get('DEEPSEEK_API_KEY', '').strip()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# 初始化 OCR
ocr = RapidOCR()

def moonshot_ocr(img_path):
    if not MOONSHOT_API_KEY:
        return []
    try:
        with open(img_path, 'rb') as f:
            img_data = f.read()
        b64 = base64.b64encode(img_data).decode('utf-8')
        mime = 'image/jpeg'
        if img_path.lower().endswith('.png'): mime = 'image/png'
        
        payload = {
            "model": "moonshot-v1-8k-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "请提取图片中的所有文字，按原样直接返回文字内容即可。"},
                        {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{b64}"}}
                    ]
                }
            ],
            "temperature": 0.0
        }
        body = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            'https://api.moonshot.cn/v1/chat/completions',
            data=body,
            headers={'Authorization': f'Bearer {MOONSHOT_API_KEY}', 'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib.request.urlopen(req, timeout=60) as r:
            data = json.loads(r.read().decode('utf-8'))
            content = data.get('choices', [{}])[0].get('message', {}).get('content', '')
            if content:
                content = re.sub(r'^```[a-z]*\n', '', content)
                content = re.sub(r'```$', '', content).strip()
                return [line.strip() for line in content.split('\n') if line.strip()]
    except Exception as e:
        print(f"Moonshot OCR Error: {e}")
    return []

@app.post("/ocr")
async def ocr_endpoint(file: UploadFile = File(None), request: Request = None):
    img_path = None
    try:
        if file:
            data = await file.read()
            with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as f:
                f.write(data)
                img_path = f.name
        else:
            # 尝试从 JSON payload 获取 base64
            body = await request.json()
            images = body.get('images', [])
            if images:
                data = base64.b64decode(images[0])
                with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as f:
                    f.write(data)
                    img_path = f.name
        
        if not img_path:
            return JSONResponse({"error": "No image provided"}, status_code=400)

        # 1. RapidOCR
        res, _ = ocr(img_path)
        lines = []
        if res:
            for item in res:
                if len(item) > 1: lines.append(str(item[1]).strip())
        
        # 2. Moonshot OCR 兜底
        if not lines:
            lines = moonshot_ocr(img_path)
            
        return {"lines": lines}
    finally:
        if img_path and os.path.exists(img_path):
            os.unlink(img_path)

@app.post("/llm")
async def llm_endpoint(request: Request):
    payload = await request.json()
    ocr_text = str(payload.get('ocrText') or '')
    dominant_emotion = payload.get('dominantEmotion') or 'neutral'
    emotion_scores = payload.get('emotionScores') or {}

    api_key = MOONSHOT_API_KEY or DEEPSEEK_API_KEY
    if not api_key:
        # Rule-based fallback
        return rule_based_analysis(ocr_text)

    is_moonshot = api_key.startswith('sk-')
    api_url = 'https://api.moonshot.cn/v1/chat/completions' if is_moonshot else 'https://api.deepseek.com/v1/chat/completions'
    
    prompt = {
        'model': 'moonshot-v1-8k' if is_moonshot else 'deepseek-chat',
        'messages': [
            {'role': 'system', 'content': '你是一位精通加密货币交易和情感分析的专家。请分析OCR文本并返回JSON：emotion_distribution (7种情绪百分比), dominant_emotion, comfort_text, advice (1-3条)。只返回JSON。'},
            {'role': 'user', 'content': f'文本：{ocr_text[:2000]}\n线索：{dominant_emotion}, {json.dumps(emotion_scores)}'}
        ],
        'temperature': 0.7
    }
    
    try:
        req = urllib.request.Request(
            api_url, 
            data=json.dumps(prompt).encode('utf-8'), 
            headers={'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib.request.urlopen(req, timeout=30) as r:
            resp_data = json.loads(r.read().decode('utf-8'))
            content = resp_data.get('choices', [{}])[0].get('message', {}).get('content', '')
            # 清洗并解析 JSON
            m = re.search(r'\{[\s\S]*\}', content)
            if m:
                return json.loads(m.group(0))
    except Exception as e:
        print(f"LLM Error: {e}")
    
    return rule_based_analysis(ocr_text)

def rule_based_analysis(text):
    # 极简版规则引擎作为兜底
    return {
        "comfort_text": "由于大模型调用繁忙，系统已通过规则引擎为您生成初步分析。请保持冷静，风险控制是第一位的。",
        "advice": ["关注仓位风险", "保持充足休息"],
        "emotion_distribution": {"neutral": 100, "angry": 0, "disgust": 0, "fear": 0, "happy": 0, "sad": 0, "surprise": 0},
        "dominant_emotion": "neutral"
    }

@app.post("/chat")
async def chat_endpoint(request: Request):
    if not MOONSHOT_API_KEY:
        return JSONResponse({"error": "API Key not configured"}, status_code=503)
    payload = await request.json()
    body = json.dumps({
        'model': payload.get('model', 'moonshot-v1-8k'),
        'messages': payload.get('messages', []),
        'temperature': payload.get('temperature', 0.8)
    }).encode('utf-8')
    req = urllib.request.Request(
        'https://api.moonshot.cn/v1/chat/completions',
        data=body,
        headers={'Authorization': f'Bearer {MOONSHOT_API_KEY}', 'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode('utf-8'))
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# --- 眨眼检测逻辑 (增强版) ---
mp_face_mesh = mp.solutions.face_mesh
face_mesh_stream = mp_face_mesh.FaceMesh(
    static_image_mode=False, 
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
EAR_THRESHOLD = 0.21

def eye_aspect_ratio(landmarks, eye_idx):
    p = np.array([landmarks[i] for i in eye_idx])
    A = np.linalg.norm(p[1] - p[5])
    B = np.linalg.norm(p[2] - p[4])
    C = np.linalg.norm(p[0] - p[3])
    return (A + B) / (2.0 * C)

def get_head_pose(landmarks, w, h):
    # 3D model points.
    model_points = np.array([
        (0.0, 0.0, 0.0),             # Nose tip
        (0.0, -330.0, -65.0),        # Chin
        (-225.0, 170.0, -135.0),     # Left eye left corner
        (225.0, 170.0, -135.0),      # Right eye right corner
        (-150.0, -150.0, -125.0),    # Left Mouth corner
        (150.0, -150.0, -125.0)      # Right mouth corner
    ])

    # 2D image points from landmarks
    image_points = np.array([
        landmarks[1],    # Nose tip
        landmarks[199],  # Chin
        landmarks[33],   # Left eye left corner
        landmarks[263],  # Right eye right corner
        landmarks[61],   # Left Mouth corner
        landmarks[291]   # Right mouth corner
    ], dtype="double")

    # Camera internals
    focal_length = w
    center = (w/2, h/2)
    camera_matrix = np.array(
        [[focal_length, 0, center[0]],
         [0, focal_length, center[1]],
         [0, 0, 1]], dtype="double"
    )

    dist_coeffs = np.zeros((4,1)) # Assuming no lens distortion
    (success, rotation_vector, translation_vector) = cv2.solvePnP(model_points, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)

    # Convert rotation vector to rotation matrix
    rmat, _ = cv2.Rodrigues(rotation_vector)
    # Get angles
    # decomposeProjectionMatrix returns 7 values
    _, _, _, _, _, _, angles = cv2.decomposeProjectionMatrix(np.hstack((rmat, translation_vector)))
    pitch, yaw, roll = angles.flatten()
    
    return pitch, yaw

@app.websocket("/ws")
async def ws_blink(ws: WebSocket):
    await ws.accept()
    print("DEBUG: WebSocket connection accepted")
    window = deque(maxlen=120)
    consec = 0
    frame_count = 0
    while True:
        try:
            msg = await ws.receive_text()
            obj = json.loads(msg)
            
            frame_count += 1
            if frame_count % 10 == 0:
                print(f"DEBUG: Received {frame_count} frames on WS")

            if obj.get("heartbeat"):
                print("DEBUG: Received heartbeat")
                await ws.send_text(json.dumps({"heartbeat": "ok"}))
                continue
            
            b64 = obj.get("image") or ""
            if not b64:
                print("DEBUG: Empty image data received")
                continue
            
            buf = base64.b64decode(b64)
            img = cv2.imdecode(np.frombuffer(buf, np.uint8), cv2.IMREAD_COLOR)
            if img is None: 
                print("DEBUG: Failed to decode image")
                continue
            
            h, w = img.shape[:2]
            # Convert to RGB for MediaPipe
            rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            results = face_mesh_stream.process(rgb_img)
            
            if not results.multi_face_landmarks:
                if frame_count % 10 == 0:
                    print(f"DEBUG: No face detected in frame {frame_count}")
                await ws.send_text(json.dumps({"error":"no_face", "frame": frame_count}))
                continue
            
            face_landmarks = results.multi_face_landmarks[0]
            lm = face_landmarks.landmark
            points = [(l.x * w, l.y * h) for l in lm]
            
            LEFT_EYE = [33, 160, 158, 133, 153, 144]
            RIGHT_EYE = [362, 385, 387, 263, 373, 380]
            
            ear_l = eye_aspect_ratio(points, LEFT_EYE)
            ear_r = eye_aspect_ratio(points, RIGHT_EYE)
            ear = (ear_l + ear_r) / 2
            
            closed = ear < EAR_THRESHOLD
            window.append(1 if closed else 0)
            consec = consec + 1 if closed else 0
            perclos = sum(window) / len(window)
            
            # 计算眼线角度
            l_center = np.mean([points[i] for i in LEFT_EYE], axis=0)
            r_center = np.mean([points[i] for i in RIGHT_EYE], axis=0)
            dx, dy = r_center[0] - l_center[0], r_center[1] - l_center[1]
            eye_angle = math.degrees(math.atan2(dy, dx))
            
            # 计算姿态
            try:
                pitch, yaw = get_head_pose(points, w, h)
            except Exception as e:
                print(f"DEBUG: Head pose calculation error: {e}")
                pitch, yaw = 0.0, 0.0
            
            # 提取眼睛轮廓点
            left_eye_contour = [points[i] for i in [33, 160, 158, 133, 153, 144]]
            right_eye_contour = [points[i] for i in [362, 385, 387, 263, 373, 380]]

            response_data = {
                "ear": float(round(ear, 4)),
                "ear_l": float(round(ear_l, 4)),
                "ear_r": float(round(ear_r, 4)),
                "eye_closed": bool(closed),
                "fatigue_index": int(perclos * 100),
                "is_fatigued": bool(consec >= 24 or perclos >= 0.4),
                "perclos": float(round(perclos, 4)),
                "eye_angle": float(round(eye_angle, 2)),
                "pitch": float(round(pitch, 2)),
                "yaw": float(round(yaw, 2)),
                "left_eye": left_eye_contour,
                "right_eye": right_eye_contour,
                "frame": frame_count
            }
            
            await ws.send_text(json.dumps(response_data))
            
        except Exception as e:
            print(f"DEBUG: WS Error: {type(e).__name__}: {e}")
            import traceback
            traceback.print_exc()
            break

@app.get("/health")
async def health(): return {"status": "ok"}

app.mount("/", StaticFiles(directory=".", html=True))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9999)
