import { Link } from "react-router-dom";
import { HeartPulse, Activity, ChevronRight } from "lucide-react";
import RiskBadge from "./RiskBadge";

export default function PredictionCard({ prediction }) {
  const Icon = prediction.predictionType === "heart_disease" ? HeartPulse : Activity;
  const title =
    prediction.predictionType === "heart_disease" ? "Heart Disease" : "Diabetes";

  return (
    <Link
      to={`/predictions/${prediction._id}`}
      className="flex items-center gap-4 bg-[var(--color-surface)] rounded-xl px-4 py-3.5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center shrink-0">
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-[var(--color-text)] truncate">
          {title} — {prediction.prediction?.label}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {new Date(prediction.createdAt).toLocaleString()}
        </p>
      </div>

      <RiskBadge level={prediction.prediction?.riskLevel} />
      <ChevronRight
        size={18}
        className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors shrink-0"
      />
    </Link>
  );
}