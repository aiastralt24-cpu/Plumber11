import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock3, PhoneCall, ShieldCheck, Siren, Star, Zap } from "lucide-react";
import { DesktopContactCard } from "@/components/sections/desktop-contact-card";
import { DirectAnswerGrid } from "@/components/sections/direct-answer-grid";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getCityReviews } from "@/lib/domain/catalog";
import {
  getManagedCities,
  getManagedCity,
  getManagedCityAreas,
  getManagedServicesForCity,
  getManagedStaticCities
} from "@/lib/domain/catalog-managed";
import { buildCityMetadata } from "@/lib/seo/metadata";
import { createFaqSchema, createLocalBusinessSchema, createReviewSchema } from "@/lib/seo/schema";
import { formatCurrency } from "@/lib/utils/format";

export const dynamicParams = true;
export const revalidate = 21600;

export async function generateStaticParams() {
  const cities = await getManagedStaticCities(100);
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getManagedCity(citySlug);
  return city ? buildCityMetadata(city) : {};
}

export default async function CityLandingPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = await getManagedCity(citySlug);
  const cities = await getManagedCities();
  const services = await getManagedServicesForCity(citySlug);

  if (!city) {
    notFound();
  }

  const areas = await getManagedCityAreas(city.slug);
  const cityReviews = getCityReviews(city.slug);

  return (
    <main className="pb-20">
      <JsonLd data={createLocalBusinessSchema(city)} />
      <JsonLd data={createFaqSchema(city.faq)} />
      <JsonLd data={createReviewSchema(city, cityReviews)} />
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute right-0 top-10 hidden h-72 w-72 rounded-full bg-accent/15 blur-3xl lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="flex min-h-[420px] flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
              <Siren className="h-4 w-4 text-accent" />
              {city.name} rapid-response zone
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">
              Local verified plumbing dispatch
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.96] sm:text-6xl">
              {city.heroHeadline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/78">{city.heroSubheadline}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
                <Star className="mr-2 inline h-4 w-4 text-accent" />
                4.8 rating
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
                <ShieldCheck className="mr-2 inline h-4 w-4 text-accent" />
                Licensed
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
                <Clock3 className="mr-2 inline h-4 w-4 text-accent" />
                {city.responseTimeMinutes}-min avg response
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
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
            <div className="mt-8 grid max-w-3xl gap-3 md:grid-cols-3">
              {[
                ["Local number", "City-routed calls and tracking"],
                ["Price signals", "Clear bands before work begins"],
                ["Neighbourhood coverage", "Service zones visible on-page"]
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/90">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3 shadow-panel">
            <Image
              src={city.heroImage}
              alt={`Plumbing service in ${city.name}`}
              width={1200}
              height={1000}
              className="h-full min-h-[420px] w-full rounded-[30px] object-cover"
            />
            <div className="absolute left-6 top-6 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-panel">
              Emergency-ready
            </div>
            <div className="absolute bottom-6 left-6 max-w-xs rounded-[24px] bg-primary/92 px-5 py-4 text-white shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/90">Dispatch note</p>
              <p className="mt-2 text-2xl font-semibold">{city.responseTimeMinutes} minute response target</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <DirectAnswerGrid
            answers={[
              {
                question: `How fast can a plumber reach in ${city.name}?`,
                answer: `Active ${city.name} requests are routed for an average ${city.responseTimeMinutes}-minute response target, depending on locality, technician availability, and job urgency.`
              },
              {
                question: `What is the starting price in ${city.name}?`,
                answer: `Small plumbing fixes start from the listed service price bands. Larger repairs are confirmed after issue diagnosis, site details, and material requirements.`
              },
              {
                question: `Do you serve my area in ${city.name}?`,
                answer: `The area list below shows active service zones. If your locality is nearby, call or WhatsApp and the dispatch team can confirm availability before booking.`
              },
              {
                question: "Can I book on WhatsApp?",
                answer: `Yes. Send your issue, area, and preferred time on WhatsApp at ${city.whatsappNumber}, and the ${city.name} team will guide the next step.`
              }
            ]}
          />

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              Services in {city.name}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {services.slice(0, 8).map((service) => (
                <a
                  key={service.slug}
                  href={`/${city.slug}/${service.slug}`}
                  className="group overflow-hidden rounded-[24px] border border-primary/10 transition hover:border-accent"
                >
                  <div className="safety-stripes h-12 w-full border-b border-primary/10" />
                  <div className="p-5">
                    <ServiceIcon name={service.iconName} className="h-8 w-8 text-accent" />
                    <h3 className="mt-4 text-xl font-semibold text-primary">{service.name}</h3>
                    <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary/60 group-hover:text-accent">
                      Open service page <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-primary/10 bg-[#f6f0e7] p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Pricing in {city.name}</p>
            <div className="mt-6 grid gap-3">
              {services.slice(0, 8).map((service) => (
                <div key={service.slug} className="grid rounded-2xl border border-primary/10 bg-white p-4 md:grid-cols-3">
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

          <section className="overflow-hidden rounded-[32px] bg-primary text-white shadow-panel">
            <div className="safety-stripes h-14 w-full border-b border-white/10" />
            <div className="grid gap-4 p-8 md:grid-cols-3">
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
                  className="rounded-full border border-primary/10 bg-[#f6f0e7] px-4 py-2 text-sm font-semibold text-primary"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/55">
                Area pages for local intent
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {areas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/${city.slug}/areas/${area.areaSlug}`}
                    className="rounded-[22px] border border-primary/10 bg-[#f6f0e7] p-4 transition hover:border-accent"
                  >
                    <p className="text-lg font-semibold text-primary">{area.areaName}</p>
                    <p className="mt-2 text-sm text-muted">
                      Local plumber page with service links, FAQs, and area-specific conversion copy.
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Customer reviews</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {cityReviews.map((review) => (
                <article key={review.id} className="rounded-[24px] border border-primary/10 bg-[#f6f0e7] p-5">
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
