import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import { DesktopContactCard } from "@/components/sections/desktop-contact-card";
import { DirectAnswerGrid } from "@/components/sections/direct-answer-grid";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/ui/json-ld";
import {
  getManagedCities,
  getManagedCity,
  getManagedCityArea,
  getManagedCityAreas,
  getManagedServicesForCity,
  getManagedStaticCities
} from "@/lib/domain/catalog-managed";
import { buildAreaMetadata } from "@/lib/seo/metadata";
import { createAreaLocalBusinessSchema, createFaqSchema } from "@/lib/seo/schema";

export const dynamicParams = true;
export const revalidate = 21600;

export async function generateStaticParams() {
  const cities = await getManagedStaticCities(50);
  const areaGroups = await Promise.all(cities.map((city) => getManagedCityAreas(city.slug)));

  return cities.flatMap((city, index) =>
    areaGroups[index].map((area) => ({
      city: city.slug,
      area: area.areaSlug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string; area: string }>;
}): Promise<Metadata> {
  const { city: citySlug, area: areaSlug } = await params;
  const area = await getManagedCityArea(citySlug, areaSlug);
  return area ? buildAreaMetadata(area) : {};
}

export default async function CityAreaPage({
  params
}: {
  params: Promise<{ city: string; area: string }>;
}) {
  const { city: citySlug, area: areaSlug } = await params;
  const city = await getManagedCity(citySlug);
  const area = await getManagedCityArea(citySlug, areaSlug);

  if (!city || !area) {
    notFound();
  }

  const cities = await getManagedCities();
  const services = await getManagedServicesForCity(citySlug);
  const nearbyAreas = (await getManagedCityAreas(city.slug))
    .filter((item) => item.areaSlug !== area.areaSlug)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={createAreaLocalBusinessSchema(city, area)} />
      <JsonLd data={createFaqSchema(area.faq)} />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section className="overflow-hidden rounded-[32px] bg-primary text-white shadow-panel">
            <div className="safety-stripes h-14 w-full border-b border-white/10" />
            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                Area service page
              </p>
              <h1 className="mt-4 font-display text-5xl leading-tight">{area.heroHeadline}</h1>
              <p className="mt-4 max-w-3xl text-lg text-white/76">
                Area-level plumbing page for {area.areaName}, connected to the wider {city.name} dispatch network with direct call, WhatsApp, and service navigation paths.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
                  <MapPin className="mr-2 inline h-4 w-4 text-accent" />
                  {area.areaName}, {city.name}
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
                  <ShieldCheck className="mr-2 inline h-4 w-4 text-accent" />
                  Verified local dispatch
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
                  <PhoneCall className="mr-2 inline h-4 w-4 text-success" />
                  Call {city.phoneNumber}
                </div>
              </div>
            </div>
          </section>

          <DirectAnswerGrid
            answers={[
              {
                question: `How fast can a plumber reach ${area.areaName}?`,
                answer: `${area.areaName} requests are routed through the ${city.name} dispatch flow, with active zones targeting around ${city.responseTimeMinutes}-${city.responseTimeMinutes + 8} minutes depending on availability.`
              },
              {
                question: `What is the starting price in ${area.areaName}?`,
                answer: "Small jobs follow the city service price bands, while larger pipe, seepage, tank, and fitting work is quoted after inspection details are confirmed."
              },
              {
                question: `Do you serve ${area.areaName}?`,
                answer: `${area.areaName} is listed as an active Plumberdost locality page for ${city.name}. Call or WhatsApp to confirm exact building-level availability.`
              },
              {
                question: "Can I book on WhatsApp?",
                answer: `Yes. Share your issue, location in ${area.areaName}, photos if available, and timing preference on WhatsApp at ${city.whatsappNumber}.`
              }
            ]}
          />

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              Local coverage in {area.areaName}
            </p>
            <div className="mt-6 space-y-5">
              {area.bodyCopy.map((paragraph) => (
                <p key={paragraph} className="max-w-4xl leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {area.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[22px] border border-primary/10 bg-bg p-5 text-sm text-muted">
                  {highlight}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
                  Service links from {area.areaName}
                </p>
                <h2 className="mt-3 font-display text-3xl text-primary">
                  Plumber services people usually book from this locality
                </h2>
              </div>
              <Link href={`/${city.slug}/plumber-services`} className="hidden text-sm font-semibold text-accent md:inline-flex">
                View city page <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.slice(0, 6).map((service) => (
                <Link
                  key={service.slug}
                  href={`/${city.slug}/${service.slug}`}
                  className="rounded-[22px] border border-primary/10 bg-bg p-5 transition hover:border-accent"
                >
                  <p className="text-lg font-semibold text-primary">{service.name}</p>
                  <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Nearby areas in {city.name}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {nearbyAreas.map((item) => (
                <Link
                  key={item.id}
                  href={`/${city.slug}/areas/${item.areaSlug}`}
                  className="rounded-[22px] border border-primary/10 bg-[#f6f0e7] p-5 transition hover:border-accent"
                >
                  <p className="text-lg font-semibold text-primary">{item.areaName}</p>
                  <p className="mt-2 text-sm text-muted">
                    Alternate locality page linked into the same {city.name} support network.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">FAQ for {area.areaName}</p>
            <div className="mt-6 divide-y divide-border">
              {area.faq.map((item, index) => (
                <details key={item.question} open={index === 0} className="py-4">
                  <summary className="cursor-pointer text-lg font-semibold text-primary">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <DesktopContactCard
          city={city}
          cities={cities}
          services={services}
          sourcePage={`/${city.slug}/areas/${area.areaSlug}`}
        />
      </div>

      <StickyCTA phoneNumber={city.phoneNumber} whatsappNumber={city.whatsappNumber} />
    </main>
  );
}
