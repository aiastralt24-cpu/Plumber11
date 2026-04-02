import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getAdminCitiesPageData } from "@/lib/domain/admin";

import Link from "next/link";

export default async function AdminCitiesPage() {
  await getAdminAccess();
  const cities = await getAdminCitiesPageData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">City operations</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">City readiness should live in its own tab.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            This page tracks local launch status, response time, contact routes, plumber roster
            coverage, and lead flow for each city.
          </p>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-panel">
          <div className="hidden grid-cols-[1fr_0.9fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-4 border-b border-primary/10 pb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/55 lg:grid">
            <p>City</p>
            <p>Contact</p>
            <p>SLA</p>
            <p>Network</p>
            <p>Leads</p>
            <p>Status</p>
          </div>
          <div className="divide-y divide-primary/10">
            {cities.map((city) => (
              <div key={city.slug} className="grid gap-3 py-4 lg:grid-cols-[1fr_0.9fr_0.7fr_0.7fr_0.7fr_0.7fr] lg:items-center lg:gap-4">
                <div>
                  <p className="font-semibold text-primary">{city.name}</p>
                  <p className="text-sm text-muted">{city.state}</p>
                  <Link className="mt-2 inline-flex text-sm font-semibold text-accent" href={`/admin/cities/${city.slug}`}>
                    Edit city
                  </Link>
                </div>
                <div className="text-sm text-muted">
                  <p>{city.phoneNumber}</p>
                  <p>{city.whatsappNumber}</p>
                </div>
                <p className="text-sm text-muted">{city.responseTimeMinutes} min</p>
                <p className="text-sm text-muted">{city.rosterCount || city.plumbersOnNetwork}</p>
                <p className="text-sm font-semibold text-primary">{city.leadCount}</p>
                <p className={`text-sm font-semibold ${city.launchReady ? "text-success" : "text-accent"}`}>
                  {city.launchReady ? "Launch ready" : "Draft"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
