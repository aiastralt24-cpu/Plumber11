import { redirect } from "next/navigation";
import { AdminShell } from "@/components/sections/admin-shell";
import { auth } from "@/lib/auth";
import { getAdminLeadDashboard } from "@/lib/domain/leads";
import { getCities, getFeaturedReviews, getServices } from "@/lib/domain/catalog";

export default async function AdminPage() {
  const session = await auth();
  const localPreviewMode = process.env.DATABASE_URL?.startsWith("file:");

  if (!session && !localPreviewMode) {
    redirect("/admin/login");
  }

  const cities = getCities();
  const services = getServices();
  const reviews = getFeaturedReviews();
  const dashboard = await getAdminLeadDashboard();

  return (
    <AdminShell>
      <div className="space-y-6">
        {!session && localPreviewMode ? (
          <section className="rounded-[28px] border border-accent/20 bg-[#fff4ec] p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Local preview mode
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-primary">Admin is open locally so you can review the dashboard.</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              Production should still use sign-in, but this local build shows the internal tools directly while the app is running on the file-based development database.
            </p>
          </section>
        ) : null}
        <section className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Supported cities", value: cities.length },
              { label: "Live services", value: services.length },
              { label: "Featured reviews", value: reviews.length },
              { label: "Leads captured", value: dashboard.leadCount },
              { label: "Target SLA", value: "<5 min" }
            ].map((stat) => (
              <div key={stat.label} className="rounded-[28px] bg-white p-6 shadow-panel">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-3 text-4xl font-semibold text-primary">{stat.value}</p>
              </div>
            ))}
          </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 shadow-panel">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold text-primary">City Manager</h2>
              <p className="text-sm text-muted">Showing first 24 of {cities.length} supported cities</p>
            </div>
            <div className="mt-5 space-y-3">
              {cities.slice(0, 24).map((city) => (
                <div key={city.slug} className="grid rounded-2xl bg-bg p-4 md:grid-cols-4">
                  <p className="font-semibold text-primary">{city.name}</p>
                  <p className="text-sm text-muted">{city.phoneNumber}</p>
                  <p className="text-sm text-muted">{city.responseTimeMinutes} min response</p>
                  <p className="text-sm font-semibold text-success">
                    {city.launchReady ? "Launch ready" : "Draft"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-panel">
            <h2 className="text-2xl font-semibold text-primary">Lead Ops Modules</h2>
            <div className="mt-5 grid gap-3">
              {dashboard.leadsByStatus.map((item) => (
                <div key={item.status} className="rounded-2xl bg-bg p-4 text-sm text-muted">
                  {item.status}: {item._count.status}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-panel">
          <h2 className="text-2xl font-semibold text-primary">Recent leads</h2>
          <div className="mt-5 space-y-3">
            {dashboard.recentLeads.length === 0 ? (
              <div className="rounded-2xl bg-bg p-4 text-sm text-muted">
                No leads captured yet. Submit the booking form to populate this table.
              </div>
            ) : (
              dashboard.recentLeads.map((lead) => (
                <div key={lead.id} className="grid rounded-2xl bg-bg p-4 md:grid-cols-5">
                  <p className="font-semibold text-primary">{lead.name}</p>
                  <p className="text-sm text-muted">{lead.city.name}</p>
                  <p className="text-sm text-muted">{lead.service.name}</p>
                  <p className="text-sm text-muted">{lead.status}</p>
                  <p className="text-sm text-muted">{lead.mobile}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
