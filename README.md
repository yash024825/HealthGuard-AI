# HealthGuard AI

**AI-based personalized health risk prediction and monitoring system.**

HealthGuard AI predicts a user's risk of **diabetes** and **heart disease** from their health data using machine learning, then turns that prediction into a clear risk level, confidence score, and personalized recommendations. It's a full-stack project combining a MERN web app with a standalone FastAPI machine learning service.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. ML service (FastAPI)](#1-ml-service-fastapi)
  - [2. Backend (Express)](#2-backend-express)
  - [3. Frontend (React)](#3-frontend-react)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
- [Machine learning models](#machine-learning-models)
- [User flow](#user-flow)
- [Roadmap](#roadmap)
- [Disclaimer](#disclaimer)

---

## Overview

The platform lets a user:

1. Create an account (email/password or Google Sign-In).
2. Build a health profile — vitals, lifestyle, and medical history.
3. Run an AI risk check for diabetes or heart disease by entering recent lab/checkup values.
4. Get back a risk level (Low/Medium/High/Critical), a confidence score, and specific recommendations.
5. Track every past prediction from a history view and see a summary on the dashboard.

## Features

- 🔐 **Authentication** — email/password (JWT) and Google Sign-In, with server-side ID token verification
- 🩺 **Health profile management** — vitals, lifestyle, medical history, blood group, etc.
- 🧠 **Two ML-backed risk models** — Random Forest classifiers for diabetes and heart disease, served from an independent FastAPI microservice
- 📊 **Dashboard** — BMI, latest risk per condition, a risk-level breakdown chart, and recent activity
- 📜 **Prediction history** — every prediction is stored and viewable later
- 🎨 **Public marketing site** — landing page with project info, services, and contact details, separate from the authenticated app

## Architecture

```
                     ┌────────────────┐
   Browser  ───────► │  React (Vite)  │
                     │    client/     │
                     └───────┬────────┘
                             │ REST (JWT)
                             ▼
                     ┌────────────────┐        ┌──────────────────┐
                     │ Express API    │──────► │  MongoDB          │
                     │   server/      │        │  (Atlas / local)  │
                     └───────┬────────┘        └──────────────────┘
                             │ REST (internal)
                             ▼
                     ┌────────────────┐
                     │  FastAPI ML    │
                     │  ml-service/   │
                     │  (scikit-learn)│
                     └────────────────┘
```

The Express API is the only service the frontend talks to directly. It handles auth, persistence, and business logic, then calls the ML service internally to get a prediction before saving and returning the result.

## Tech stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, Vite, React Router, Tailwind CSS v4, React Hook Form + Zod, Recharts, Lucide icons, react-hot-toast, `@react-oauth/google` |
| Backend    | Node.js, Express 5, MongoDB + Mongoose, JWT, bcrypt, Helmet, express-validator, `google-auth-library` |
| ML service | Python, FastAPI, scikit-learn (Random Forest), pandas, NumPy, joblib |

## Project structure

```
HealthGuard-AI/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # Layout, Sidebar, Navbar, cards, illustrations, etc.
│       ├── context/         # AuthContext (JWT session, Google login)
│       └── pages/           # Home, Login, Register, Dashboard, HealthProfile,
│                             # DiabetesPrediction, HeartPrediction,
│                             # PredictionResult, History, Profile
│
├── server/                  # Express backend
│   ├── controllers/         # auth, health profile, prediction
│   ├── models/               # User, HealthProfile, Prediction (Mongoose)
│   ├── routes/               # /api/auth, /api/health, /api/predictions
│   ├── services/             # auth.service, ml.service (calls the ML API)
│   ├── middleware/           # JWT auth guard, validation, error handling
│   └── validators/
│
└── ml-service/               # FastAPI ML microservice
    ├── api/                  # /predict/diabetes, /predict/heart
    ├── core/                 # config (paths, host/port)
    ├── schemas/               # Pydantic request models
    ├── services/               # model loading + prediction logic
    ├── training/                # train.py — trains and exports the .pkl models
    ├── models/                    # diabetes.pkl, heart_disease.pkl (trained models)
    └── datasets/                    # training datasets
```

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB (local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- (Optional, for Google Sign-In) a Google OAuth Client ID from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

Run all three services in three separate terminals — they don't share a process.

### 1. ML service (FastAPI)

```bash
cd ml-service
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Runs at `http://localhost:8000`. Visit `http://localhost:8000/docs` for the interactive Swagger UI.

> Trained models already ship in `ml-service/models/` (`diabetes.pkl`, `heart_disease.pkl`). To retrain them from the datasets in `ml-service/datasets/`, run `python training/train.py`.

### 2. Backend (Express)

```bash
cd server
npm install
cp .env.example .env      # then fill in the values, see below
npm run dev                # nodemon, or `npm start` for production
```

Runs at `http://localhost:5000`.

### 3. Frontend (React)

```bash
cd client
npm install
cp .env.example .env      # then fill in the values, see below
npm run dev
```

Runs at `http://localhost:5173`.

Once all three are running, open `http://localhost:5173` — you should land on the public home page.

## Environment variables

**`server/.env`**

| Variable | Description |
|---|---|
| `PORT` | Port for the Express API (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `CLIENT_URL` | Frontend origin, for CORS (`http://localhost:5173`) |
| `ML_SERVICE_URL` | Base URL of the FastAPI service (`http://localhost:8000`) |
| `GOOGLE_CLIENT_ID` | OAuth Client ID, must match the client's `VITE_GOOGLE_CLIENT_ID` |

**`client/.env`**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the Express API (`http://localhost:5000/api`) |
| `VITE_GOOGLE_CLIENT_ID` | Same OAuth Client ID as the server |

Google Sign-In will render but fail without a real, matching Client ID on both sides. To get one: create an OAuth 2.0 **Web application** client in Google Cloud Console and add `http://localhost:5173` under "Authorized JavaScript origins."

## API reference

All Express endpoints are prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create an account | — |
| POST | `/api/auth/login` | Email/password login | — |
| POST | `/api/auth/google` | Google Sign-In (verifies ID token server-side) | — |
| GET | `/api/auth/me` | Get current user | ✓ |
| GET | `/api/health` | Get health profile | ✓ |
| POST | `/api/health` | Create health profile | ✓ |
| PUT | `/api/health` | Update health profile | ✓ |
| POST | `/api/predictions` | Run a new prediction (`predictionType: "diabetes" \| "heart"`) | ✓ |
| GET | `/api/predictions` | List prediction history | ✓ |
| GET | `/api/predictions/:id` | Get a single prediction | ✓ |

The ML service itself exposes:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/predict/diabetes` | Diabetes risk prediction |
| POST | `/predict/heart` | Heart disease risk prediction |
| GET | `/health` | ML service health check |

## Machine learning models

Both models are **Random Forest classifiers** trained on the standard public datasets for each condition:

- **Diabetes** — Pima Indians Diabetes dataset. Inputs: `pregnancies`, `glucose`, `blood_pressure`, `skin_thickness`, `insulin`, `bmi`, `diabetes_pedigree_function`, `age`.
- **Heart disease** — UCI/Cleveland Heart Disease dataset. Inputs: `age`, `sex`, `cp`, `trestbps`, `chol`, `fbs`, `restecg`, `thalach`, `exang`, `oldpeak`, `slope`, `ca`, `thal`.

Each prediction returns a label (Positive/Negative), a risk level, a confidence score, and a probability, which the backend stores alongside the input values used to generate it.

## User flow

```
Home (public) ──► Login / Register ──► Dashboard (protected)
                                          ├── Health Profile
                                          ├── Diabetes Check ──► Prediction Result
                                          ├── Heart Check ─────► Prediction Result
                                          └── History
```

The public marketing site (`/`) and the authenticated app share the same React app and design system but use separate layouts — a `PublicNavbar` + `Footer` for marketing pages, and a `Sidebar` + `Navbar` shell (behind `ProtectedRoute`) for everything past login.

## Roadmap

- Doctor consultation / provider integration
- Medical report upload and parsing
- AI chatbot health assistant
- Wearable device integration
- Additional risk models (kidney disease, liver disease, cancer risk)
- Cloud deployment (AWS/GCP) with CI/CD

## Disclaimer

HealthGuard AI provides statistical risk estimates for educational and informational purposes. It is **not a medical diagnosis** and should not replace consultation with a qualified healthcare professional.