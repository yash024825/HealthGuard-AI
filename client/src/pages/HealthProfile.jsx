import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loader from "../components/Loader";
import VitalLine from "../components/VitalLine";

const toCsv = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");
const fromCsv = (str) =>
  (str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export default function HealthProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      age: "",
      gender: "",
      height: "",
      weight: "",
      bloodGroup: "",
      activityLevel: "",
      smoking: false,
      alcoholConsumption: false,
      sleepHours: "",
      dietType: "",
      systolic: "",
      diastolic: "",
      heartRate: "",
      bloodSugar: "",
      oxygenLevel: "",
      conditions: "",
      allergies: "",
      medications: "",
      familyHistory: "",
    },
  });

  useEffect(() => {
    api
      .get("/health")
      .then((res) => {
        const p = res.data.data;
        setExists(true);
        reset({
          age: p.age ?? "",
          gender: p.gender ?? "",
          height: p.height ?? "",
          weight: p.weight ?? "",
          bloodGroup: p.bloodGroup ?? "",
          activityLevel: p.lifestyle?.activityLevel ?? "",
          smoking: p.lifestyle?.smoking ?? false,
          alcoholConsumption: p.lifestyle?.alcoholConsumption ?? false,
          sleepHours: p.lifestyle?.sleepHours ?? "",
          dietType: p.lifestyle?.dietType ?? "",
          systolic: p.vitals?.bloodPressure?.systolic ?? "",
          diastolic: p.vitals?.bloodPressure?.diastolic ?? "",
          heartRate: p.vitals?.heartRate ?? "",
          bloodSugar: p.vitals?.bloodSugar ?? "",
          oxygenLevel: p.vitals?.oxygenLevel ?? "",
          conditions: toCsv(p.medicalHistory?.conditions),
          allergies: toCsv(p.medicalHistory?.allergies),
          medications: toCsv(p.medicalHistory?.medications),
          familyHistory: toCsv(p.medicalHistory?.familyHistory),
        });
      })
      .catch(() => setExists(false))
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);

    const payload = {
      age: data.age ? Number(data.age) : undefined,
      gender: data.gender || undefined,
      height: data.height ? Number(data.height) : undefined,
      weight: data.weight ? Number(data.weight) : undefined,
      bloodGroup: data.bloodGroup || undefined,
      lifestyle: {
        activityLevel: data.activityLevel || undefined,
        smoking: !!data.smoking,
        alcoholConsumption: !!data.alcoholConsumption,
        sleepHours: data.sleepHours ? Number(data.sleepHours) : undefined,
        dietType: data.dietType || undefined,
      },
      vitals: {
        bloodPressure: {
          systolic: data.systolic ? Number(data.systolic) : undefined,
          diastolic: data.diastolic ? Number(data.diastolic) : undefined,
        },
        heartRate: data.heartRate ? Number(data.heartRate) : undefined,
        bloodSugar: data.bloodSugar ? Number(data.bloodSugar) : undefined,
        oxygenLevel: data.oxygenLevel ? Number(data.oxygenLevel) : undefined,
      },
      medicalHistory: {
        conditions: fromCsv(data.conditions),
        allergies: fromCsv(data.allergies),
        medications: fromCsv(data.medications),
        familyHistory: fromCsv(data.familyHistory),
      },
    };

    try {
      if (exists) {
        await api.put("/health", payload);
      } else {
        await api.post("/health", payload);
        setExists(true);
      }
      toast.success("Health profile saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading your profile" />;

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm";
  const labelCls = "block text-sm font-medium text-[var(--color-text)] mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">
          Health profile
        </h1>
        <VitalLine className="w-24 h-5 mt-2" />
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          This information is used to power your risk predictions and
          personalize recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Basic information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Age</label>
              <input type="number" className={inputCls} {...register("age")} />
            </div>
            <div>
              <label className={labelCls}>Gender</label>
              <select className={inputCls} {...register("gender")}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Height (cm)</label>
              <input type="number" className={inputCls} {...register("height")} />
            </div>
            <div>
              <label className={labelCls}>Weight (kg)</label>
              <input type="number" className={inputCls} {...register("weight")} />
            </div>
            <div>
              <label className={labelCls}>Blood group</label>
              <select className={inputCls} {...register("bloodGroup")}>
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Lifestyle</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Activity level</label>
              <select className={inputCls} {...register("activityLevel")}>
                <option value="">Select</option>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Diet type</label>
              <select className={inputCls} {...register("dietType")}>
                <option value="">Select</option>
                <option>Balanced</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>High Protein</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Sleep hours / night</label>
              <input type="number" step="0.5" className={inputCls} {...register("sleepHours")} />
            </div>
            <div className="flex items-center gap-6 pt-7">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("smoking")} className="accent-[var(--color-primary)]" />
                Smokes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("alcoholConsumption")} className="accent-[var(--color-primary)]" />
                Drinks alcohol
              </label>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Current vitals</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Blood pressure — systolic</label>
              <input type="number" className={inputCls} {...register("systolic")} />
            </div>
            <div>
              <label className={labelCls}>Blood pressure — diastolic</label>
              <input type="number" className={inputCls} {...register("diastolic")} />
            </div>
            <div>
              <label className={labelCls}>Heart rate (bpm)</label>
              <input type="number" className={inputCls} {...register("heartRate")} />
            </div>
            <div>
              <label className={labelCls}>Blood sugar (mg/dL)</label>
              <input type="number" className={inputCls} {...register("bloodSugar")} />
            </div>
            <div>
              <label className={labelCls}>Oxygen level (%)</label>
              <input type="number" className={inputCls} {...register("oxygenLevel")} />
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Medical history</h2>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            Separate multiple entries with commas.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Existing conditions</label>
              <input className={inputCls} {...register("conditions")} placeholder="e.g. Hypertension" />
            </div>
            <div>
              <label className={labelCls}>Allergies</label>
              <input className={inputCls} {...register("allergies")} placeholder="e.g. Penicillin" />
            </div>
            <div>
              <label className={labelCls}>Current medications</label>
              <input className={inputCls} {...register("medications")} placeholder="e.g. Metformin" />
            </div>
            <div>
              <label className={labelCls}>Family history</label>
              <input className={inputCls} {...register("familyHistory")} placeholder="e.g. Diabetes" />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          {saving ? "Saving…" : exists ? "Update profile" : "Save profile"}
        </button>
      </form>
    </div>
  );
}
