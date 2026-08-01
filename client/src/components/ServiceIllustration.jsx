const images = {
  diabetes:
    "https://cdn.analyticsvidhya.com/wp-content/uploads/2022/01/Diabetes-Prediction-Using-Machine-Learning.webp",

  heart:
    "https://cdn.analyticsvidhya.com/wp-content/uploads/2022/02/Heart-Disease-Prediction-using-Machine-Learning.webp",

  // Replace these with your own downloaded images inside src/assets
  profile:
    "https://www.shutterstock.com/image-photo/health-insurance-medical-service-concept-260nw-2758293359.jpg",

  recommend:
    "https://www.shutterstock.com/image-photo/medical-worker-touch-virtual-revolution-260nw-2465630553.jpg",
};

const titles = {
  diabetes: "Diabetes Prediction",
  heart: "Heart Disease Prediction",
  profile: "Health Profile",
  recommend: "AI Recommendations",
};

export default function ServiceIllustration({ variant }) {
  const image = images[variant] || images.diabetes;
  const title = titles[variant] || "HealthGuard AI";

  return (
    <div className="group relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">

      {/* Image */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = images.diabetes;
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />

      {/* Top Badge */}
      <div className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-xs font-semibold text-white shadow">
        AI Powered
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">

        <h3 className="text-xl font-display font-bold text-white drop-shadow">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/90">
          Intelligent machine learning models that provide accurate health
          risk assessments and personalized healthcare insights.
        </p>

      </div>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-teal-300/40 transition-all duration-500" />

    </div>
  );
}