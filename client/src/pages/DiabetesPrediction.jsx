import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Activity } from "lucide-react";
import api from "../api/axios";
import VitalLine from "../components/VitalLine";

const fields = [
  { name: "pregnancies", label: "Pregnancies", step: "1", placeholder: "0" },
  { name: "glucose", label: "Glucose (mg/dL)", step: "1", placeholder: "120" },
  { name: "blood_pressure", label: "Blood pressure (mm Hg)", step: "1", placeholder: "70" },
  { name: "skin_thickness", label: "Skin thickness (mm)", step: "1", placeholder: "20" },
  { name: "insulin", label: "Insulin (mu U/ml)", step: "1", placeholder: "80" },
  { name: "bmi", label: "BMI", step: "0.1", placeholder: "24.5" },
  { name: "diabetes_pedigree_function", label: "Diabetes pedigree function", step: "0.001", placeholder: "0.45" },
  { name: "age", label: "Age", step: "1", placeholder: "35" },
];

const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors text-sm";
const labelCls = "block text-sm font-medium text-[var(--color-text)] mb-1.5";

export default function DiabetesPrediction() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = { predictionType: "diabetes" };
      fields.forEach((f) => {
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
        <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center shadow-sm shrink-0">
          <Activity size={20} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">
            Diabetes risk check
          </h1>
          <VitalLine className="w-24 h-4 mt-1" />
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Enter your latest lab values. These aren't saved to your health
        profile automatically — they're used only for this prediction.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--color-surface)] rounded-2xl shadow-card p-6 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
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
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 disabled:hover:translate-y-0 text-white font-medium py-2.5 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
        >
          {submitting ? "Running model…" : "Run prediction"}
        </button>
      </form>
    </div>
  );
}