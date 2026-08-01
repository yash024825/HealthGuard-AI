from fastapi import FastAPI
from api.prediction import router

app = FastAPI(
    title="HealthGuard AI ML Service",
    version="1.0.0"
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "success": True,
        "message": "HealthGuard AI ML Service Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }