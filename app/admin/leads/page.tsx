import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getAdminLeadsPageData } from "@/lib/domain/admin";

export default async function AdminLeadsPage() {
  await getAdminAccess();
  const data = await getAdminLeadsPageData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Lead management</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">Every generated lead should land here.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            This page is the working queue. It shows lead identity, city, service, urgency, status,
            source, and assignment context in one place.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.statuses.map((item) => (
              <div key={item.status} className="rounded-[24px] bg-bg p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-muted">{item.status}</p>
                <p className="mt-3 text-3xl font-semibold text-primary">{item._count.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-panel">
          <div className="hidden grid-cols-[1fr_0.8fr_0.9fr_0.7fr_0.7fr_0.8fr_0.8fr] gap-4 border-b border-primary/10 pb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/55 lg:grid">
            <p>Lead</p>
            <p>City</p>
            <p>Service</p>
            <p>Urgency</p>
            <p>Status</p>
            <p>Source</p>
            <p>Assigned</p>
          </div>
          <div className="divide-y divide-primary/10">
            {data.leads.map((lead) => (
              <div key={lead.id} className="grid gap-3 py-4 lg:grid-cols-[1fr_0.8fr_0.9fr_0.7fr_0.7fr_0.8fr_0.8fr] lg:items-center lg:gap-4">
                <div>
                  <p className="font-semibold text-primary">{lead.name}</p>
                  <p className="text-sm text-muted">{lead.mobile}</p>
                  <p className="text-sm text-muted">{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-sm text-muted">{lead.city.name}</p>
                <p className="text-sm text-muted">{lead.service.name}</p>
                <p className="text-sm text-muted">{lead.urgency}</p>
                <p className="text-sm font-semibold text-primary">{lead.status}</p>
                <p className="text-sm text-muted">{lead.sourceChannel}</p>
                <p className="text-sm text-muted">{lead.plumber?.name ?? "Unassigned"}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
