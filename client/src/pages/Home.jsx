import { Link } from "react-router-dom";
import {
  Activity,
  HeartPulse,
  UserRound,
  Sparkles,
  ShieldCheck,
  LineChart,
  ArrowRight,
  UserPlus,
  ClipboardList,
  Brain,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import VitalLine from "../components/VitalLine";
import ServiceIllustration from "../components/ServiceIllustration";

const services = [
  {
    variant: "diabetes",
    icon: Activity,
    title: "Diabetes Risk Prediction",
    description:
      "Analyze glucose, BMI, insulin and other clinical parameters to estimate diabetes risk using an AI-powered Random Forest model.",
  },
  {
    variant: "heart",
    icon: HeartPulse,
    title: "Heart Disease Prediction",
    description:
      "Predict cardiovascular disease risk from cholesterol, ECG, blood pressure and other health indicators.",
  },
  {
    variant: "profile",
    icon: UserRound,
    title: "Digital Health Profile",
    description:
      "Store your complete health profile securely and use it across every AI prediction.",
  },
  {
    variant: "recommend",
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Receive AI-generated lifestyle recommendations and preventive healthcare suggestions.",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Register securely in less than one minute.",
  },
  {
    icon: ClipboardList,
    title: "Complete Health Profile",
    description: "Provide your medical history and current vitals.",
  },
  {
    icon: Brain,
    title: "AI Prediction",
    description: "Our ML models instantly evaluate your health risk.",
  },
  {
    icon: LineChart,
    title: "Monitor Progress",
    description: "Track previous reports and improve your health over time.",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  const primaryCta = isAuthenticated
    ? { to: "/dashboard", label: "Open Dashboard" }
    : { to: "/register", label: "Get Started Free" };

  return (
    <div className="bg-health overflow-hidden">

      <PublicNavbar />

      {/* Hero */}

      <section className="relative">

        <div className="absolute -left-44 top-10 w-[450px] h-[450px] rounded-full bg-emerald-300/20 blur-[140px]" />

        <div className="absolute right-0 top-32 w-[350px] h-[350px] rounded-full bg-sky-300/20 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">

          <div className="grid lg:grid-cols-2 items-center gap-16">

            {/* Left */}

            <div className="animate-fade-up">

              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">

                <ShieldCheck size={16} />

                AI Powered Healthcare

              </span>

              <h1 className="mt-7 font-display text-5xl lg:text-6xl font-bold leading-tight">

                Predict Diseases.

                <br />

                <span className="gradient-text">
                  Protect Your Future.
                </span>

              </h1>

              <VitalLine className="mt-5 w-36 h-6"/>

              <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">

                HealthGuard AI combines Machine Learning and Healthcare
                Analytics to predict Diabetes and Heart Disease risks,
                helping individuals take preventive action before symptoms
                become severe.

              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  to={primaryCta.to}
                  className="btn-primary inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-7 py-4 rounded-xl shadow-card"
                >
                  {primaryCta.label}

                  <ArrowRight size={18} />

                </Link>

                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-[var(--color-border)] px-7 py-4 rounded-xl hover:border-[var(--color-primary)] transition"
                >
                  Explore Services
                </a>

              </div>

            </div>

            {/* Right */}

            <div className="relative animate-floating">

              <div className="glass rounded-3xl p-8 shadow-card">

                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80"
                  className="rounded-3xl"
                  alt=""
                />

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* ================= ABOUT ================= */}

      <section className="py-24 relative">

        <div className="absolute left-0 top-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute left-24 top-20 w-72 h-72 rounded-full bg-emerald-200 blur-[120px]" />
          <div className="absolute right-20 bottom-20 w-80 h-80 rounded-full bg-cyan-200 blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

          <div className="text-center max-w-3xl mx-auto">

            <span className="text-sm font-semibold text-[var(--color-primary)] tracking-widest uppercase">
              About HealthGuard AI
            </span>

            <h2 className="font-display text-4xl font-bold mt-4">
              Healthcare Intelligence Powered by
              <span className="gradient-text"> Artificial Intelligence</span>
            </h2>

            <VitalLine className="mx-auto mt-5 w-28 h-5" />

            <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
              HealthGuard AI combines a modern MERN architecture with
              Machine Learning models to identify health risks before
              they become serious medical conditions.
            </p>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

            <div className="glass rounded-3xl p-8 text-center shadow-card card-hover">

              <h3 className="text-5xl font-bold gradient-text">
                2
              </h3>

              <p className="mt-3 text-[var(--color-text-muted)]">
                AI Disease Models
              </p>

            </div>

            <div className="glass rounded-3xl p-8 text-center shadow-card card-hover">

              <h3 className="text-5xl font-bold gradient-text">
                &lt;1s
              </h3>

              <p className="mt-3 text-[var(--color-text-muted)]">
                Prediction Speed
              </p>

            </div>

            <div className="glass rounded-3xl p-8 text-center shadow-card card-hover">

              <h3 className="text-5xl font-bold gradient-text">
                MERN
              </h3>

              <p className="mt-3 text-[var(--color-text-muted)]">
                Full Stack Architecture
              </p>

            </div>

            <div className="glass rounded-3xl p-8 text-center shadow-card card-hover">

              <h3 className="text-5xl font-bold gradient-text">
                100%
              </h3>

              <p className="mt-3 text-[var(--color-text-muted)]">
                Secure Health Records
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="relative py-24 bg-gradient-to-b from-white to-emerald-50"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center max-w-3xl mx-auto">

            <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              Our Services
            </span>

            <h2 className="font-display text-4xl font-bold mt-4">
              Everything You Need For
              <span className="gradient-text"> Smart Healthcare</span>
            </h2>

            <VitalLine className="mx-auto mt-5 w-28 h-5" />

            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-8">
              Our platform combines Artificial Intelligence, clinical data,
              and intuitive dashboards to help you understand your health.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-20">

            {services.map((service) => (

              <div
                key={service.title}
                className="glass rounded-3xl overflow-hidden shadow-card card-hover group"
              >

                <ServiceIllustration variant={service.variant} />

                <div className="p-8">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] flex items-center justify-center group-hover:rotate-6 transition">

                      <service.icon
                        size={26}
                        className="text-[var(--color-primary)]"
                      />

                    </div>

                    <div>

                      <h3 className="font-display text-xl font-bold">

                        {service.title}

                      </h3>

                    </div>

                  </div>

                  <p className="mt-5 leading-8 text-[var(--color-text-muted)]">

                    {service.description}

                  </p>

                  <button
                    className="mt-8 inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all"
                  >
                    Learn More

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

            {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="relative py-24 bg-[var(--color-bg)] overflow-hidden"
      >
        <div className="absolute left-0 top-20 w-72 h-72 rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-sky-200/40 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

          <div className="text-center max-w-3xl mx-auto">

            <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-primary)]">
              How It Works
            </span>

            <h2 className="font-display text-4xl font-bold mt-4">
              Four Simple Steps to Better
              <span className="gradient-text"> Health Monitoring</span>
            </h2>

            <VitalLine className="mx-auto mt-5 w-28 h-5" />

            <p className="mt-6 text-lg text-[var(--color-text-muted)]">
              Create your profile, run AI predictions, and monitor your
              health over time with personalized recommendations.
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8 mt-20">

            {steps.map((step, index) => (

              <div
                key={step.title}
                className="relative glass rounded-3xl p-8 shadow-card card-hover"
              >

                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shadow-lg">

                  {index + 1}

                </div>

                <div className="mt-6 w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] flex items-center justify-center">

                  <step.icon
                    size={28}
                    className="text-[var(--color-primary)]"
                  />

                </div>

                <h3 className="font-display text-xl font-bold mt-6">

                  {step.title}

                </h3>

                <p className="mt-4 leading-8 text-[var(--color-text-muted)]">

                  {step.description}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-cyan-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}

            <div>

              <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-primary)]">
                Why Choose Us
              </span>

              <h2 className="font-display text-4xl font-bold mt-4">
                Smarter Healthcare With
                <span className="gradient-text">
                  {" "}Artificial Intelligence
                </span>
              </h2>

              <VitalLine className="mt-5 w-28 h-5" />

              <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">

                HealthGuard AI uses trusted Machine Learning algorithms
                to analyze your health information and generate
                personalized insights that can support preventive
                healthcare.

              </p>

              <div className="space-y-6 mt-10">

                <div className="flex gap-4">

                  <ShieldCheck
                    className="text-emerald-600 shrink-0 mt-1"
                    size={24}
                  />

                  <div>

                    <h4 className="font-semibold text-lg">

                      Secure Data Storage

                    </h4>

                    <p className="text-[var(--color-text-muted)] mt-1">

                      Your health records remain private and securely stored.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <Brain
                    className="text-blue-600 shrink-0 mt-1"
                    size={24}
                  />

                  <div>

                    <h4 className="font-semibold text-lg">

                      AI Prediction Engine

                    </h4>

                    <p className="text-[var(--color-text-muted)] mt-1">

                      Random Forest machine learning models provide fast,
                      accurate disease prediction.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <LineChart
                    className="text-orange-500 shrink-0 mt-1"
                    size={24}
                  />

                  <div>

                    <h4 className="font-semibold text-lg">

                      Health Analytics

                    </h4>

                    <p className="text-[var(--color-text-muted)] mt-1">

                      View prediction history and monitor improvements
                      over time.

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="glass rounded-[32px] p-8 shadow-card animate-floating">

              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80"
                alt="Healthcare"
                className="rounded-3xl w-full"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-24">

        <div className="max-w-6xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary-dark)] p-14 shadow-2xl">

            <div className="absolute inset-0 bg-ecg-grid opacity-10" />

            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

            <div className="relative text-center">

              <h2 className="font-display text-4xl font-bold text-white">

                Ready to Take Control
                <br />
                of Your Health?

              </h2>

              <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80 leading-8">

                Join HealthGuard AI today and receive intelligent disease
                prediction, personalized health recommendations, and
                continuous monitoring—all in one platform.

              </p>

              <Link
                to={primaryCta.to}
                className="inline-flex items-center gap-3 bg-white text-[var(--color-primary-dark)] px-8 py-4 rounded-2xl font-semibold mt-10 hover:scale-105 transition-all shadow-xl"
              >
                {primaryCta.label}

                <ArrowRight size={18} />

              </Link>
            </div>
          </div>
        </div>
      </section>

            {/* ================= TESTIMONIALS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center">

            <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-primary)]">
              Testimonials
            </span>

            <h2 className="font-display text-4xl font-bold mt-4">
              What People Say About
              <span className="gradient-text"> HealthGuard AI</span>
            </h2>

            <VitalLine className="mx-auto mt-5 w-28 h-5" />

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                name: "Sarah Johnson",
                role: "Fitness Enthusiast",
                review:
                  "The AI predictions gave me confidence to improve my lifestyle. The recommendations are simple and easy to follow.",
              },
              {
                name: "David Wilson",
                role: "Working Professional",
                review:
                  "I liked the clean dashboard and quick predictions. It feels like having a personal health assistant.",
              },
              {
                name: "Emily Brown",
                role: "Student",
                review:
                  "Easy to use, modern interface, and insightful health reports. Definitely a useful preventive healthcare tool.",
              },
            ].map((item) => (

              <div
                key={item.name}
                className="glass rounded-3xl p-8 shadow-card card-hover"
              >

                <div className="flex text-yellow-400 text-xl">

                  ★★★★★

                </div>

                <p className="mt-6 text-[var(--color-text-muted)] leading-8">

                  "{item.review}"

                </p>

                <div className="mt-8">

                  <h4 className="font-semibold">

                    {item.name}

                  </h4>

                  <span className="text-sm text-[var(--color-text-muted)]">

                    {item.role}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= TECHNOLOGIES ================= */}

      <section className="py-24 bg-gradient-to-b from-emerald-50 to-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center">

            <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-primary)]">
              Technology Stack
            </span>

            <h2 className="font-display text-4xl font-bold mt-4">

              Built Using Modern Technologies

            </h2>

            <VitalLine className="mx-auto mt-5 w-28 h-5" />

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

            {[
              "React",
              "Node.js",
              "Express.js",
              "MongoDB",
              "FastAPI",
              "Python",
              "Scikit-Learn",
              "Random Forest",
            ].map((tech) => (

              <div
                key={tech}
                className="glass rounded-2xl py-8 text-center shadow-card card-hover font-semibold"
              >

                {tech}

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center">

            <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-primary)]">
              FAQ
            </span>

            <h2 className="font-display text-4xl font-bold mt-4">

              Frequently Asked Questions

            </h2>

            <VitalLine className="mx-auto mt-5 w-28 h-5" />

          </div>

          <div className="space-y-6 mt-16">

            {[
              {
                q: "Is HealthGuard AI a medical diagnosis tool?",
                a: "No. It provides AI-based risk predictions that support preventive healthcare and should not replace professional medical advice.",
              },
              {
                q: "How accurate are the predictions?",
                a: "Predictions are generated using Random Forest models trained on publicly available healthcare datasets and are intended for educational purposes.",
              },
              {
                q: "Is my health information secure?",
                a: "Yes. User information is securely stored and protected using authentication and encrypted communication.",
              },
            ].map((faq) => (

              <div
                key={faq.q}
                className="glass rounded-2xl p-6 shadow-card"
              >

                <h3 className="font-semibold text-lg">

                  {faq.q}

                </h3>

                <p className="mt-3 text-[var(--color-text-muted)] leading-8">

                  {faq.a}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <Footer />

    </div>

  );
}

