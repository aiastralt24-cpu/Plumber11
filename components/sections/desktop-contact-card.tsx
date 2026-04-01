import { LeadForm } from "@/components/forms/lead-form";
import type { City, Service } from "@/types/domain";

export function DesktopContactCard({
  city,
  cities,
  services,
  serviceSlug,
  sourcePage
}: {
  city: City;
  cities: City[];
  services: Service[];
  serviceSlug?: string;
  sourcePage: string;
}) {
  return (
    <aside className="hidden overflow-hidden rounded-[30px] border border-primary/10 bg-primary text-white shadow-panel lg:block">
      <div className="safety-stripes h-14 w-full border-b border-white/10" />
      <div className="p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Dispatch desk</p>
      <h3 className="mt-3 text-3xl font-semibold">Speak to the {city.name} team in minutes.</h3>
      <p className="mt-2 text-sm text-white/70">
        Use the short form or jump straight to call and WhatsApp. Urgent leads route first.
      </p>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">Response commitment</p>
        <p className="mt-2 text-2xl font-semibold">{city.responseTimeMinutes} min average response</p>
      </div>
      <div className="mt-5 grid gap-3">
        <a
          href={`tel:${city.phoneNumber}`}
          className="rounded-lg bg-success px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Call {city.phoneNumber}
        </a>
        <a
          href={`https://wa.me/${city.whatsappNumber}`}
          className="rounded-lg bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          WhatsApp Us
        </a>
      </div>
      <div className="mt-6 border-t border-white/10 pt-6">
        <LeadForm
          cities={cities}
          services={services}
          defaultCitySlug={city.slug}
          defaultServiceSlug={serviceSlug}
          compact
          sourcePage={sourcePage}
        />
      </div>
      </div>
    </aside>
  );
}
