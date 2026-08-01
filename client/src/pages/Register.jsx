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
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await registerUser(data.fullName, data.email, data.password);
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

  const fields = [
    { name: "fullName", label: "Full name", type: "text", placeholder: "Jane Doe", autoComplete: "name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••", autoComplete: "new-password" },
    { name: "confirmPassword", label: "Confirm password", type: "password", placeholder: "••••••••", autoComplete: "new-password" },
  ];

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    autoComplete={f.autoComplete}
                    {...register(f.name)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                    placeholder={f.placeholder}
                  />
                  {errors[f.name] && (
                    <p className="text-xs text-[var(--color-risk-high)] mt-1">
                      {errors[f.name].message}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                {submitting ? "Creating account…" : "Create account"}
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
