import { motion } from "framer-motion";

export function Radar({ size = 360 }: { size?: number }) {
  const points = [
    { x: 28, y: 18, label: "Cafe Aroma", up: true },
    { x: 72, y: 30, label: "Spice Garden", up: true },
    { x: 60, y: 70, label: "Urban Tiffin", up: false },
    { x: 22, y: 62, label: "Pizza Point", up: true },
    { x: 82, y: 58, label: "Biryani Bay", up: false },
    { x: 50, y: 45, label: "You", you: true },
  ];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full glass-strong border-gradient overflow-hidden">
        {/* rings */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-black/5"
            style={{
              inset: `${(1 - r) * 50}%`,
            }}
          />
        ))}
        {/* cross */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/[0.04]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/[0.04]" />
        {/* sweep */}
        <div className="absolute inset-0 radar-sweep">
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, oklch(0.62 0.17 145 / 0.5) 30deg, transparent 60deg)",
            }}
          />
        </div>

        {/* points */}
        {points.map((p, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="relative">
              <span
                className={`absolute inset-0 rounded-full pulse-ring ${
                  p.you ? "bg-cyan-glow/40" : p.up ? "bg-[oklch(0.62_0.17_145)]/40" : "bg-destructive/40"
                }`}
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                className={`block size-3 rounded-full ${
                  p.you
                    ? "bg-cyan-glow shadow-[0_0_16px_2px_oklch(0.85_0.16_210/0.8)]"
                    : p.up
                      ? "bg-[oklch(0.62_0.17_145)] shadow-[0_0_12px_oklch(0.72_0.20_250/0.8)]"
                      : "bg-destructive shadow-[0_0_12px_oklch(0.65_0.22_25/0.8)]"
                }`}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-muted-foreground">
                {p.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
