import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/onboarding", label: "Get started" },
  { to: "/", label: "Product" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/radar", label: "Radar" },
  { to: "/assistant", label: "Assistant" },
  { to: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setUser(localStorage.getItem("ps_user"));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("ps_auth", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ps_auth", sync);
    };
  }, [path]);

  const logout = () => {
    localStorage.removeItem("ps_user");
    window.dispatchEvent(new Event("ps_auth"));
    navigate({ to: "/login" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="glass-strong border-gradient flex items-center gap-1 rounded-full px-2 py-2 shadow-card w-full max-w-4xl">
        <Link to="/" className="flex items-center gap-2 px-3 py-1.5">
          <div className="relative">
            <div className="size-7 rounded-lg bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] grid place-items-center">
              <Activity className="size-4 text-white" />
            </div>
            <div className="absolute inset-0 rounded-lg blur-md bg-[oklch(0.62_0.17_145)]/50 -z-10" />
          </div>
          <span className="font-semibold tracking-tight">PriceSense</span>
        </Link>
        <div className="hidden md:flex items-center gap-1 mx-auto">
          {links.map((l) => {
            const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-3 py-1.5 text-sm rounded-full transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-black/[0.04] border border-black/8"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </div>
        {user ? (
          <div className="ml-auto md:ml-0 flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm">
              <span className="size-6 rounded-full bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] grid place-items-center text-white text-xs font-semibold">
                {user[0]?.toUpperCase()}
              </span>
              <span className="max-w-[120px] truncate">{user}</span>
            </div>
            <button
              onClick={logout}
              className="rounded-full size-9 grid place-items-center glass hover:bg-black/[0.04]"
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="ml-auto md:ml-0 relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-primary-foreground bg-gradient-to-r from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] shadow-[0_0_20px_-2px_oklch(0.72_0.20_250/0.6)] hover:shadow-[0_0_28px_0_oklch(0.72_0.20_250/0.8)] transition-shadow"
          >
            <span className="relative z-10">Sign in</span>
            <span className="absolute inset-0 btn-shine opacity-60" />
          </Link>
        )}
      </nav>
    </motion.header>
  );
}
