import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  HeartPulse,
  Activity,
} from "lucide-react";
import VitalLine from "./VitalLine";

const CONTACT = {
  phone: "+91 98765 43210",
  email: "admin@healthguardai.app",
  location: "Hyderabad, India",
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[#062E2A] via-[#073F38] to-[#0B5D52] text-white"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
                <HeartPulse size={24} />
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold">
                  HealthGuard
                  <span className="text-teal-300"> AI</span>
                </h2>

                <VitalLine
                  className="w-24 h-4 mt-1"
                  color="#4FB89A"
                />
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/70">
              AI-powered personalized healthcare platform that predicts
              Diabetes and Heart Disease risks using Machine Learning,
              helping users take preventive actions before complications arise.
            </p>

            {/* Trust Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500/15 border border-teal-400/20 px-4 py-2 text-sm text-teal-200">
              <ShieldCheck size={16} />
              Secure • Private • AI Powered
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-white/70">

              <li>
                <a
                  href="#services"
                  className="hover:text-teal-300 transition"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-teal-300 transition"
                >
                  How It Works
                </a>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-teal-300 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-teal-300 transition"
                >
                  Register
                </Link>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-5">
              AI Services
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Activity size={18} />
                </div>

                <div>
                  <p className="font-medium">
                    Diabetes Prediction
                  </p>

                  <span className="text-xs text-white/60">
                    Machine Learning Model
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <HeartPulse size={18} />
                </div>

                <div>
                  <p className="font-medium">
                    Heart Disease Prediction
                  </p>

                  <span className="text-xs text-white/60">
                    Random Forest Model
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                <Phone className="text-teal-300 mt-1" size={18} />

                <div>
                  <p className="font-medium">
                    Phone
                  </p>

                  <p className="text-sm text-white/60">
                    {CONTACT.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                <Mail className="text-teal-300 mt-1" size={18} />

                <div>
                  <p className="font-medium">
                    Email
                  </p>

                  <p className="text-sm text-white/60">
                    {CONTACT.email}
                  </p>
                </div>
              </a>

              <div className="flex gap-3 p-3 rounded-xl bg-white/5">
                <MapPin className="text-teal-300 mt-1" size={18} />

                <div>
                  <p className="font-medium">
                    Address
                  </p>

                  <p className="text-sm text-white/60">
                    {CONTACT.location}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-white/60">

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              HealthGuard AI
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-2">
            <ShieldCheck
              size={16}
              className="text-teal-300"
            />

            <span>
              Predictions are AI-assisted and should not replace professional
              medical advice.
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}