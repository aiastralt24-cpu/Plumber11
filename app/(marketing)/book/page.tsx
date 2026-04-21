import { LeadForm } from "@/components/forms/lead-form";
import { getManagedCities, getManagedServices } from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

export default async function BookPage() {
  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[32px] bg-primary p-8 text-white shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Booking flow</p>
        <h1 className="mt-3 font-display text-5xl">Book your plumber in under two minutes.</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/78">
          This page is the central booking entry point for navigation, ads, and direct campaigns.
        </p>
        <div className="mt-8 rounded-[28px] bg-white p-6 text-text">
          <LeadForm cities={cities} services={services} sourcePage="/book" />
        </div>
      </section>
    </main>
  );
}
