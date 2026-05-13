import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bell,
  TrendingUp,
  Activity,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Radar as RadarIcon,
  MessageCircle,
  Heart,
  ShieldAlert,
  AlertTriangle,
  Flame,
  TrendingDown,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const items = [
  { name: "Paneer Tikka", you: 240, market: 268, rec: 260, conf: 94, lift: "+₹18k" },
  { name: "Veg Biryani", you: 180, market: 210, rec: 200, conf: 89, lift: "+₹24k" },
  { name: "Margherita Pizza", you: 320, market: 305, rec: 310, conf: 76, lift: "+₹6k" },
  { name: "Masala Dosa", you: 120, market: 140, rec: 135, conf: 91, lift: "+₹11k" },
  { name: "Cold Coffee", you: 160, market: 175, rec: 170, conf: 82, lift: "+₹4k" },
];

const healthScore = 74;
const healthStrengths = ["Strong biryani pricing", "High dessert margins", "Loyal lunch crowd"];
const healthWeaknesses = ["3 items underpriced", "Low premium item mix", "High competition <1km"];

const threats = [
  { name: "Cafe Aroma", score: 82, dist: "0.4 km", reason: "↑ ratings, aggressive combos", trend: "up" },
  { name: "Spice Garden", score: 71, dist: "0.9 km", reason: "Menu overlap 64%", trend: "up" },
  { name: "Urban Tiffin", score: 58, dist: "1.2 km", reason: "Capturing office lunch", trend: "flat" },
  { name: "Pizza Point", score: 41, dist: "1.6 km", reason: "Low overlap", trend: "down" },
];

const alerts = [
  { icon: AlertTriangle, tone: "warn", t: "3 nearby restaurants increased biryani prices this week.", time: "2h ago" },
  { icon: Flame, tone: "hot", t: "Opportunity detected in Desserts category — demand +28%.", time: "4h ago" },
  { icon: TrendingDown, tone: "info", t: "Your beverage pricing is 22% below market average.", time: "Today" },
  { icon: ShieldAlert, tone: "warn", t: "Cafe Aroma launched a ₹299 combo within your radar.", time: "Yesterday" },
];

function ringColor(v: number) {
  if (v >= 75) return "oklch(0.62 0.17 145)";
  if (v >= 50) return "oklch(0.82 0.17 110)";
  return "oklch(0.65 0.22 25)";
}

function ScoreRing({ value, label, sub }: { value: number; label: string; sub?: string }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-28">
        <svg viewBox="0 0 110 110" className="size-28 -rotate-90">
          <circle cx="55" cy="55" r={r} stroke="oklch(0 0 0 / 0.06)" strokeWidth="8" fill="none" />
          <motion.circle
            cx="55"
            cy="55"
            r={r}
            stroke={ringColor(value)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: off }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium">{label}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="relative min-h-screen pb-24">
      <Navbar />
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative pt-32 px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-cyan-glow">Command center</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
              Good morning, Aroma Kitchen.
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              5 new pricing signals · 2 high-confidence opportunities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass rounded-full px-3 py-2 flex items-center gap-2 text-sm w-72">
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Ask the AI: 'Why is my biryani underpricing?'"
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
              />
            </div>
            <button className="glass rounded-full size-10 grid place-items-center hover:bg-black/[0.04]">
              <Bell className="size-4" />
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { l: "Predicted Revenue", v: "₹4,82,400", d: "+18.4%", up: true, i: TrendingUp },
            { l: "Active Signals", v: "27", d: "+5 today", up: true, i: Activity },
            { l: "Competitors Tracked", v: "143", d: "+12 this week", up: true, i: RadarIcon },
            { l: "AI Confidence", v: "94%", d: "stable", up: true, i: Sparkles },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass border-gradient rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs uppercase tracking-wide">{s.l}</span>
                <s.i className="size-4" />
              </div>
              <div className="mt-2 text-2xl font-semibold text-gradient">{s.v}</div>
              <div className={`mt-1 text-xs flex items-center gap-1 ${s.up ? "text-cyan-glow" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />} {s.d}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          {/* Pricing intelligence table */}
          <div className="lg:col-span-2 glass border-gradient rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Pricing Intelligence</h2>
                <p className="text-xs text-muted-foreground">AI-recommended moves across your menu</p>
              </div>
              <Link to="/radar" className="text-xs text-cyan-glow hover:underline">
                Open radar →
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-black/5">
              <table className="w-full text-sm">
                <thead className="bg-black/[0.02] text-muted-foreground">
                  <tr>
                    {["Item", "You", "Market", "AI Rec", "Conf.", "Est. Lift"].map((h) => (
                      <th key={h} className="text-left font-normal text-xs uppercase tracking-wide px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((r, i) => (
                    <motion.tr
                      key={r.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="border-t border-black/5 hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3">₹{r.you}</td>
                      <td className="px-4 py-3 text-muted-foreground">₹{r.market}</td>
                      <td className="px-4 py-3 text-cyan-glow">₹{r.rec}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-16 rounded-full bg-black/[0.04] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.82_0.17_110)]"
                              style={{ width: `${r.conf}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{r.conf}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-cyan-glow">{r.lift}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI assistant */}
          <div className="glass-strong border-gradient rounded-2xl p-5 shadow-card flex flex-col">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] grid place-items-center">
                <Sparkles className="size-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-medium">AI Assistant</h2>
                <p className="text-[11px] text-muted-foreground">Always-on intelligence</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 flex-1">
              {[
                "Your biryani is the #1 underpriced item this week. A ₹20 increase predicts ₹24k extra/mo.",
                "Cafe Aroma launched a new combo at ₹299. Consider matching with bundled dosa + coffee.",
                "Friday demand spike incoming — auto-tune dynamic prices for evening?",
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-3 text-sm leading-relaxed"
                >
                  {m}
                </motion.div>
              ))}
            </div>
            <Link
              to="/assistant"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground"
            >
              <MessageCircle className="size-4" /> Open Assistant
            </Link>
          </div>
        </div>

        {/* Health + Threats + Alerts */}
        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          {/* Business Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong border-gradient rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.82_0.17_110)] grid place-items-center">
                <Heart className="size-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-medium">Business Health</h2>
                <p className="text-[11px] text-muted-foreground">One number to care about</p>
              </div>
            </div>
            <div className="mt-5">
              <ScoreRing value={healthScore} label="Healthy & growing" sub="Up 6 pts this week" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="uppercase tracking-wide text-muted-foreground mb-1">Strengths</div>
                <ul className="space-y-1">
                  {healthStrengths.map((s) => (
                    <li key={s} className="flex gap-2"><span className="text-cyan-glow">+</span>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="uppercase tracking-wide text-muted-foreground mb-1">Weaknesses</div>
                <ul className="space-y-1">
                  {healthWeaknesses.map((s) => (
                    <li key={s} className="flex gap-2"><span className="text-destructive">–</span>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Competitor Threat Score */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass border-gradient rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.22_25)] to-[oklch(0.82_0.17_110)] grid place-items-center">
                  <ShieldAlert className="size-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-medium">Competitor Threat Score</h2>
                  <p className="text-[11px] text-muted-foreground">Ratings · pricing · proximity · menu overlap</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {threats.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="glass rounded-xl p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-[11px] text-muted-foreground">{t.dist} · {t.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold" style={{ color: ringColor(t.score) }}>{t.score}</div>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">/100</div>
                    </div>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-black/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.score}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.05 }}
                      className="h-full"
                      style={{ background: ringColor(t.score) }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Smart Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass border-gradient rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-[oklch(0.72_0.19_135)] to-[oklch(0.62_0.17_145)] grid place-items-center">
                <Bell className="size-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-medium">Smart Alerts</h2>
                <p className="text-[11px] text-muted-foreground">AI-curated, real-time</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {alerts.map((a, i) => {
                const Icon = a.icon;
                const tone =
                  a.tone === "warn"
                    ? "text-destructive bg-destructive/10"
                    : a.tone === "hot"
                      ? "text-[oklch(0.62_0.17_145)] bg-[oklch(0.62_0.17_145)]/10"
                      : "text-cyan-glow bg-cyan-glow/10";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex gap-3 glass rounded-xl p-3"
                  >
                    <div className={`size-8 shrink-0 rounded-lg grid place-items-center ${tone}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-snug">{a.t}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{a.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
