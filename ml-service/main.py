from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {
        "message": "Welcome to HealthGuard AI ML Service"
    }

@app.get("/health")
def health():
    return {
        "status": "ML Service Running"
    }