import { notFound } from "next/navigation";
import { PhoneCall, TimerReset } from "lucide-react";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { getManagedCity, getManagedStaticCities } from "@/lib/domain/catalog-managed";

export const dynamicParams = true;
export const revalidate = 21600;

export async function generateStaticParams() {
  const cities = await getManagedStaticCities(100);
  return cities.map((city) => ({ city: city.slug }));
}

export default async function EmergencyCityPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = await getManagedCity(citySlug);

  if (!city) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EmergencyService",
          name: `Emergency Plumber in ${city.name}`,
          areaServed: city.name
        }}
      />
      <section className="rounded-[36px] bg-primary p-10 text-white shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
          Emergency page
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight">
          Emergency Plumber in {city.name} — Available 24/7, arrives in {city.responseTimeMinutes} minutes.
        </h1>
        <a
          href={`tel:${city.phoneNumber}`}
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-xl bg-success px-8 py-4 text-lg font-semibold text-white"
        >
          <PhoneCall className="mr-2 h-5 w-5" />
          Call {city.phoneNumber}
        </a>
        <div className="mt-8 rounded-[28px] bg-white/8 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Average response time
          </p>
          <p className="mt-3 flex items-center text-2xl font-semibold">
            <TimerReset className="mr-2 h-5 w-5 text-accent" />
            {city.responseTimeMinutes} minutes across {city.name}
          </p>
          <p className="mt-4 max-w-2xl text-white/78">
            Burst pipes, major leaks, overflow, blocked drainage, and after-hours urgent support are
            routed through the fastest-action workflow in the system.
          </p>
        </div>
      </section>
      <StickyCTA phoneNumber={city.phoneNumber} whatsappNumber={city.whatsappNumber} />
    </main>
  );
}
