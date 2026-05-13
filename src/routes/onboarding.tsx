import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Store,
  Upload,
  MapPin,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  FileText,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const steps = [
  { id: 0, label: "Business", icon: Store },
  { id: 1, label: "Menu", icon: Upload },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "AI Setup", icon: Sparkles },
];

const cuisines = ["North Indian", "South Indian", "Chinese", "Pizza", "Cafe", "Biryani", "Bakery", "Desserts"];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [biz, setBiz] = useState({ name: "", type: "Cloud Kitchen", cuisine: "North Indian" });
  const [menu, setMenu] = useState<{ name: string; price: string }[]>([
    { name: "Paneer Tikka", price: "240" },
    { name: "Veg Biryani", price: "180" },
  ]);
  const [loc, setLoc] = useState({ address: "", radius: 5 });
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const next = () => {
    if (step === 3) return;
    if (step === 2) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDone(true);
        setStep(3);
      }, 2200);
    } else {
      setStep((s) => s + 1);
    }
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="relative min-h-screen pb-24">
      <Navbar />
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />

      <div className="relative pt-32 px-6 mx-auto max-w-3xl">
        {/* Stepper */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((s, i) => {
            const active = step === s.id;
            const complete = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <motion.div
                  animate={{
                    scale: active ? 1.05 : 1,
                  }}
                  className={`relative size-9 rounded-full grid place-items-center border ${
                    complete
                      ? "border-cyan-glow/60 bg-cyan-glow/10"
                      : active
                        ? "border-black/10 bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)]"
                        : "border-black/8 bg-white/[0.03]"
                  }`}
                >
                  {complete ? <Check className="size-4 text-cyan-glow" /> : <s.icon className="size-4" />}
                  {active && (
                    <span className="absolute inset-0 rounded-full pulse-ring bg-[oklch(0.62_0.17_145)]/30" />
                  )}
                </motion.div>
                <span
                  className={`text-xs hidden sm:block ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-white/5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="mt-10 glass-strong border-gradient rounded-3xl p-8 shadow-card min-h-[440px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="biz"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight text-gradient">
                  Tell us about your business
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll calibrate the AI for your category and zone.
                </p>

                <div className="mt-7 space-y-5">
                  <Field label="Business name">
                    <input
                      value={biz.name}
                      onChange={(e) => setBiz({ ...biz, name: e.target.value })}
                      placeholder="Aroma Kitchen"
                      className="w-full bg-transparent outline-none text-sm py-2.5"
                    />
                  </Field>

                  <Field label="Business type">
                    <div className="flex gap-2 flex-wrap py-1">
                      {["Cloud Kitchen", "Restaurant", "Cafe", "Kirana", "Bakery"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setBiz({ ...biz, type: t })}
                          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                            biz.type === t
                              ? "bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground"
                              : "glass hover:bg-black/[0.04]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Primary cuisine">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
                      {cuisines.map((c) => (
                        <button
                          key={c}
                          onClick={() => setBiz({ ...biz, cuisine: c })}
                          className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                            biz.cuisine === c
                              ? "bg-black/[0.06] border border-cyan-glow/40"
                              : "glass hover:bg-black/[0.04]"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight text-gradient">
                  Upload your menu
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drop a CSV or photo. We've pre-loaded a sample so you can see the magic.
                </p>

                <label className="mt-6 block cursor-pointer">
                  <div className="glass border-gradient rounded-2xl p-8 text-center hover:bg-black/[0.03] transition-colors">
                    <div className="mx-auto size-12 rounded-xl grid place-items-center bg-gradient-to-br from-[oklch(0.62_0.17_145)]/20 to-[oklch(0.72_0.19_135)]/20">
                      <FileText className="size-5 text-cyan-glow" />
                    </div>
                    <div className="mt-3 text-sm font-medium">Drop menu file or click to upload</div>
                    <div className="text-xs text-muted-foreground mt-1">CSV, PDF, or JPG · max 10MB</div>
                  </div>
                  <input type="file" className="hidden" />
                </label>

                <div className="mt-5">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    Detected items
                  </div>
                  <div className="space-y-2">
                    {menu.map((m, i) => (
                      <div key={i} className="glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <div className="flex-1 text-sm">{m.name}</div>
                        <span className="text-xs text-muted-foreground">₹</span>
                        <input
                          value={m.price}
                          onChange={(e) => {
                            const c = [...menu];
                            c[i] = { ...c[i], price: e.target.value };
                            setMenu(c);
                          }}
                          className="w-16 bg-transparent outline-none text-sm text-right"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => setMenu([...menu, { name: "New item", price: "0" }])}
                      className="w-full glass rounded-xl py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/[0.03] transition-colors"
                    >
                      + Add item
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="loc"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-2xl font-semibold tracking-tight text-gradient">
                  Set your scan zone
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll continuously scan competitors within this radius.
                </p>

                <Field label="Business address" className="mt-7">
                  <input
                    value={loc.address}
                    onChange={(e) => setLoc({ ...loc, address: e.target.value })}
                    placeholder="100 Feet Rd, Indiranagar, Bengaluru"
                    className="w-full bg-transparent outline-none text-sm py-2.5"
                  />
                </Field>

                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Scan radius</span>
                    <span className="text-sm text-cyan-glow">{loc.radius} km</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={loc.radius}
                    onChange={(e) => setLoc({ ...loc, radius: Number(e.target.value) })}
                    className="w-full accent-[oklch(0.62_0.17_145)]"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>1 km</span>
                    <span>20 km</span>
                  </div>
                </div>

                {processing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 glass rounded-xl p-4 flex items-center gap-3"
                  >
                    <Loader2 className="size-4 animate-spin text-cyan-glow" />
                    <div className="text-sm">
                      Calibrating AI · scanning <b>{loc.radius}km</b> radius · indexing competitors…
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 3 && done && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 14 }}
                  className="mx-auto size-16 rounded-2xl grid place-items-center bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] glow-primary"
                >
                  <Sparkles className="size-7 text-white" />
                </motion.div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gradient">
                  Your AI is ready.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We mapped <b>143 competitors</b> in your zone and detected{" "}
                  <b>5 high-impact opportunities</b>. Let's go.
                </p>
                <div className="mt-7 grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {[
                    { v: "143", l: "Competitors" },
                    { v: "5", l: "Opportunities" },
                    { v: "₹82k", l: "Est. lift/mo" },
                  ].map((s) => (
                    <div key={s.l} className="glass rounded-xl p-3">
                      <div className="text-lg font-semibold text-gradient-brand">{s.v}</div>
                      <div className="text-[10px] text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0 || processing}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          {step < 3 ? (
            <button
              onClick={next}
              disabled={processing}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground shadow-[0_0_22px_-4px_oklch(0.72_0.20_250/0.7)] disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center gap-2">
                {processing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Calibrating…
                  </>
                ) : step === 2 ? (
                  <>
                    Activate AI <Sparkles className="size-4" />
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="size-4" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 btn-shine opacity-60" />
            </button>
          ) : (
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground shadow-[0_0_22px_-4px_oklch(0.72_0.20_250/0.7)]"
            >
              Open dashboard <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="mt-1.5 glass rounded-xl px-4">{children}</div>
    </label>
  );
}
