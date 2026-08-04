import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import VitalLine from "../components/VitalLine";
import AuthShowcasePanel from "../components/AuthShowcasePanel";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { getAuthErrorMessage } from "../utils/authError";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("Welcome back");
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(getAuthErrorMessage(err, "Invalid email or password."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--color-bg)]">
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-[var(--color-primary-dark)]">
              HealthGuard<span className="text-[var(--color-accent)]">AI</span>
            </h1>
            <VitalLine className="w-28 h-6 mx-auto mt-2" />
            <p className="text-sm text-[var(--color-text-muted)] mt-3">
              Sign in to view your health risk dashboard.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 space-y-5">
            <GoogleAuthButton redirectTo="/dashboard" />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-muted)]">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      <AuthShowcasePanel />
    </div>
  );
}