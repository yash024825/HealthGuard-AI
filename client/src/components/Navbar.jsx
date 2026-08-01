import { Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  const initials = (user?.fullName || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-[var(--color-surface)]/90 backdrop-blur-sm border-b border-[var(--color-border)] px-4 lg:px-8 py-3 shadow-sm">
      <button
        className="lg:hidden p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-[var(--color-text-muted)]">Welcome back,</p>
        <p className="font-display font-semibold text-[var(--color-text)]">
          {user?.fullName || "—"}
        </p>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link
          to="/profile"
          className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full hover:bg-[var(--color-surface-alt)] transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] font-display font-semibold flex items-center justify-center text-sm ring-2 ring-transparent group-hover:ring-[var(--color-primary)]/30 transition-all shrink-0">
            {initials}
          </div>
          <span className="hidden sm:block text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary-dark)] transition-colors">
            Profile
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-risk-high)] hover:bg-[var(--color-risk-high-bg)] px-3 py-2 rounded-full transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}