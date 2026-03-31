import { LeadForm } from "@/components/forms/lead-form";
import { getCities, getServices } from "@/lib/domain/catalog";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[32px] bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Contact</p>
        <h1 className="mt-3 font-display text-5xl text-primary">Central contact and callback routing.</h1>
        <p className="mt-4 text-lg text-muted">
          Use this flow for non-urgent bookings, multi-service needs, and support requests across all
          launch cities.
        </p>
        <div className="mt-8">
          <LeadForm cities={getCities()} services={getServices()} sourcePage="/contact" />
        </div>
      </section>
    </main>
  );
}
