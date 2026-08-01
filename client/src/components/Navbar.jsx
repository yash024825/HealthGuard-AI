import { Menu, LogOut, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const initials = (user?.fullName || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-white/80
        border-b
        border-white/40
        shadow-lg
      "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Welcome */}
        <div className="hidden lg:flex flex-col">
          <span className="text-sm text-slate-500">{today}</span>

          <h2 className="font-display text-xl font-bold text-slate-800">
            Welcome back,
            <span className="text-teal-600">
              {" "}
              {user?.fullName || "User"}
            </span>
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 ml-auto">

          {/* Health Badge */}
          <div className="hidden md:flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full">
            <ShieldCheck size={18} />
            <span className="text-sm font-medium">
              HealthGuard AI
            </span>
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            className="
              flex
              items-center
              gap-3
              bg-white
              rounded-full
              shadow
              hover:shadow-lg
              transition-all
              duration-300
              px-2
              py-2
            "
          >
            <div
              className="
                h-11
                w-11
                rounded-full
                bg-gradient-to-br
                from-teal-500
                to-cyan-600
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
            >
              {initials}
            </div>

            <div className="hidden sm:block">
              <p className="font-semibold text-slate-800">
                {user?.fullName}
              </p>

              <p className="text-xs text-slate-500">
                View Profile
              </p>
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2.5
              bg-red-50
              text-red-600
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-300
              font-medium
            "
          >
            <LogOut size={17} />
            <span className="hidden md:block">
              Logout
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}