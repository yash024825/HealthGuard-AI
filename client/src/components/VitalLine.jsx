// Signature motif: an animated ECG pulse line used as a divider / accent.
export default function VitalLine({
  className = "",
  color = "var(--color-primary)",
  strokeWidth = 2,
  glow = false,
}) {
  return (
    <svg
      className={`vital-line ${className}`}
      viewBox="0 0 240 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={glow ? { filter: `drop-shadow(0 0 5px ${color})` } : undefined}
    >
      <path
        d="M0 12 H80 L92 12 L100 2 L110 22 L120 12 L130 18 L138 12 H240"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}