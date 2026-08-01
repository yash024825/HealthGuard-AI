import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import api from "../api/axios";
import Loader from "../components/Loader";
import RiskBadge from "../components/RiskBadge";
import VitalLine from "../components/VitalLine";

export default function PredictionResult() {
  const { id } = useParams();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/predictions/${id}`)
      .then((res) => setPrediction(res.data.data))
      .catch(() => setError("This prediction could not be found."));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-xl">
        <p className="text-[var(--color-risk-high)] mb-4">{error}</p>
        <Link
          to="/history"
          className="text-[var(--color-primary)] font-medium hover:underline"
        >
          Back to history
        </Link>
      </div>
    );
  }

  if (!prediction) return <Loader label="Loading result" />;

  const isPositive = prediction.prediction?.label === "Positive";
  const title =
    prediction.predictionType === "heart_disease"
      ? "Heart disease"
      : "Diabetes";

  const accentColor = isPositive ? "var(--color-risk-high)" : "var(--color-risk-low)";
  const accentBg = isPositive ? "var(--color-risk-high-bg)" : "var(--color-risk-low-bg)";

  return (
    <div className="max-w-2xl">
      <Link
        to="/history"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to history
      </Link>

      <div className="relative bg-[var(--color-surface)] rounded-2xl shadow-card-hover overflow-hidden">
        <span
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] font-medium">
                {title} prediction
              </p>
              <h1 className="font-display text-2xl font-bold text-[var(--color-text)] mt-1">
                {prediction.prediction?.label}
              </h1>
            </div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: accentBg, color: accentColor }}
            >
              {isPositive ? (
                <AlertTriangle size={26} />
              ) : (
                <CheckCircle2 size={26} />
              )}
            </div>
          </div>

          <VitalLine className="w-32 h-6 mt-4" color={accentColor} glow />

          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            <RiskBadge level={prediction.prediction?.riskLevel} />
            {prediction.prediction?.confidence != null && (
              <span className="font-data text-xs bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] px-2.5 py-1 rounded-full">
                Confidence {prediction.prediction.confidence}%
              </span>
            )}
            {prediction.prediction?.probability != null && (
              <span className="font-data text-xs bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] px-2.5 py-1 rounded-full">
                Probability {(prediction.prediction.probability * 100).toFixed(1)}%
              </span>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <h2 className="font-display font-semibold mb-3">Recommendations</h2>
            <ul className="space-y-2.5">
              {prediction.prediction?.recommendations?.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-text)] bg-[var(--color-surface-alt)] rounded-lg px-3.5 py-2.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] mt-6 pt-6 border-t border-[var(--color-border)]">
            Generated on {new Date(prediction.createdAt).toLocaleString()} using{" "}
            {prediction.modelName}. This is a statistical estimate, not a
            medical diagnosis — always consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}