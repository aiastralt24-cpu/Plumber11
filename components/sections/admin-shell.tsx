import type { ReactNode } from "react";
import { BarChart3, ClipboardList, MapPinned, ShieldCheck, Star, Users } from "lucide-react";

const items = [
  { label: "Lead Management", icon: ClipboardList },
  { label: "City Manager", icon: MapPinned },
  { label: "Service Manager", icon: ShieldCheck },
  { label: "Review Manager", icon: Star },
  { label: "Plumber Roster", icon: Users },
  { label: "Analytics", icon: BarChart3 }
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] bg-primary p-6 text-white">
          <p className="font-display text-2xl">PlumbRight Admin</p>
          <p className="mt-2 text-sm text-white/70">
            Internal operations dashboard for launch routing, content, quality, and SLA visibility.
          </p>
          <div className="mt-8 space-y-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
