import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Activity, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!email.includes("@") || password.length < 4) {
      setErr("Enter a valid email and a password (4+ chars).");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const name = email.split("@")[0];
      localStorage.setItem("ps_user", name);
      window.dispatchEvent(new Event("ps_auth"));
      setLoading(false);
      navigate({ to: "/dashboard" });
    }, 700);
  };

  return (
    <div className="relative min-h-screen pb-24">
      <Navbar />
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
      <div className="relative pt-32 px-6 mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong border-gradient rounded-3xl p-8 shadow-card"
        >
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] grid place-items-center">
              <Activity className="size-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">PriceSense</span>
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to your pricing intelligence dashboard."
              : "Start your 14-day free trial. No card required."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <label className="block">
              <span className="text-xs text-muted-foreground">Email</span>
              <div className="mt-1 glass rounded-xl px-3 py-2.5 flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@restaurant.com"
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Password</span>
              <div className="mt-1 glass rounded-xl px-3 py-2.5 flex items-center gap-2">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </label>
            {err && <p className="text-xs text-destructive">{err}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-primary-foreground bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] disabled:opacity-60"
            >
              {loading ? "Signing in…" : mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="hover:text-foreground"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
            <Link to="/onboarding" className="inline-flex items-center gap-1 hover:text-foreground">
              <Sparkles className="size-3" /> Get started
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
