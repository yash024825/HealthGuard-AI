from fastapi import APIRouter, HTTPException

from schemas.prediction import (
    HeartDiseaseRequest,
    DiabetesRequest,
)

from services.prediction_service import PredictionService

router = APIRouter(
    prefix="/predict",
    tags=["Predictions"]
)


@router.post("/heart")
def predict_heart(request: HeartDiseaseRequest):
    try:
        return PredictionService.predict_heart(request)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/diabetes")
def predict_diabetes(request: DiabetesRequest):
    try:
        return PredictionService.predict_diabetes(request)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )