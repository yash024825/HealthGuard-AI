from typing import Optional

from pydantic import BaseModel, Field


class HeartDiseaseRequest(BaseModel):
    age: int = Field(..., ge=1, le=120)
    sex: int = Field(..., ge=0, le=1)
    cp: int = Field(..., ge=0, le=3)
    trestbps: float
    chol: float
    fbs: int = Field(..., ge=0, le=1)
    restecg: int = Field(..., ge=0, le=2)
    thalach: float
    exang: int = Field(..., ge=0, le=1)
    oldpeak: float
    slope: int = Field(..., ge=0, le=2)
    ca: int = Field(..., ge=0, le=4)
    thal: int = Field(..., ge=0, le=3)


class DiabetesRequest(BaseModel):
    pregnancies: int = Field(..., ge=0)
    glucose: float = Field(..., ge=0)
    blood_pressure: float = Field(..., ge=0)
    skin_thickness: float = Field(..., ge=0)
    insulin: float = Field(..., ge=0)
    bmi: float = Field(..., ge=0)
    diabetes_pedigree_function: float = Field(..., ge=0)
    age: int = Field(..., ge=1, le=120)


class PredictionResponse(BaseModel):
    success: bool
    disease: str
    prediction: int
    result: str
    probability: Optional[float] = None
    confidence: Optional[float] = None