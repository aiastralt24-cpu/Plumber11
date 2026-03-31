import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getCities, getFeaturedReviews, getServices } from "@/lib/domain/catalog";

export default function HomePage() {
  const cities = getCities();
  const services = getServices();
  const featuredReviews = getFeaturedReviews();

  return (
    <main>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-mesh opacity-90" />
        <div className="relative mx-auto grid min-h-[calc(100svh-88px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
              City-first plumbing lead engine
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">
              Book trusted plumbers near you across major cities.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/78">
              Leakage, drainage, tank installation, emergency repairs, bathroom work, and fast
              same-day dispatch across launch cities.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <Link
                href="/mumbai/plumber-services"
                className="rounded-lg bg-accent px-6 py-4 text-center text-sm font-semibold text-white shadow-panel"
              >
                Find a Plumber
              </Link>
              <a
                href="https://wa.me/919810001001"
                className="rounded-lg border-2 border-white/20 px-6 py-4 text-center text-sm font-semibold text-white"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/72">
              {["4.8 rating", "Verified plumbers", "30-min response", "Trained professionals"].map(
                (item) => (
                  <div key={item} className="rounded-full border border-white/10 px-4 py-2">
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="grid gap-5 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-2 shadow-panel backdrop-blur">
              <Image
                src={cities[0].heroImage}
                alt="Plumber working on a residential repair"
                width={1000}
                height={1000}
                className="h-[360px] w-full rounded-[26px] object-cover sm:h-[460px]"
              />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/92 px-4 py-3 text-primary shadow-panel">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal">
                  Emergency ready
                </p>
                <p className="mt-1 text-lg font-semibold">Most jobs confirmed within 5 minutes</p>
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-6 text-text shadow-panel">
              <LeadForm cities={cities} services={services} sourcePage="/" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              Popular services
            </p>
            <h2 className="mt-3 font-display text-4xl text-primary">Built to route high-intent local demand.</h2>
          </div>
          <Link href="/cities" className="hidden text-sm font-semibold text-accent md:inline-flex">
            View all cities <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 8).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-[28px] bg-white p-6 shadow-panel transition hover:-translate-y-1"
            >
              <ServiceIcon name={service.iconName} className="h-10 w-10 text-accent" />
              <h3 className="mt-5 text-xl font-semibold text-primary">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Cities we serve</p>
              <h2 className="mt-3 font-display text-4xl text-primary">
                Eight launch markets, built for 100+ city expansion.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted">
                City-specific content, local numbers, neighbourhood signals, and CMS-driven growth
                without code changes.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}/plumber-services`}
                  className="rounded-[26px] border border-border bg-bg p-5 transition hover:border-primary"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">
                    {city.state}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-primary">{city.name}</p>
                  <p className="mt-2 text-sm text-muted">
                    {city.responseTimeMinutes}-minute average response with verified professionals.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Select city and service",
              "Get matched to a plumber",
              "Plumber arrives and confirms scope"
            ].map((step, index) => (
              <div key={step} className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
                  Step 0{index + 1}
                </p>
                <p className="mt-3 text-2xl font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Customer reviews</p>
            <h2 className="mt-3 font-display text-4xl text-primary">Proof from real city bookings.</h2>
          </div>
          <Link href="/reviews" className="hidden text-sm font-semibold text-accent md:inline-flex">
            View all reviews <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featuredReviews.slice(0, 6).map((review) => (
            <article key={review.id} className="rounded-[28px] bg-white p-6 shadow-panel">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={`${review.id}-${index}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-lg leading-7 text-primary">“{review.reviewText}”</p>
              <p className="mt-4 text-sm font-semibold text-primary">
                {review.reviewerName} · {review.reviewerArea}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
