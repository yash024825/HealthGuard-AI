import { Link } from "react-router-dom";
import VitalLine from "../components/VitalLine";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] px-4 text-center">
      <VitalLine className="w-32 h-8 mb-4" />
      <h1 className="font-display text-3xl font-bold text-[var(--color-text)]">
        Page not found
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mt-2 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/dashboard"
        className="text-sm font-medium text-white bg-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)]"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
