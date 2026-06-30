import { useEffect, useState } from "react";
import { X, FileDown, CheckCircle2 } from "lucide-react";

const KEY = "medflow_exit_intent_seen";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    let armed = false;
    const arm = () => {
      armed = true;
    };
    const timer = window.setTimeout(arm, 8000);
    const onLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(KEY, "1");
        document.removeEventListener("mouseout", onLeave);
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-ink/60 backdrop-blur-md" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-7 shadow-glow animate-scale-in">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-soft text-emerald">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-ink">Check your inbox</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The ROI report is on its way. Meanwhile, peek at our customer stories.
            </p>
          </div>
        ) : (
          <>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
              <FileDown size={20} />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-ink">Before you go — grab the ROI report</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A 14-page PDF with benchmarks across 80–1,200 bed hospitals: revenue uplift, staff hours saved, claim rejection trends.
            </p>
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="you@hospital.com"
                className="w-full rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm text-slate-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
              >
                Email me the ROI report (PDF)
              </button>
              <p className="text-center text-[11px] text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
