import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DesktopContactCard } from "@/components/sections/desktop-contact-card";
import { DirectAnswerGrid } from "@/components/sections/direct-answer-grid";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { getCityReviews } from "@/lib/domain/catalog";
import {
  getManagedCities,
  getManagedCity,
  getManagedCityAreas,
  getManagedCityServicePage,
  getManagedService,
  getManagedServices,
  getManagedServicesForCity,
  getManagedStaticCities
} from "@/lib/domain/catalog-managed";
import { buildCityServiceMetadata } from "@/lib/seo/metadata";
import { createFaqSchema, createServiceSchema } from "@/lib/seo/schema";
import { formatCurrency } from "@/lib/utils/format";

export const dynamicParams = true;
export const revalidate = 21600;

export async function generateStaticParams() {
  const [cities, services] = await Promise.all([getManagedStaticCities(50), getManagedServices()]);
  return cities.flatMap((city) =>
    services.map((service) => ({ city: city.slug, service: service.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = await getManagedCity(citySlug);
  const service = await getManagedService(serviceSlug);
  return city && service ? buildCityServiceMetadata(city, service) : {};
}

export default async function CityServicePage({
  params
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = await getManagedCity(citySlug);
  const service = await getManagedService(serviceSlug);
  const combo = await getManagedCityServicePage(citySlug, serviceSlug);
  const services = await getManagedServicesForCity(citySlug);
  const areaPages = city ? (await getManagedCityAreas(city.slug)).slice(0, 6) : [];

  if (!city || !service || !combo) {
    notFound();
  }

  const reviews = getCityReviews(city.slug).filter(
    (review) => !review.serviceSlug || review.serviceSlug === service.slug
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={createServiceSchema(city, service)} />
      <JsonLd data={createFaqSchema(city.faq.slice(0, 4))} />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              City + service combo page
            </p>
            <h1 className="mt-3 font-display text-5xl text-primary">{combo.customH1}</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">{service.shortDescription}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-bg p-5">
                <p className="text-sm text-muted">Estimated pricing</p>
                <p className="mt-2 text-2xl font-semibold text-primary">
                  {formatCurrency(combo.localPriceMin)} - {formatCurrency(combo.localPriceMax)}
                </p>
              </div>
              <div className="rounded-2xl bg-bg p-5">
                <p className="text-sm text-muted">Avg. duration</p>
                <p className="mt-2 text-2xl font-semibold text-primary">{service.durationHours} hrs</p>
              </div>
              <div className="rounded-2xl bg-bg p-5">
                <p className="text-sm text-muted">Coverage</p>
                <p className="mt-2 text-2xl font-semibold text-primary">
                  {city.neighbourhoods.slice(0, 3).join(", ")}
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-5">
              {combo.customBody.map((paragraph) => (
                <p key={paragraph} className="max-w-3xl leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <DirectAnswerGrid
            answers={[
              {
                question: `How fast can ${service.name.toLowerCase()} be handled in ${city.name}?`,
                answer: `${city.name} requests are routed through the local dispatch flow, with urgent eligible jobs prioritised around the ${city.responseTimeMinutes}-minute response target.`
              },
              {
                question: `What is the price for ${service.name.toLowerCase()} in ${city.name}?`,
                answer: `The listed range is ${formatCurrency(combo.localPriceMin)} - ${formatCurrency(combo.localPriceMax)}. Final pricing is confirmed before work begins.`
              },
              {
                question: `Which areas are covered for this service?`,
                answer: `Popular ${city.name} localities are linked below, and phone or WhatsApp support can confirm availability for your exact area.`
              },
              {
                question: "Can I book this service on WhatsApp?",
                answer: `Yes. Share the issue, area, and preferred timing on WhatsApp at ${city.whatsappNumber} for quick confirmation.`
              }
            ]}
          />

          <section className="rounded-[32px] bg-primary p-8 text-white shadow-panel">
            <h2 className="font-display text-4xl">How this visit works in {city.name}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Share the issue and area",
                "Get a callback or WhatsApp confirmation",
                "Technician arrives and confirms scope"
              ].map((step) => (
                <div key={step} className="rounded-2xl bg-white/5 p-5 text-sm">
                  {step}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <h2 className="font-display text-3xl text-primary">Reviews tied to local proof</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-[24px] bg-bg p-5">
                  <p className="font-semibold text-primary">{review.reviewerName}</p>
                  <p className="mt-1 text-sm text-muted">{review.reviewerArea}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{review.reviewText}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <h2 className="font-display text-3xl text-primary">
              Popular areas for {service.name.toLowerCase()} in {city.name}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {areaPages.map((area) => (
                <Link
                  key={area.id}
                  href={`/${city.slug}/areas/${area.areaSlug}`}
                  className="rounded-[22px] border border-primary/10 bg-bg p-5 transition hover:border-accent"
                >
                  <p className="text-lg font-semibold text-primary">{area.areaName}</p>
                  <p className="mt-2 text-sm text-muted">
                    Local area page for nearby bookings, FAQs, and city dispatch support.
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <DesktopContactCard
          city={city}
          cities={await getManagedCities()}
          services={services}
          serviceSlug={service.slug}
          sourcePage={`/${citySlug}/${serviceSlug}`}
        />
      </div>
      <StickyCTA phoneNumber={city.phoneNumber} whatsappNumber={city.whatsappNumber} />
    </main>
  );
}
