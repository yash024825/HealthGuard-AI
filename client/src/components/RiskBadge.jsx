const styles = {
  Low: "text-[var(--color-risk-low)] bg-[var(--color-risk-low-bg)]",
  Medium: "text-[var(--color-risk-medium)] bg-[var(--color-risk-medium-bg)]",
  High: "text-[var(--color-risk-high)] bg-[var(--color-risk-high-bg)]",
  Critical: "text-[var(--color-risk-high)] bg-[var(--color-risk-high-bg)]",
};

export default function RiskBadge({ level }) {
  const cls = styles[level] || "text-[var(--color-text-muted)] bg-[var(--color-surface-alt)]";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-data ${cls}`}
    >
      {level || "Unknown"} risk
    </span>
  );
}
