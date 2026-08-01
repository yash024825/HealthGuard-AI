import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HeartPulse } from "lucide-react";
import api from "../api/axios";
import VitalLine from "../components/VitalLine";

const numberFields = [
  { name: "age", label: "Age", step: "1", placeholder: "45" },
  { name: "trestbps", label: "Resting blood pressure (mm Hg)", step: "1", placeholder: "130" },
  { name: "chol", label: "Cholesterol (mg/dL)", step: "1", placeholder: "220" },
  { name: "thalach", label: "Max heart rate achieved", step: "1", placeholder: "150" },
  { name: "oldpeak", label: "ST depression (oldpeak)", step: "0.1", placeholder: "1.0" },
  { name: "ca", label: "Major vessels colored by fluoroscopy (0-4)", step: "1", placeholder: "0" },
];

const selectFields = [
  {
    name: "sex",
    label: "Sex",
    options: [
      { value: 1, label: "Male" },
      { value: 0, label: "Female" },
    ],
  },
  {
    name: "cp",
    label: "Chest pain type",
    options: [
      { value: 0, label: "Typical angina" },
      { value: 1, label: "Atypical angina" },
      { value: 2, label: "Non-anginal pain" },
      { value: 3, label: "Asymptomatic" },
    ],
  },
  {
    name: "fbs",
    label: "Fasting blood sugar > 120 mg/dL",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
  {
    name: "restecg",
    label: "Resting ECG results",
    options: [
      { value: 0, label: "Normal" },
      { value: 1, label: "ST-T wave abnormality" },
      { value: 2, label: "Left ventricular hypertrophy" },
    ],
  },
  {
    name: "exang",
    label: "Exercise-induced angina",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
  {
    name: "slope",
    label: "Slope of peak exercise ST segment",
    options: [
      { value: 0, label: "Upsloping" },
      { value: 1, label: "Flat" },
      { value: 2, label: "Downsloping" },
    ],
  },
  {
    name: "thal",
    label: "Thalassemia result",
    options: [
      { value: 1, label: "Fixed defect" },
      { value: 2, label: "Normal" },
      { value: 3, label: "Reversible defect" },
    ],
  },
];

const labelCls = "block text-sm font-medium text-[var(--color-text)] mb-1.5";
const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white hover:border-[var(--color-accent)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-colors text-sm";

export default function HeartPrediction() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = { predictionType: "heart" };
      numberFields.forEach((f) => {
        payload[f.name] = Number(data[f.name]);
      });
      selectFields.forEach((f) => {
        payload[f.name] = Number(data[f.name]);
      });

      const res = await api.post("/predictions", payload);
      toast.success("Prediction generated");
      navigate(`/predictions/${res.data.data._id}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Could not generate a prediction. Make sure your health profile is saved."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center shadow-sm shrink-0">
          <HeartPulse size={20} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">
            Heart disease risk check
          </h1>
          <VitalLine className="w-24 h-4 mt-1" color="var(--color-accent)" />
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Values from a recent checkup or ECG report give the most accurate
        result.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--color-surface)] rounded-2xl shadow-card p-6 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {numberFields.map((f) => (
            <div key={f.name}>
              <label className={labelCls}>{f.label}</label>
              <input
                type="number"
                step={f.step}
                required
                placeholder={f.placeholder}
                {...register(f.name)}
                className={inputCls}
              />
            </div>
          ))}

          {selectFields.map((f) => (
            <div key={f.name}>
              <label className={labelCls}>{f.label}</label>
              <select required {...register(f.name)} className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[var(--color-accent)] hover:opacity-90 disabled:opacity-60 disabled:hover:translate-y-0 text-white font-medium py-2.5 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
        >
          {submitting ? "Running model…" : "Run prediction"}
        </button>
      </form>
    </div>
  );
}