import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock3, PhoneCall, ShieldCheck, Star, Zap } from "lucide-react";
import { DesktopContactCard } from "@/components/sections/desktop-contact-card";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getCities, getCity, getCityReviews, getServices } from "@/lib/domain/catalog";
import { buildCityMetadata } from "@/lib/seo/metadata";
import { createFaqSchema, createLocalBusinessSchema, createReviewSchema } from "@/lib/seo/schema";
import { formatCurrency } from "@/lib/utils/format";

export function generateStaticParams() {
  return getCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  return city ? buildCityMetadata(city) : {};
}

export default async function CityLandingPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  const cities = getCities();
  const services = getServices();

  if (!city) {
    notFound();
  }

  const cityReviews = getCityReviews(city.slug);

  return (
    <main className="pb-20">
      <JsonLd data={createLocalBusinessSchema(city)} />
      <JsonLd data={createFaqSchema(city.faq)} />
      <JsonLd data={createReviewSchema(city, cityReviews)} />
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
          <div className="flex min-h-[420px] flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
              {city.name} city landing page
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.96] sm:text-6xl">
              {city.heroHeadline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/78">{city.heroSubheadline}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full bg-white/10 px-4 py-2">
                <Star className="mr-2 inline h-4 w-4 text-accent" />
                4.8 rating
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2">
                <ShieldCheck className="mr-2 inline h-4 w-4 text-accent" />
                Licensed
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2">
                <Clock3 className="mr-2 inline h-4 w-4 text-accent" />
                {city.responseTimeMinutes}-min avg response
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2">
                <Zap className="mr-2 inline h-4 w-4 text-accent" />
                Satisfaction guarantee
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${city.phoneNumber}`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-success px-6 py-4 font-semibold text-white"
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Call Now — {city.phoneNumber}
              </a>
              <a
                href={`https://wa.me/${city.whatsappNumber}?text=Hi,%20I%20need%20a%20plumber%20in%20${city.name}`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#25D366] px-6 py-4 font-semibold text-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 p-2 shadow-panel">
            <Image
              src={city.heroImage}
              alt={`Plumbing service in ${city.name}`}
              width={1200}
              height={1000}
              className="h-full min-h-[420px] w-full rounded-[28px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              Services in {city.name}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {services.slice(0, 5).map((service) => (
                <a
                  key={service.slug}
                  href={`/${city.slug}/${service.slug}`}
                  className="rounded-[24px] border border-border p-5 transition hover:border-primary"
                >
                  <ServiceIcon name={service.iconName} className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 text-xl font-semibold text-primary">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Pricing in {city.name}</p>
            <div className="mt-6 grid gap-3">
              {services.slice(0, 5).map((service) => (
                <div key={service.slug} className="grid rounded-2xl bg-bg p-4 md:grid-cols-3">
                  <p className="font-semibold text-primary">{service.name}</p>
                  <p className="text-muted">
                    {formatCurrency(service.priceMin)} - {formatCurrency(service.priceMax)}
                  </p>
                  <p className="text-muted">{service.durationHours} hrs avg duration</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              Final price is shared before work begins. No hidden charges.
            </p>
          </section>

          <section className="rounded-[32px] bg-primary p-8 text-white shadow-panel">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">Jobs completed</p>
                <p className="mt-2 text-3xl font-semibold">{city.jobsCompleted}+</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">Average rating</p>
                <p className="mt-2 text-3xl font-semibold">4.8★</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">Plumbers on network</p>
                <p className="mt-2 text-3xl font-semibold">{city.plumbersOnNetwork}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Areas served in {city.name}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {city.neighbourhoods.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary"
                >
                  {area}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Customer reviews</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {cityReviews.map((review) => (
                <article key={review.id} className="rounded-[24px] bg-bg p-5">
                  <p className="text-lg font-semibold text-primary">{review.reviewerName}</p>
                  <p className="mt-1 text-sm text-muted">{review.reviewerArea}</p>
                  <p className="mt-4 text-sm leading-6 text-muted">{review.reviewText}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">FAQ</p>
            <div className="mt-6 divide-y divide-border">
              {city.faq.map((item, index) => (
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
          sourcePage={`/${city.slug}/plumber-services`}
        />
      </section>

      <StickyCTA phoneNumber={city.phoneNumber} whatsappNumber={city.whatsappNumber} />
    </main>
  );
}
