from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import numpy as np
import cv2
import tensorflow as tf

app = FastAPI()

# Hardcoded model path
MODEL_PATH = 'model/saved_model/tomato_mobilenetv2.keras'
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image_bytes):
    try:
        img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
        img = cv2.resize(img, (224, 224))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        return img / 255.0
    except Exception as e:
        raise ValueError(f"Image processing failed: {str(e)}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    try:
        img = preprocess_image(await file.read())
        prediction = model.predict(np.expand_dims(img, axis=0))[0][0]
        
        return JSONResponse({
            "is_ripe": bool(prediction > 0.5),
            "confidence": float(prediction if prediction > 0.5 else 1 - prediction),
            "class_probabilities": {
                "ripe": float(prediction),
                "unripe": float(1 - prediction)
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))