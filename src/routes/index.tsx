import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Radar as RadarIcon,
  TrendingUp,
  MessageCircle,
  LineChart,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { Radar } from "@/components/site/Radar";

export const Route = createFileRoute("/")({
  component: Landing,
});

const fade: any = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="absolute inset-0 bg-mesh opacity-90" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-cyan-glow animate-pulse" />
            New · WhatsApp AI assistant for daily pricing intel
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fade}
            className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            <span className="text-gradient">AI-Powered Pricing</span>
            <br />
            <span className="text-gradient-brand">Intelligence</span>
            <span className="text-gradient"> for Local Businesses</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fade}
            className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            PriceSense scans competitors around you in real-time, predicts revenue impact,
            and recommends pricing moves — delivered to WhatsApp every morning.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fade}
            className="mt-9 flex items-center justify-center gap-3"
          >
            <Link
              to="/dashboard"
              className="group relative overflow-hidden rounded-full px-6 py-3 font-medium text-primary-foreground bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] shadow-[0_0_30px_-4px_oklch(0.72_0.20_250/0.7)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch the command center
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="absolute inset-0 btn-shine opacity-70" />
            </Link>
            <Link
              to="/pricing"
              className="rounded-full glass px-6 py-3 font-medium hover:bg-black/[0.04] transition-colors"
            >
              See pricing
            </Link>
          </motion.div>

          {/* Floating dashboard preview */}
          <div className="mt-20">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* LOGOS / TRUSTED BY */}
      <section className="relative py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by 1,200+ kitchens & local brands
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-70">
            {["Aroma", "TiffinCo", "Spice84", "KiranaX", "BiryaniBay", "PizzaPoint"].map((n) => (
              <div key={n} className="text-center text-sm font-medium tracking-wide text-muted-foreground">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-sm text-violet-glow">Intelligence layer</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              An AI operating system for local pricing.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Five intelligence modules that work together to find revenue you didn't know existed.
            </p>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                icon: RadarIcon,
                t: "Competitor Radar",
                d: "Scan a 5km radius continuously. Pulse alerts when nearby prices shift.",
              },
              {
                icon: Sparkles,
                t: "AI Recommendations",
                d: "Confidence-scored pricing moves with predicted revenue uplift.",
              },
              {
                icon: TrendingUp,
                t: "Revenue Forecasts",
                d: "30-day projections trained on your menu, traffic, and local demand.",
              },
              {
                icon: MessageCircle,
                t: "WhatsApp Assistant",
                d: "A daily AI digest. Ask anything in plain language — get answers instantly.",
              },
              {
                icon: LineChart,
                t: "Dynamic Pricing",
                d: "Auto-tune prices by hour, day, weather, and demand spikes.",
              },
              {
                icon: ShieldCheck,
                t: "Market Alerts",
                d: "Instant pings for competitor launches, discounts, and stock-outs.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative glass border-gradient rounded-2xl p-6 shadow-card"
              >
                <div className="size-10 rounded-xl bg-gradient-to-br from-[oklch(0.62_0.17_145)]/30 to-[oklch(0.72_0.19_135)]/30 grid place-items-center border border-black/8">
                  <f.icon className="size-5 text-cyan-glow" />
                </div>
                <h3 className="mt-4 text-lg font-medium">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.17_145)]/0 to-[oklch(0.72_0.19_135)]/0 group-hover:from-[oklch(0.62_0.17_145)]/10 group-hover:to-[oklch(0.72_0.19_135)]/5 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RADAR SHOWCASE */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-cyan-glow">Competitor Radar</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              See every nearby price move, the moment it happens.
            </h2>
            <p className="mt-5 text-muted-foreground">
              A live intelligence map of competing kitchens, kiranas and cafes around you.
              Each pulse is a signal — a price drop, a new launch, a stock-out.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Auto-discovery of new entrants in your zone",
                "Confidence-scored AI commentary on every move",
                "Tap any pulse to drill into menu-level deltas",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-cyan-glow" /> {x}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <Radar size={420} />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-6xl glass-strong border-gradient rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-card">
          {[
            { v: "+22%", l: "Avg revenue uplift" },
            { v: "1.2M", l: "Prices tracked daily" },
            { v: "4.9★", l: "Customer rating" },
            { v: "<3s", l: "Insight delivery" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-semibold text-gradient-brand">{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-medium leading-snug text-gradient"
          >
            "PriceSense told us our biryani was underpriced by ₹40. We changed it on Monday.
            Our weekly revenue jumped 19% — without losing a single order."
          </motion.blockquote>
          <div className="mt-6 text-sm text-muted-foreground">
            Rohan Mehta · Founder, Biryani Bay
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              Pricing built for every kitchen.
            </h2>
            <p className="mt-3 text-muted-foreground">Start free. Scale when the AI proves itself.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "Starter", p: "Free", f: ["1 location", "Daily AI digest", "Basic radar"], cta: "Start free" },
              { n: "Growth", p: "₹2,499/mo", f: ["5 locations", "Hourly intel", "WhatsApp assistant", "Dynamic pricing"], cta: "Start trial", featured: true },
              { n: "Scale", p: "Custom", f: ["Unlimited locations", "API access", "Dedicated AI tuning", "SLA support"], cta: "Talk to sales" },
            ].map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`relative rounded-2xl p-7 ${
                  t.featured
                    ? "glass-strong border-gradient shadow-card glow-primary"
                    : "glass border-gradient"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-white">
                    Most popular
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{t.n}</div>
                <div className="mt-1 text-3xl font-semibold">{t.p}</div>
                <ul className="mt-5 space-y-2 text-sm">
                  {t.f.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <Check className="size-4 mt-0.5 text-cyan-glow" /> {x}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/dashboard"
                  className={`mt-7 block text-center rounded-full px-5 py-2.5 text-sm font-medium ${
                    t.featured
                      ? "bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground"
                      : "glass hover:bg-black/[0.04] transition-colors"
                  }`}
                >
                  {t.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6">
        <div className="relative mx-auto max-w-5xl text-center glass-strong border-gradient rounded-3xl p-14 overflow-hidden shadow-card">
          <div className="absolute inset-0 bg-mesh opacity-60" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              Ship smarter prices tomorrow morning.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Connect your menu in 2 minutes. Wake up to a complete intelligence brief.
            </p>
            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground shadow-[0_0_30px_-4px_oklch(0.72_0.20_250/0.7)]"
            >
              Launch PriceSense <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
