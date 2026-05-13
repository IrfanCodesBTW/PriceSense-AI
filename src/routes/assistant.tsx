import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Send, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  component: Assistant,
});

type Msg = { who: "user" | "ai"; t: string };

const seed: Msg[] = [
  { who: "ai", t: "Hi 👋 I'm your PriceSense AI on WhatsApp. Ask me anything — pricing, competitors, alerts, health score, threats, or revenue forecasts." },
];

const suggestions = [
  "How are my prices?",
  "What's my business health?",
  "Who's my biggest threat?",
  "Any opportunities today?",
  "Forecast my Friday revenue",
];

function reply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("how are my price") || (s.includes("price") && s.includes("how")))
    return "📊 Quick scan:\n• 3 items underpriced (Biryani, Dosa, Paneer Tikka)\n• 1 item overpriced (Pizza)\n• Potential monthly gain: ₹18,200\n\nWant me to apply the AI recommendations?";
  if (s.includes("health") || s.includes("score"))
    return "❤️ Business Health: 74/100 (+6 this week)\n\nStrengths:\n• Strong biryani pricing\n• High dessert margins\n\nWeaknesses:\n• 3 items underpriced\n• Low premium item mix\n• High competition <1km";
  if (s.includes("threat") || s.includes("biggest"))
    return "🛡 Top threat: Cafe Aroma — 82/100\nFactors: ↑ ratings, aggressive combos, 0.4km away, 71% menu overlap.\n\nRunner-ups: Spice Garden (71), Urban Tiffin (58).";
  if (s.includes("alert") || s.includes("opportunit") || s.includes("today"))
    return "🔔 Today's smart alerts:\n⚠ 3 nearby restaurants raised biryani prices.\n🔥 Desserts demand +28% — pricing opportunity.\n📉 Beverages 22% below market avg.";
  if (s.includes("biryani"))
    return "Across 6 nearby kitchens, average Veg Biryani is ₹210 vs your ₹180. Elasticity in your zone is low (–0.3) — a ₹20 increase loses <4% volume but adds ~₹24k/mo. Confidence: 89%.";
  if (s.includes("competitor"))
    return "Top 3 in 3km radius:\n1) Cafe Aroma — ₹280 avg, +12% promos\n2) Spice Garden — ₹240 avg, lunch combos\n3) Urban Tiffin — ₹195 avg, office lunch slot";
  if (s.includes("friday") || s.includes("forecast") || s.includes("revenue"))
    return "📈 Friday forecast: ₹68,400 (+22% vs last Fri).\nSpike window 7–10pm.\nRecommendation: enable dynamic pricing, raise top 5 items by 6–8%, projected lift ₹4.8k.";
  if (s.includes("tomorrow") || s.includes("change") || s.includes("move"))
    return "3 high-impact moves for tomorrow:\n1) Raise Paneer Tikka by ₹20 (94% conf, +₹18k/mo)\n2) Bundle Dosa + Coffee at ₹179 to counter Cafe Aroma\n3) Activate dynamic pricing Fri 7–10pm";
  if (s.includes("hi") || s.includes("hello") || s.includes("hey"))
    return "Hey! Want a quick wins report, a competitor scan, your health score, or today's smart alerts?";
  return `Got it — analyzing "${q}". Based on your latest signals, the highest-impact move is to bundle 2 mid-tier items at a ₹20 discount. Estimated lift: ₹6–9k/mo. Want me to draft it?`;
}

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { who: "user", t: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { who: "ai", t: reply(q) }]);
      setThinking(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div className="relative min-h-screen pb-24">
      <Navbar />
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="relative pt-32 px-6 mx-auto max-w-4xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs">
            <Sparkles className="size-3 text-violet-glow" /> WhatsApp · AI Assistant
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
            Your AI business co-pilot.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ask anything in plain language. Delivered every morning to your WhatsApp.
          </p>
        </div>

        <div className="mt-10 glass-strong border-gradient rounded-3xl p-6 shadow-card">
          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.who === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.who === "user"
                        ? "bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] text-primary-foreground"
                        : "glass"
                    }`}
                  >
                    {m.t}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass rounded-2xl px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="size-3 animate-spin" /> Thinking…
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs glass rounded-full px-3 py-1.5 hover:bg-black/[0.04]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="mt-6 glass rounded-full p-1.5 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the assistant…"
              className="bg-transparent outline-none text-sm flex-1 px-4"
            />
            <button
              type="submit"
              disabled={thinking || !input.trim()}
              className="size-10 rounded-full grid place-items-center bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] disabled:opacity-50"
            >
              <Send className="size-4 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
