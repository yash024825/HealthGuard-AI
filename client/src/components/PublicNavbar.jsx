import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import VitalLine from "./VitalLine";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

export default function PublicNavbar() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col shrink-0">
          <span className="font-display text-lg font-bold text-[var(--color-primary-dark)]">
            HealthGuard<span className="text-[var(--color-accent)]">AI</span>
          </span>
          <VitalLine className="w-16 h-3" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="text-sm font-medium bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-[var(--color-text)]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] px-4 py-4 space-y-3 bg-[var(--color-bg)]">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-[var(--color-text)]"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-center text-sm font-medium bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-center text-sm font-medium border border-[var(--color-border)] px-4 py-2 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-center text-sm font-medium bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
