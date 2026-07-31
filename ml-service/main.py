from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

MODEL_PATH = os.getenv("MODEL_PATH")
MODEL_VERSION = os.getenv("MODEL_VERSION")

print("Model Path:", MODEL_PATH)
print("Version:", MODEL_VERSION)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ML Service Running"}