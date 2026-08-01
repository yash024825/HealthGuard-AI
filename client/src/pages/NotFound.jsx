import { Link } from "react-router-dom";
import VitalLine from "../components/VitalLine";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] px-4 text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-ecg-grid opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative bg-[var(--color-surface)] rounded-2xl shadow-card-hover px-10 py-10 max-w-md">
        <VitalLine className="w-32 h-8 mx-auto mb-4" glow />
        <p className="font-data text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">
          Page not found
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-block text-sm font-medium text-white bg-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}