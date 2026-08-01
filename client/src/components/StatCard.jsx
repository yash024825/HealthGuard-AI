const TONES = {
  primary: { bg: "var(--color-primary-light)", fg: "var(--color-primary-dark)", bar: "var(--color-primary)" },
  accent: { bg: "var(--color-accent-light)", fg: "var(--color-accent)", bar: "var(--color-accent)" },
  "risk-high": { bg: "var(--color-risk-high-bg)", fg: "var(--color-risk-high)", bar: "var(--color-risk-high)" },
  "risk-medium": { bg: "var(--color-risk-medium-bg)", fg: "var(--color-risk-medium)", bar: "var(--color-risk-medium)" },
  "risk-low": { bg: "var(--color-risk-low-bg)", fg: "var(--color-risk-low)", bar: "var(--color-risk-low)" },
  neutral: { bg: "var(--color-surface-alt)", fg: "var(--color-text-muted)", bar: "var(--color-border)" },
};

export default function StatCard({ label, value, unit, icon: Icon, tone = "primary" }) {
  const t = TONES[tone] || TONES.primary;

  return (
    <div className="relative bg-[var(--color-surface)] rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <span
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: t.bar }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] font-medium truncate">
            {label}
          </p>
          <p className="font-data text-2xl font-semibold text-[var(--color-text)] mt-1.5 tabular-nums">
            {value}
            {unit && (
              <span className="text-sm text-[var(--color-text-muted)] ml-1">
                {unit}
              </span>
            )}
          </p>
        </div>
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: t.bg, color: t.fg }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
}