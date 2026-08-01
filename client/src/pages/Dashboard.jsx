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

const RISK_TONE = {
  Low: "risk-low",
  Medium: "risk-medium",
  High: "risk-high",
  Critical: "risk-high",
};

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-primary-dark)] text-white text-xs font-data rounded-lg px-3 py-2 shadow-card-hover">
      {label}: {payload[0].value}
    </div>
  );
}

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
      {/* Hero: signature vital-monitor banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] px-6 py-7 lg:px-8 lg:py-9 mb-8 shadow-card-hover">
        <div className="absolute inset-0 bg-ecg-grid" aria-hidden="true" />
        <div
          className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#4FB89A] opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] font-data uppercase tracking-[0.2em] text-white/50 mb-2">
              Health monitor
            </p>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-white">
              Hello, {user?.fullName?.split(" ")[0] || "there"}
            </h1>
            <p className="text-sm text-white/70 mt-2 max-w-md">
              Here's a snapshot of your health risk profile.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-data text-white/80 whitespace-nowrap">
              {predictions.length} check{predictions.length !== 1 ? "s" : ""} logged
            </span>
          </div>
        </div>

        <VitalLine
          className="relative w-full h-10 mt-6 lg:mt-8"
          color="#7FE3C4"
          strokeWidth={2.5}
          glow
        />
      </div>

      {!profile && (
        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary)]/20 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap shadow-card">
          <p className="text-sm text-[var(--color-primary-dark)]">
            You haven't set up a health profile yet — add it to get more
            accurate predictions.
          </p>
          <Link
            to="/health-profile"
            className="text-sm font-medium bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors shrink-0"
          >
            Set up profile
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="BMI" value={bmi} icon={Scale} tone="primary" />
        <StatCard
          label="Diabetes risk"
          value={latestDiabetes?.prediction?.riskLevel || "—"}
          icon={Activity}
          tone={RISK_TONE[latestDiabetes?.prediction?.riskLevel] || "neutral"}
        />
        <StatCard
          label="Heart risk"
          value={latestHeart?.prediction?.riskLevel || "—"}
          icon={HeartPulse}
          tone={RISK_TONE[latestHeart?.prediction?.riskLevel] || "neutral"}
        />
        <StatCard
          label="Total checks"
          value={predictions.length}
          icon={ClipboardList}
          tone="neutral"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <Link
          to="/predict/diabetes"
          className="group relative bg-[var(--color-surface)] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Activity size={19} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-data uppercase tracking-widest text-[var(--color-text-muted)] mb-0.5">
                  New check
                </p>
                <p className="font-display font-semibold truncate">
                  Run diabetes check
                </p>
              </div>
            </div>
            <ArrowRight
              size={18}
              className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all duration-200 shrink-0"
            />
          </div>
        </Link>

        <Link
          to="/predict/heart"
          className="group relative bg-[var(--color-surface)] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <HeartPulse size={19} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-data uppercase tracking-widest text-[var(--color-text-muted)] mb-0.5">
                  New check
                </p>
                <p className="font-display font-semibold truncate">
                  Run heart check
                </p>
              </div>
            </div>
            <ArrowRight
              size={18}
              className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-200 shrink-0"
            />
          </div>
        </Link>
      </div>

      {riskCounts.length > 0 && (
        <div className="bg-[var(--color-surface)] rounded-2xl p-6 mb-8 shadow-card">
          <p className="text-[10px] font-data uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            Overview
          </p>
          <h2 className="font-display font-semibold mb-4">
            Risk level breakdown
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={riskCounts}>
              <defs>
                <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="level"
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip cursor={{ fill: "var(--color-surface-alt)" }} content={<ChartTooltip />} />
              <Bar dataKey="count" fill="url(#barFill)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-data uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
              Activity
            </p>
            <h2 className="font-display font-semibold">Recent predictions</h2>
          </div>
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