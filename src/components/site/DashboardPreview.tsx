import { motion } from "framer-motion";
import { TrendingUp, Activity, Sparkles } from "lucide-react";

export function DashboardPreview() {
  const bars = [42, 58, 36, 72, 54, 88, 64, 92, 70, 84, 60, 96];
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-[oklch(0.62_0.17_145)]/30 via-transparent to-[oklch(0.72_0.19_135)]/30 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ transformPerspective: 1200 }}
        className="relative glass-strong border-gradient rounded-2xl shadow-card overflow-hidden"
      >
        {/* top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-black/[0.08]" />
            <div className="size-2.5 rounded-full bg-black/[0.08]" />
            <div className="size-2.5 rounded-full bg-black/[0.08]" />
          </div>
          <div className="ml-3 text-xs text-muted-foreground">pricesense.ai / dashboard</div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-cyan-glow">
            <span className="size-1.5 rounded-full bg-cyan-glow animate-pulse" /> Live
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 p-5">
          {/* Left: metrics + chart */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Revenue Lift", v: "+18.4%", i: TrendingUp },
                { l: "AI Confidence", v: "94%", i: Sparkles },
                { l: "Tracked Items", v: "1,284", i: Activity },
              ].map((m, idx) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="glass rounded-xl p-3"
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] uppercase tracking-wide">{m.l}</span>
                    <m.i className="size-3.5" />
                  </div>
                  <div className="mt-1 text-xl font-semibold text-gradient">{m.v}</div>
                </motion.div>
              ))}
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Predicted Revenue</div>
                  <div className="text-lg font-semibold">₹ 4,82,400</div>
                </div>
                <div className="text-xs text-cyan-glow">next 30 days</div>
              </div>
              <div className="mt-4 flex items-end gap-1.5 h-28">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.04, duration: 0.6, ease: "easeOut" }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] relative"
                  >
                    <div className="absolute inset-0 rounded-t-md blur-sm bg-[oklch(0.62_0.17_145)]/40 -z-10" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI insights */}
          <div className="space-y-3">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-violet-glow">
                <Sparkles className="size-3.5" /> AI Recommendation
              </div>
              <p className="mt-2 text-sm leading-relaxed">
                Increase <b>Paneer Tikka</b> price by ₹20. Competitors avg ₹260 vs your ₹240.
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence</span>
                <span className="text-cyan-glow">94%</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-black/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-full bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.82_0.17_110)]"
                />
              </div>
            </div>

            {[
              { n: "Cafe Aroma", d: "0.4 km", c: "+8%" },
              { n: "Spice Garden", d: "0.8 km", c: "+3%" },
              { n: "Urban Tiffin", d: "1.2 km", c: "-5%" },
            ].map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="glass rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium">{c.n}</div>
                  <div className="text-[11px] text-muted-foreground">{c.d} away</div>
                </div>
                <span className={`text-xs ${c.c.startsWith("+") ? "text-cyan-glow" : "text-destructive"}`}>
                  {c.c}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
