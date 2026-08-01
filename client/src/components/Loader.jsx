import VitalLine from "./VitalLine";

export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 w-full">
      <VitalLine className="w-32 h-8" />
      <p className="text-sm text-[var(--color-text-muted)] font-data tracking-wide">
        {label}…
      </p>
    </div>
  );
}
