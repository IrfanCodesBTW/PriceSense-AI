import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-gradient-to-br from-[oklch(0.62_0.17_145)] to-[oklch(0.72_0.19_135)] grid place-items-center">
              <Activity className="size-4 text-white" />
            </div>
            <span className="font-semibold">PriceSense</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            AI pricing intelligence for restaurants, kitchens & local businesses.
          </p>
        </div>
        {[
          { title: "Product", items: ["Dashboard", "Radar", "Assistant", "Pricing"] },
          { title: "Company", items: ["About", "Customers", "Careers", "Press"] },
          { title: "Resources", items: ["Docs", "API", "Status", "Changelog"] },
        ].map((c) => (
          <div key={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => (
                <li key={i}>
                  <Link to="/" className="hover:text-foreground transition-colors">
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex justify-between text-xs text-muted-foreground">
          <span>© 2026 PriceSense Labs</span>
          <span>Made with intelligence.</span>
        </div>
      </div>
    </footer>
  );
}
