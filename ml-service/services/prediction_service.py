import numpy as np

from services.model_loader import model_loader


class PredictionService:

    @staticmethod
    def predict_heart(data):
        values = np.array([[
            data.age,
            data.sex,
            data.cp,
            data.trestbps,
            data.chol,
            data.fbs,
            data.restecg,
            data.thalach,
            data.exang,
            data.oldpeak,
            data.slope,
            data.ca,
            data.thal
        ]])

        prediction = int(
            model_loader.heart_model.predict(values)[0]
        )

        probability = float(
            model_loader.heart_model.predict_proba(values)[0].max()
        )

        return {
            "success": True,
            "disease": "Heart Disease",
            "prediction": prediction,
            "result": "Positive" if prediction == 1 else "Negative",
            "probability": round(probability, 4),
            "confidence": round(probability * 100, 2),
        }

    @staticmethod
    def predict_diabetes(data):
        values = np.array([[
            data.pregnancies,
            data.glucose,
            data.blood_pressure,
            data.skin_thickness,
            data.insulin,
            data.bmi,
            data.diabetes_pedigree_function,
            data.age
        ]])

        prediction = int(
            model_loader.diabetes_model.predict(values)[0]
        )

        probability = float(
            model_loader.diabetes_model.predict_proba(values)[0].max()
        )

        return {
            "success": True,
            "disease": "Diabetes",
            "prediction": prediction,
            "result": "Positive" if prediction == 1 else "Negative",
            "probability": round(probability, 4),
            "confidence": round(probability * 100, 2),
        }