import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DesktopContactCard } from "@/components/sections/desktop-contact-card";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { getCities, getCity, getCityReviews, getCityServicePage, getService, getServices } from "@/lib/domain/catalog";
import { buildCityServiceMetadata } from "@/lib/seo/metadata";
import { createFaqSchema, createServiceSchema } from "@/lib/seo/schema";
import { formatCurrency } from "@/lib/utils/format";

export function generateStaticParams() {
  return getCities().flatMap((city) =>
    getServices().slice(0, 5).map((service) => ({ city: city.slug, service: service.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  return city && service ? buildCityServiceMetadata(city, service) : {};
}

export default async function CityServicePage({
  params
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  const combo = getCityServicePage(citySlug, serviceSlug);

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
        </div>
        <DesktopContactCard
          city={city}
          cities={getCities()}
          services={getServices()}
          serviceSlug={service.slug}
          sourcePage={`/${citySlug}/${serviceSlug}`}
        />
      </div>
      <StickyCTA phoneNumber={city.phoneNumber} whatsappNumber={city.whatsappNumber} />
    </main>
  );
}
