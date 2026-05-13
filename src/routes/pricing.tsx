import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
});

const tiers = [
  {
    n: "Starter",
    p: "Free",
    sub: "For single kitchens exploring AI pricing",
    f: ["1 location", "Daily AI digest", "Basic competitor radar", "WhatsApp summary"],
    cta: "Start free",
  },
  {
    n: "Growth",
    p: "₹2,499",
    per: "/month",
    sub: "Most teams pick this",
    f: [
      "5 locations",
      "Hourly intelligence updates",
      "Full WhatsApp AI assistant",
      "Dynamic pricing automation",
      "Revenue forecasts",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    n: "Scale",
    p: "Custom",
    sub: "For multi-brand chains & franchises",
    f: ["Unlimited locations", "API access", "Dedicated AI tuning", "SLA & priority support", "On-prem option"],
    cta: "Talk to sales",
  },
];

function Pricing() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />

      <section className="relative pt-40 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-violet-glow">Pricing</p>
          <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
            Simple plans. Cinematic intelligence.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when the AI proves the lift on your bottom line.
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-7xl grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-8 ${
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
              <div className="mt-2 flex items-baseline gap-1">
                <div className="text-4xl font-semibold">{t.p}</div>
                {t.per && <div className="text-sm text-muted-foreground">{t.per}</div>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.sub}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.f.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="size-4 mt-0.5 text-cyan-glow" /> {x}
                  </li>
                ))}
              </ul>
              <Link
                to="/dashboard"
                className={`mt-8 block text-center rounded-full px-5 py-3 text-sm font-medium ${
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
      </section>

      <Footer />
    </div>
  );
}
