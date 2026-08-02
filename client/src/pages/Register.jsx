import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import VitalLine from "../components/VitalLine";
import AuthShowcasePanel from "../components/AuthShowcasePanel";
import GoogleAuthButton from "../components/GoogleAuthButton";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .max(15, "Phone number is too long"),
    gender: z.string().min(1, "Select your gender"),
    dateOfBirth: z.string().min(1, "Select your date of birth"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await registerUser(
        data.fullName,
        data.email,
        data.password,
        data.phone,
        data.gender,
        data.dateOfBirth
      );
      toast.success("Account created");
      navigate("/health-profile", { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Could not create your account."
      );
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
              HealthGuard
              <span className="text-[var(--color-accent)]">AI</span>
            </h1>
            <VitalLine className="w-28 h-6 mx-auto mt-2" />
            <p className="text-sm text-[var(--color-text-muted)] mt-3">
              Create an account to start tracking your health risk.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 space-y-5">
            <GoogleAuthButton redirectTo="/health-profile" />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-muted)]">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  {...register("fullName")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                />
                {errors.fullName && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  autoComplete="tel"
                  {...register("phone")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                />
                {errors.phone && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                />
                {errors.dateOfBirth && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("password")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                />
                {errors.password && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-[var(--color-risk-high)] mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <AuthShowcasePanel />
    </div>
  );
}