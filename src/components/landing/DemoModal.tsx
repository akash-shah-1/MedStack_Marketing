import { useEffect, useState } from "react";
import { X, CheckCircle2, Calendar, FormInput } from "lucide-react";

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [mode, setMode] = useState<"calendar" | "form">("calendar");

  useEffect(() => {
    if (!open) {
      setSent(false);
      setMode("calendar");
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-ink/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 animate-scale-in shadow-glow max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-soft text-emerald">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-semibold">Request received</h3>
            <p className="mt-2 text-muted-foreground">Our clinical solutions team will reach out within 1 business day.</p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-medium text-teal-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
                30-min live walkthrough
              </span>
              <h3 className="mt-3 text-2xl font-bold text-slate-ink">Schedule a live demo</h3>
              <p className="mt-1 text-sm text-muted-foreground">See MedFlow AI orchestrate a full patient lifecycle in real time.</p>
            </div>

            <div className="mb-5 inline-flex rounded-full bg-muted/60 p-1 text-xs font-semibold">
              <button
                onClick={() => setMode("calendar")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                  mode === "calendar" ? "bg-white text-slate-ink shadow" : "text-muted-foreground"
                }`}
              >
                <Calendar size={13} /> Pick a time
              </button>
              <button
                onClick={() => setMode("form")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                  mode === "form" ? "bg-white text-slate-ink shadow" : "text-muted-foreground"
                }`}
              >
                <FormInput size={13} /> Request callback
              </button>
            </div>

            {mode === "calendar" ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <iframe
                  title="Book a demo"
                  src="https://cal.com/demo?embed=true&theme=light"
                  className="h-[520px] w-full"
                  loading="lazy"
                />
                <div className="border-t border-border bg-white/70 px-4 py-2 text-center text-[11px] text-muted-foreground">
                  Times shown in your local timezone. HIPAA-grade handling.
                </div>
              </div>
            ) : (
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="Full name" name="name" placeholder="Dr. Anjali Rao" />
                <Field label="Hospital email" name="email" type="email" placeholder="anjali@apollocare.com" />
                <Field label="Hospital name" name="hospital" placeholder="Apollo Care Network" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Bed count" name="beds" type="number" placeholder="120" />
                  <Field label="Role" name="role" placeholder="CMO / IT Director" />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
                >
                  Request my demo
                </button>
                <p className="text-center text-[11px] text-muted-foreground">HIPAA-grade handling. We never share your data.</p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-ink/80">{label}</span>
      <input
        {...props}
        required
        className="w-full rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm text-slate-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
      />
    </label>
  );
}
