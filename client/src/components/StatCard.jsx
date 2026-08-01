export default function StatCard({ label, value, unit, icon: Icon, accent }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)] font-medium">
          {label}
        </p>
        <p className="font-data text-2xl font-semibold text-[var(--color-text)] mt-1.5">
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
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: accent || "var(--color-primary-light)" }}
        >
          <Icon size={16} className="text-[var(--color-primary-dark)]" />
        </div>
      )}
    </div>
  );
}
