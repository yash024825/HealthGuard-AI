import joblib
from core.config import MODEL_DIR


class ModelLoader:
    def __init__(self):
        self.heart_model = None
        self.diabetes_model = None

    def load_models(self):
        """Load trained ML models into memory."""

        self.heart_model = joblib.load(
            MODEL_DIR / "heart_disease.pkl"
        )

        self.diabetes_model = joblib.load(
            MODEL_DIR / "diabetes.pkl"
        )

        print("✅ Heart Disease model loaded.")
        print("✅ Diabetes model loaded.")


model_loader = ModelLoader()
model_loader.load_models()