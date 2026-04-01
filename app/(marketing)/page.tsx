import Link from "next/link";
import { ArrowRight, Clock3, PhoneCall, ShieldCheck, Siren, Star } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { HeroVisual } from "@/components/sections/hero-visual";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getCities, getFeaturedReviews, getServices } from "@/lib/domain/catalog";

export default function HomePage() {
  const cities = getCities();
  const services = getServices();
  const featuredReviews = getFeaturedReviews();

  return (
    <main>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="absolute inset-y-0 right-[-12%] w-[48%] bg-[radial-gradient(circle_at_center,rgba(232,96,28,0.18),transparent_62%)] blur-3xl" />
        <div className="absolute left-0 top-24 hidden h-64 w-64 rounded-full bg-accent/15 blur-3xl lg:block" />
        <div className="relative mx-auto grid min-h-[calc(100svh-89px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-12">
          <div className="flex flex-col justify-center lg:py-8">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
              <Siren className="h-4 w-4 text-accent" />
              Fast-response plumbing network
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-accent/90">
              City-first emergency and same-day service
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
              The fastest trusted plumbing response network in your city.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/78">
              Leakage, drainage, bathroom fitting, tank repair, urgent night calls, and verified
              same-day dispatch across launch cities with conversion-first local routing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mumbai/plumber-services"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-accent px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_18px_40px_rgba(232,96,28,0.3)]"
              >
                Find a Plumber
              </Link>
              <a
                href="https://wa.me/919810001001"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-white/20 px-7 py-4 text-center text-sm font-semibold text-white"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="mt-10 grid max-w-3xl gap-3 md:grid-cols-3">
              {[
                ["Emergency line", "24/7 phone and WhatsApp response"],
                ["Verified crews", "Background checked and city-routed"],
                ["Price clarity", "Local pricing bands before work begins"]
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/90">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/6 p-3 shadow-[0_30px_80px_rgba(4,10,18,0.4)] backdrop-blur">
              <HeroVisual />
              <div className="absolute left-6 top-6 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-panel">
                Emergency-ready dispatch
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="text-text">
                <LeadForm cities={cities} services={services} sourcePage="/" />
              </div>
              <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#0d1d30] shadow-panel">
                <div className="safety-stripes h-14 w-full border-b border-white/10" />
                <div className="space-y-5 p-6 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/90">
                      Hotline first
                    </p>
                    <p className="mt-2 text-3xl font-semibold">09810001001</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      Response commitment
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-2xl font-semibold">
                      <Clock3 className="h-5 w-5 text-accent" />
                      Dispatch starts in under 5 minutes
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-white/72">
                    <div className="flex items-start gap-3">
                      <PhoneCall className="mt-0.5 h-4 w-4 text-success" />
                      City-specific tracked number
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" />
                      Verified plumber dispatch
                    </div>
                    <div className="flex items-start gap-3">
                      <Siren className="mt-0.5 h-4 w-4 text-accent" />
                      Urgent jobs escalate automatically
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/8 bg-white/70 px-4 py-8 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
              {[
                ["30 min", "avg arrival across live city zones"],
                [`${cities.length} cities`, "supported footprint with local pages"],
                ["4 channels", "call, WhatsApp, form, callback"],
                ["<5 mins", "target first response SLA"]
              ].map(([value, label]) => (
            <div key={value} className="border-l border-primary/10 pl-4 first:border-l-0 first:pl-0">
              <p className="font-display text-4xl text-primary">{value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              Core services
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl text-primary">
              Service pages should feel like field-ready capability, not a software feature list.
            </h2>
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
              className="group overflow-hidden rounded-[28px] border border-primary/10 bg-white transition hover:-translate-y-1 hover:border-accent"
            >
              <div className="safety-stripes h-14 w-full border-b border-primary/10" />
              <div className="p-6">
                <ServiceIcon name={service.iconName} className="h-10 w-10 text-accent" />
                <h3 className="mt-5 text-xl font-semibold text-primary">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary/60 group-hover:text-accent">
                  View service detail
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f0e7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Cities we serve</p>
              <h2 className="mt-3 font-display text-4xl text-primary">
                Built city-by-city so every page feels local, urgent, and believable.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted">
                City-specific content, local numbers, neighbourhood signals, and CMS-driven growth
                without code changes.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.slice(0, 12).map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}/plumber-services`}
                  className="rounded-[26px] border border-primary/10 bg-white p-5 transition hover:border-accent"
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
            <div className="mt-6">
              <Link href="/cities" className="inline-flex text-sm font-semibold text-accent">
                Browse all {cities.length} supported cities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Call or submit the issue",
              "City dispatch confirms service and ETA",
              "Technician arrives and confirms scope"
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
            <article key={review.id} className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-panel">
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
