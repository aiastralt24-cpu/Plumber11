"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart3, ClipboardList, LayoutGrid, MapPinned, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { label: "Overview", icon: LayoutGrid, href: "/admin" },
  { label: "Leads", icon: ClipboardList, href: "/admin/leads" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { label: "Cities", icon: MapPinned, href: "/admin/cities" },
  { label: "Services", icon: ShieldCheck, href: "/admin/services" },
  { label: "Reviews", icon: Star, href: "/admin/reviews" }
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] bg-primary p-6 text-white lg:sticky lg:top-24 lg:h-fit">
          <p className="font-display text-2xl">PlumbRight Admin</p>
          <p className="mt-2 text-sm text-white/70">
            Internal operations console for lead routing, city readiness, service coverage, and proof management.
          </p>
          <div className="mt-8 space-y-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                    isActive ? "bg-white text-primary" : "bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
