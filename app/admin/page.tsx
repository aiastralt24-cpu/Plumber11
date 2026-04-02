import Link from "next/link";
import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getAdminOverviewStats } from "@/lib/domain/admin";

export default async function AdminOverviewPage() {
  const { session, localPreviewMode } = await getAdminAccess();
  const stats = await getAdminOverviewStats();

  return (
    <AdminShell>
      <div className="space-y-8">
        {!session && localPreviewMode ? (
          <section className="rounded-[28px] border border-accent/20 bg-[#fff4ec] p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Local preview mode
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-primary">
              Admin is open locally so you can review the full internal product.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              Production should still use sign-in, but local file-database mode keeps the admin
              open so you can test the full workflow quickly.
            </p>
          </section>
        ) : null}

        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Overview</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">
            This is now an admin product, not a single dashboard page.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            Use the left navigation to move between leads, analytics, cities, services, and review
            proof. Each area now has its own working surface and data model.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Total leads", value: stats.leadCount, href: "/admin/leads" },
              { label: "Urgent leads", value: stats.urgentLeadCount, href: "/admin/leads" },
              { label: "Cities", value: stats.cityCount, href: "/admin/cities" },
              { label: "Launch-ready cities", value: stats.launchReadyCityCount, href: "/admin/cities" },
              { label: "Services", value: stats.serviceCount, href: "/admin/services" },
              { label: "Featured reviews", value: stats.featuredReviewCount, href: "/admin/reviews" }
            ].map((stat) => (
              <Link key={stat.label} href={stat.href} className="rounded-[24px] bg-bg p-5 transition hover:-translate-y-0.5">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-3 text-4xl font-semibold text-primary">{stat.value}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
