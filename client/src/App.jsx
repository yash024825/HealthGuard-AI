import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HealthProfile from "./pages/HealthProfile";
import Profile from "./pages/Profile";
import DiabetesPrediction from "./pages/DiabetesPrediction";
import HeartPrediction from "./pages/HeartPrediction";
import PredictionResult from "./pages/PredictionResult";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
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
  );
}

export default App;