import warnings
from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)
from sklearn.model_selection import train_test_split

warnings.filterwarnings("ignore")


# ===========================
# Project Paths
# ===========================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_DIR = BASE_DIR / "datasets"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)


# ===========================
# Utility Functions
# ===========================

def load_dataset(filename):
    path = DATASET_DIR / filename

    if not path.exists():
        raise FileNotFoundError(f"{filename} not found.")

    return pd.read_csv(path)


def train_model(df, target_column, model_name):
    print(f"\n{'=' * 60}")
    print(f"Training {model_name}")
    print(f"{'=' * 60}")

    # Remove duplicates
    df = df.drop_duplicates()

    # Fill missing values
    df = df.fillna(df.median(numeric_only=True))

    X = df.drop(columns=[target_column])
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"\nAccuracy : {accuracy:.4f}\n")

    print("Classification Report")
    print(classification_report(y_test, predictions))

    print("Confusion Matrix")
    print(confusion_matrix(y_test, predictions))

    model_path = MODEL_DIR / f"{model_name}.pkl"

    joblib.dump(model, model_path)

    print(f"\nModel saved at:")
    print(model_path)

    return model


# ===========================
# Train Heart Disease Model
# ===========================

heart_df = load_dataset("heart.csv")

train_model(
    heart_df,
    target_column="target",
    model_name="heart_disease",
)


# ===========================
# Train Diabetes Model
# ===========================

diabetes_df = load_dataset("diabetes.csv")

train_model(
    diabetes_df,
    target_column="Outcome",
    model_name="diabetes",
)

print("\n" + "=" * 60)
print("All models trained successfully.")
print("=" * 60)