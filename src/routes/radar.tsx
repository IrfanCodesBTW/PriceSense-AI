import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Radar } from "@/components/site/Radar";
import { Activity, MapPin, Navigation } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/radar")({
  component: RadarPage,
});

const events = [
  { t: "2 min ago", b: "Cafe Aroma", e: "Dropped Cold Coffee by ₹15", up: false },
  { t: "12 min ago", b: "Spice Garden", e: "Launched new Thali combo at ₹249", up: true },
  { t: "38 min ago", b: "Urban Tiffin", e: "Increased Paneer Tikka by ₹20", up: true },
  { t: "1 hr ago", b: "Biryani Bay", e: "Stocked-out: Chicken Dum", up: false },
  { t: "2 hr ago", b: "Pizza Point", e: "Weekend bundle activated", up: true },
];

// Mock competitor markers positioned over the map (% of container)
const competitors = [
  { name: "Cafe Aroma", x: 28, y: 32, delta: "+8%", up: true },
  { name: "Spice Garden", x: 64, y: 24, delta: "+3%", up: true },
  { name: "Urban Tiffin", x: 72, y: 62, delta: "-5%", up: false },
  { name: "Pizza Point", x: 22, y: 70, delta: "+2%", up: true },
  { name: "Biryani Bay", x: 80, y: 46, delta: "-12%", up: false },
];

function RadarPage() {
  const [view, setView] = useState<"map" | "radar">("map");

  // Indiranagar, Bengaluru — Google Maps embed (no API key required)
  const mapSrc =
    "https://www.google.com/maps?q=Indiranagar,Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="relative min-h-screen pb-24">
      <Navbar />
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="relative pt-32 px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-primary">Live intelligence</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
              Competitor Radar
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Scanning a 5km radius around Indiranagar · 143 competitors mapped
            </p>
          </div>
          <div className="glass rounded-full p-1 flex text-xs">
            {(["map", "radar"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-full capitalize transition-all ${
                  view === v
                    ? "bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v} view
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* Map / Radar */}
          <div className="lg:col-span-2">
            {view === "map" ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative glass-strong border-gradient rounded-3xl overflow-hidden shadow-card"
              >
                {/* Map */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  <iframe
                    title="Competitor map"
                    src={mapSrc}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* warm overlay to fit brand */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[oklch(0.62_0.17_145)]/10 via-transparent to-[oklch(0.82_0.17_110)]/10 mix-blend-multiply" />

                  {/* Scan radius overlay */}
                  <div className="absolute inset-0 pointer-events-none grid place-items-center">
                    <div className="relative">
                      <div className="size-56 sm:size-72 rounded-full border-2 border-[oklch(0.62_0.17_145)]/40 bg-[oklch(0.62_0.17_145)]/5" />
                      <div className="absolute inset-0 rounded-full pulse-ring border-2 border-[oklch(0.62_0.17_145)]/40" />
                    </div>
                  </div>

                  {/* You marker (center) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative">
                      <div className="size-4 rounded-full bg-white border-2 border-[oklch(0.62_0.17_145)] shadow-[0_0_0_4px_oklch(0.62_0.17_145/0.25)]" />
                      <div className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap glass-strong rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                        You · Aroma Kitchen
                      </div>
                    </div>
                  </div>

                  {/* Competitor markers */}
                  {competitors.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 240 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    >
                      <span
                        className={`absolute inset-0 rounded-full pulse-ring ${
                          c.up ? "bg-[oklch(0.62_0.17_145)]/40" : "bg-foreground/30"
                        }`}
                      />
                      <div
                        className={`relative size-7 rounded-full grid place-items-center text-white shadow-lg ${
                          c.up
                            ? "bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)]"
                            : "bg-foreground"
                        }`}
                      >
                        <MapPin className="size-3.5" fill="currentColor" />
                      </div>
                      <div className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap glass-strong rounded-lg px-2.5 py-1 text-[11px] shadow-card">
                        <div className="font-medium">{c.name}</div>
                        <div
                          className={`${
                            c.up ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {c.delta} vs you
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Bottom legend */}
                  <div className="absolute left-3 bottom-3 glass-strong rounded-full px-3 py-1.5 text-[11px] flex items-center gap-3 shadow-card">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)]" />
                      Active competitor
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-foreground" />
                      Lower-priced
                    </span>
                  </div>
                  <div className="absolute right-3 bottom-3 glass-strong rounded-full px-3 py-1.5 text-[11px] flex items-center gap-1.5 shadow-card">
                    <Navigation className="size-3 text-primary" />
                    Indiranagar, Bengaluru
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="radar"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-strong border-gradient rounded-3xl p-8 flex justify-center shadow-card"
              >
                <Radar size={460} />
              </motion.div>
            )}
          </div>

          {/* Live feed */}
          <div className="glass-strong border-gradient rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Live signal feed</h2>
              <span className="flex items-center gap-1.5 text-xs text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" /> streaming
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {events.map((e, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-3 flex items-start gap-3"
                >
                  <div
                    className={`mt-0.5 size-8 rounded-lg grid place-items-center ${
                      e.up ? "bg-[oklch(0.62_0.17_145)]/15" : "bg-foreground/10"
                    }`}
                  >
                    <Activity
                      className={`size-4 ${e.up ? "text-primary" : "text-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{e.b}</div>
                    <div className="text-xs text-muted-foreground">{e.e}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {e.t}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
