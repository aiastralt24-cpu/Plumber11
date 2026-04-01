import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getAdminAnalyticsPageData } from "@/lib/domain/admin";

export default async function AdminAnalyticsPage() {
  await getAdminAccess();
  const data = await getAdminAnalyticsPageData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Pipeline analytics</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">Status and source are broken down separately.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            This page is for operational analysis, not queue handling. Every status, every source,
            plus city and service contribution are separated into their own blocks.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 shadow-panel">
            <h2 className="text-2xl font-semibold text-primary">By status</h2>
            <div className="mt-5 space-y-3">
              {data.byStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between rounded-[22px] bg-bg px-4 py-4">
                  <p className="text-sm uppercase tracking-[0.18em] text-muted">{item.status}</p>
                  <p className="text-2xl font-semibold text-primary">{item._count.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-panel">
            <h2 className="text-2xl font-semibold text-primary">By source</h2>
            <div className="mt-5 space-y-3">
              {data.bySource.map((item) => (
                <div key={item.sourceChannel} className="flex items-center justify-between rounded-[22px] bg-bg px-4 py-4">
                  <p className="text-sm uppercase tracking-[0.18em] text-muted">{item.sourceChannel}</p>
                  <p className="text-2xl font-semibold text-primary">{item._count.sourceChannel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 shadow-panel">
            <h2 className="text-2xl font-semibold text-primary">By city</h2>
            <div className="mt-5 space-y-3">
              {data.byCity.slice(0, 12).map((item) => (
                <div key={item.city.slug} className="flex items-center justify-between rounded-[22px] bg-bg px-4 py-4">
                  <div>
                    <p className="font-semibold text-primary">{item.city.name}</p>
                    <p className="text-sm text-muted">{item.city.state}</p>
                  </div>
                  <p className="text-2xl font-semibold text-primary">{item.leadCount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-panel">
            <h2 className="text-2xl font-semibold text-primary">By service</h2>
            <div className="mt-5 space-y-3">
              {data.byService.slice(0, 12).map((item) => (
                <div key={item.service.slug} className="flex items-center justify-between rounded-[22px] bg-bg px-4 py-4">
                  <div>
                    <p className="font-semibold text-primary">{item.service.name}</p>
                    <p className="text-sm text-muted">{item.service.slug}</p>
                  </div>
                  <p className="text-2xl font-semibold text-primary">{item.leadCount}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
