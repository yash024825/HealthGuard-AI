import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  HeartPulse,
  Scale,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import PredictionCard from "../components/PredictionCard";
import VitalLine from "../components/VitalLine";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(undefined);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    api
      .get("/health")
      .then((res) => setProfile(res.data.data))
      .catch(() => setProfile(null));

    api
      .get("/predictions")
      .then((res) => setPredictions(res.data.data))
      .catch(() => setPredictions([]));
  }, []);

  if (profile === undefined || predictions === null) {
    return <Loader label="Loading your dashboard" />;
  }

  const bmi =
    profile?.height && profile?.weight
      ? (profile.weight / (profile.height / 100) ** 2).toFixed(1)
      : "—";

  const latestDiabetes = predictions.find(
    (p) => p.predictionType === "diabetes"
  );
  const latestHeart = predictions.find(
    (p) => p.predictionType === "heart_disease"
  );

  const riskCounts = ["Low", "Medium", "High", "Critical"]
    .map((level) => ({
      level,
      count: predictions.filter((p) => p.prediction?.riskLevel === level)
        .length,
    }))
    .filter((r) => r.count > 0);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">
          Hello, {user?.fullName?.split(" ")[0] || "there"}
        </h1>
        <VitalLine className="w-24 h-5 mt-2" />
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Here's a snapshot of your health risk profile.
        </p>
      </div>

      {!profile && (
        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary)]/20 rounded-xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-[var(--color-primary-dark)]">
            You haven't set up a health profile yet — add it to get more
            accurate predictions.
          </p>
          <Link
            to="/health-profile"
            className="text-sm font-medium bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] shrink-0"
          >
            Set up profile
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="BMI" value={bmi} icon={Scale} />
        <StatCard
          label="Diabetes risk"
          value={latestDiabetes?.prediction?.riskLevel || "—"}
          icon={Activity}
        />
        <StatCard
          label="Heart risk"
          value={latestHeart?.prediction?.riskLevel || "—"}
          icon={HeartPulse}
        />
        <StatCard
          label="Total checks"
          value={predictions.length}
          icon={ClipboardList}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <Link
          to="/predict/diabetes"
          className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-center justify-between hover:border-[var(--color-primary)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center">
              <Activity size={18} />
            </div>
            <div>
              <p className="font-display font-semibold">Run diabetes check</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Enter lab values for a new prediction
              </p>
            </div>
          </div>
          <ArrowRight
            size={18}
            className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors"
          />
        </Link>

        <Link
          to="/predict/heart"
          className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-center justify-between hover:border-[var(--color-accent)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center">
              <HeartPulse size={18} />
            </div>
            <div>
              <p className="font-display font-semibold">Run heart check</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Enter checkup values for a new prediction
              </p>
            </div>
          </div>
          <ArrowRight
            size={18}
            className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
          />
        </Link>
      </div>

      {riskCounts.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h2 className="font-display font-semibold mb-4">
            Risk level breakdown
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={riskCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="level" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold">Recent predictions</h2>
          <Link
            to="/history"
            className="text-sm text-[var(--color-primary)] font-medium hover:underline"
          >
            View all
          </Link>
        </div>

        {predictions.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)]">
            No predictions yet. Run your first check above.
          </p>
        ) : (
          <div className="space-y-3">
            {predictions.slice(0, 3).map((p) => (
              <PredictionCard key={p._id} prediction={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
