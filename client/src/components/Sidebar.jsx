import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Activity,
  HeartPulse,
  History,
} from "lucide-react";
import VitalLine from "./VitalLine";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/health-profile", label: "Health Profile", icon: UserRound },
  { to: "/predict/diabetes", label: "Diabetes Check", icon: Activity },
  { to: "/predict/heart", label: "Heart Check", icon: HeartPulse },
  { to: "/history", label: "History", icon: History },
];

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 shrink-0
        bg-[var(--color-primary-dark)] text-white
        flex flex-col
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
    >
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="font-display text-lg font-semibold tracking-tight">
          HealthGuard<span className="text-[var(--color-accent)]">AI</span>
        </h1>
        <VitalLine className="w-24 h-4 mt-2" color="#4FB89A" />
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10 text-xs text-white/40 font-data">
        v1.0.0 — Risk models are informational,
        <br />
        not a medical diagnosis.
      </div>
    </aside>
  );
}
