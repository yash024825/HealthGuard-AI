import { ShieldCheck, Activity, HeartPulse } from "lucide-react";

// Original illustration: a risk-gauge dial + ECG trace + floating metric
// cards, evoking what the product actually does (AI risk scoring),
// rather than a generic stock illustration.
function RiskDialArt() {
  return (
    <svg viewBox="0 0 420 420" className="w-full h-auto max-w-sm mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="dialArc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4FB89A" />
          <stop offset="55%" stopColor="#E4C266" />
          <stop offset="100%" stopColor="#E2776B" />
        </linearGradient>
      </defs>

      {/* Outer risk gauge */}
      <circle cx="210" cy="210" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="22" />
      <path
        d="M 87 297 A 150 150 0 1 1 333 297"
        fill="none"
        stroke="url(#dialArc)"
        strokeWidth="22"
        strokeLinecap="round"
      />

      {/* Needle */}
      <g transform="rotate(35 210 210)">
        <line x1="210" y1="210" x2="210" y2="95" stroke="#F5F8F7" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="210" cy="210" r="10" fill="#F5F8F7" />

      {/* Center readout */}
      <text x="210" y="255" textAnchor="middle" fill="#F5F8F7" fontSize="15" fontFamily="IBM Plex Mono, monospace" opacity="0.85">
        RISK SCORE
      </text>

      {/* ECG trace threading through the base */}
      <path
        d="M20 360 H150 L165 360 L178 335 L192 385 L206 360 L220 372 L232 360 H400"
        fill="none"
        stroke="#4FB89A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

const points = [
  { icon: Activity, text: "AI-scored diabetes & heart disease risk" },
  { icon: HeartPulse, text: "Personalized, actionable recommendations" },
  { icon: ShieldCheck, text: "Your health data stays private" },
];

export default function AuthShowcasePanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-full h-full bg-[var(--color-primary-dark)] text-white px-12 py-14 relative overflow-hidden">
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #4FB89A, transparent 70%)" }}
      />

      <div className="relative">
        <h2 className="font-display text-3xl font-semibold leading-tight max-w-sm">
          Know your risk before it becomes a diagnosis.
        </h2>
        <p className="text-white/60 text-sm mt-3 max-w-sm">
          HealthGuard AI turns your health profile into a clear, model-backed
          risk score for diabetes and heart disease.
        </p>
      </div>

      <div className="relative">
        <RiskDialArt />
      </div>

      <ul className="relative space-y-3">
        {points.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-white/80">
            <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Icon size={15} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
