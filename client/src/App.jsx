import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// Each page is loaded on demand instead of all being bundled into one
// ~950KB JS file. This matters most for mobile users on cellular
// connections, where a single giant bundle means a long blank-screen
// wait before anything is interactive.
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const HealthProfile = lazy(() => import("./pages/HealthProfile"));
const Profile = lazy(() => import("./pages/Profile"));
const DiabetesPrediction = lazy(() => import("./pages/DiabetesPrediction"));
const HeartPrediction = lazy(() => import("./pages/HeartPrediction"));
const PredictionResult = lazy(() => import("./pages/PredictionResult"));
const History = lazy(() => import("./pages/History"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<Loader label="Loading" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/health-profile" element={<HealthProfile />} />
            <Route path="/predict/diabetes" element={<DiabetesPrediction />} />
            <Route path="/predict/heart" element={<HeartPrediction />} />
            <Route path="/predictions/:id" element={<PredictionResult />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;