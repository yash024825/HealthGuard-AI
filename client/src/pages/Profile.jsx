import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  CalendarDays,
  BadgeCheck,
  ShieldCheck,
  UserRound,
  Activity,
  HeartPulse,
  History as HistoryIcon,
  LogOut,
  Scale,
  ClipboardList,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import VitalLine from "../components/VitalLine";
import StatCard from "../components/StatCard";

const RISK_TONE = {
  Low: "risk-low",
  Medium: "risk-medium",
  High: "risk-high",
  Critical: "risk-high",
};

function initialsOf(name) {
  return (name || "?")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-9 h-9 rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] flex items-center justify-center shrink-0">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="text-sm font-medium text-[var(--color-text)] truncate">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [account, setAccount] = useState(undefined);
  const [healthProfile, setHealthProfile] = useState(undefined);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setAccount(res.data.user))
      .catch(() => setAccount(null));

    api
      .get("/health")
      .then((res) => setHealthProfile(res.data.data))
      .catch(() => setHealthProfile(null));

    api
      .get("/predictions")
      .then((res) => setPredictions(res.data.data))
      .catch(() => setPredictions([]));
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  if (account === undefined || predictions === null) {
    return <Loader label="Loading your profile" />;
  }

  if (!account) {
    return (
      <p className="text-sm text-[var(--color-risk-high)]">
        Could not load your account. Try signing in again.
      </p>
    );
  }

  const bmi =
    healthProfile?.height && healthProfile?.weight
      ? (healthProfile.weight / (healthProfile.height / 100) ** 2).toFixed(1)
      : "—";

  const latestDiabetes = predictions.find((p) => p.predictionType === "diabetes");
  const latestHeart = predictions.find((p) => p.predictionType === "heart_disease");

  const memberSince = account.createdAt
    ? new Date(account.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "—";

  const dob = account.dateOfBirth
    ? new Date(account.dateOfBirth).toLocaleDateString()
    : "—";

  return (
    <div className="max-w-3xl">
      {/* Hero: identity banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] px-6 py-8 lg:px-8 mb-8 shadow-card-hover">
        <div className="absolute inset-0 bg-ecg-grid" aria-hidden="true" />
        <div
          className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-[#4FB89A] opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          {account.profileImage ? (
            <img
              src={account.profileImage}
              alt=""
              className="w-20 h-20 rounded-2xl object-cover shadow-card-hover shrink-0 border-2 border-white/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 text-white font-display text-2xl font-semibold flex items-center justify-center shrink-0">
              {initialsOf(account.fullName)}
            </div>
          )}

          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold text-white truncate">
              {account.fullName}
            </h1>
            <p className="text-sm text-white/70 mt-0.5 truncate">{account.email}</p>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-data text-white/80">
                <ShieldCheck size={13} />
                {account.authProvider === "google" ? "Google account" : "Email & password"}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-data text-white/80">
                <BadgeCheck size={13} />
                Member since {memberSince}
              </span>
            </div>
          </div>
        </div>

        <VitalLine className="relative w-full h-8 mt-6" color="#7FE3C4" glow />
      </div>

      {/* Health snapshot */}
      <p className="text-[10px] font-data uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
        Health snapshot
      </p>
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account details */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-card p-6">
          <h2 className="font-display font-semibold mb-1">Account details</h2>
          <p className="text-xs text-[var(--color-text-muted)] mb-2">
            Synced from your account — not editable yet.
          </p>
          <div className="divide-y divide-[var(--color-border)]">
            <DetailRow icon={Mail} label="Email" value={account.email} />
            <DetailRow icon={Phone} label="Phone" value={account.phone} />
            <DetailRow
              icon={UserRound}
              label="Gender"
              value={account.gender}
            />
            <DetailRow icon={CalendarDays} label="Date of birth" value={dob} />
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <Link
            to="/health-profile"
            className="group relative flex items-center justify-between gap-3 bg-[var(--color-surface)] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center shrink-0">
                <UserRound size={19} />
              </div>
              <div>
                <p className="font-display font-semibold">Health profile</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Update vitals, lifestyle & medical history
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/history"
            className="group relative flex items-center justify-between gap-3 bg-[var(--color-surface)] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center shrink-0">
                <HistoryIcon size={19} />
              </div>
              <div>
                <p className="font-display font-semibold">Prediction history</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Review past risk checks
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-risk-high-bg)] text-[var(--color-risk-high)] font-medium text-sm py-3 rounded-2xl hover:opacity-80 transition-opacity"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}