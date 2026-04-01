import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getAdminServicesPageData } from "@/lib/domain/admin";

export default async function AdminServicesPage() {
  await getAdminAccess();
  const services = await getAdminServicesPageData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Service coverage</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">Service inventory and demand should be reviewed here.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            This page brings together price ranges, duration, emergency eligibility, and lead
            demand by service.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.slug} className="rounded-[28px] bg-white p-6 shadow-panel">
              <p className="text-lg font-semibold text-primary">{service.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[20px] bg-bg p-4">
                  <p className="text-sm text-muted">Lead demand</p>
                  <p className="mt-2 text-2xl font-semibold text-primary">{service.leadCount}</p>
                </div>
                <div className="rounded-[20px] bg-bg p-4">
                  <p className="text-sm text-muted">Duration</p>
                  <p className="mt-2 text-2xl font-semibold text-primary">{service.durationHours}h</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-muted">
                <span>
                  Rs {service.priceMin} - {service.priceMax}
                </span>
                <span>{service.isEmergencyEligible ? "Emergency eligible" : "Standard"}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
