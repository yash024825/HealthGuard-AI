import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import api from "../api/axios";
import Loader from "../components/Loader";
import PredictionCard from "../components/PredictionCard";
import VitalLine from "../components/VitalLine";

export default function History() {
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    api
      .get("/predictions")
      .then((res) => setPredictions(res.data.data))
      .catch(() => setPredictions([]));
  }, []);

  if (!predictions) return <Loader label="Loading history" />;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">
          Prediction history
        </h1>
        <VitalLine className="w-24 h-5 mt-2" />
      </div>

      {predictions.length === 0 ? (
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-card p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto mb-4">
            <ClipboardList size={26} className="text-[var(--color-text-muted)]" />
          </div>
          <p className="text-[var(--color-text)] font-medium mb-1">
            No predictions yet
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">
            Run a diabetes or heart disease check to see your results here.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/predict/diabetes"
              className="text-sm font-medium text-white bg-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              Diabetes check
            </Link>
            <Link
              to="/predict/heart"
              className="text-sm font-medium text-white bg-[var(--color-accent)] px-4 py-2 rounded-lg hover:opacity-90 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              Heart check
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {predictions.map((p) => (
            <PredictionCard key={p._id} prediction={p} />
          ))}
        </div>
      )}
    </div>
  );
}