import Link from "next/link";
import { ArrowRight, Clock3, PhoneCall, ShieldCheck, Siren, Star } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CitySelector } from "@/components/sections/city-selector";
import { HeroVisual } from "@/components/sections/hero-visual";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getFeaturedReviews } from "@/lib/domain/catalog";
import { getManagedCities, getManagedServices } from "@/lib/domain/catalog-managed";
import type { Service } from "@/types/domain";

const topServiceLabels: Record<string, string> = {
  "pipe-leakage-repair": "Water leakage",
  "drain-cleaning": "Blocked drain",
  "toilet-repair": "Toilet issue",
  "tap-installation": "Tap or faucet problem"
};

export const revalidate = 21600;

export default async function HomePage() {
  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);
  const featuredReviews = getFeaturedReviews();
  const primaryCity = cities[0];
  const totalJobs = cities.reduce((sum, city) => sum + city.jobsCompleted, 0);
  const averageRating = featuredReviews.length
    ? (
        featuredReviews.reduce((sum, review) => sum + review.rating, 0) / featuredReviews.length
      ).toFixed(1)
    : "4.8";
  const highlightedServices = [
    services.find((service) => service.slug === "pipe-leakage-repair"),
    services.find((service) => service.slug === "drain-cleaning"),
    services.find((service) => service.slug === "toilet-repair")
  ].filter((service): service is Service => Boolean(service));
  const otherServices = services.filter(
    (service) =>
      !highlightedServices.some((highlightedService) => highlightedService?.slug === service.slug)
  );

  return (
    <main>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="absolute inset-y-0 right-0 w-[58%] bg-[radial-gradient(circle_at_center,rgba(232,96,28,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,35,0.98)_0%,rgba(8,25,44,0.94)_36%,rgba(8,25,44,0.68)_58%,rgba(8,25,44,0.28)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-14 lg:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:gap-10">
            <div className="z-10 max-w-xl py-2 lg:py-10">
              <div className="inline-flex w-full max-w-[320px] items-center justify-between gap-2 rounded-full border border-success/25 bg-success/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-success sm:w-auto sm:max-w-none sm:justify-start sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.24em]">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                <span>Available now</span>
                <span className="text-white/32">•</span>
                <span>Live in {primaryCity.name}</span>
              </div>

              <h1 className="mt-6 max-w-3xl font-display text-[2.75rem] leading-[0.96] text-white sm:mt-8 sm:text-6xl lg:text-7xl">
                Need a plumber in <span className="text-accent">30 minutes?</span>
                <br />
                Book instantly.
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-8 text-white/78 sm:mt-6 sm:text-xl sm:leading-9">
                Verified professionals. Fixed pricing. Fast response in your city.
              </p>

              <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
                {[
                  { icon: Star, label: `${averageRating}★`, copy: `${featuredReviews.length} featured reviews` },
                  {
                    icon: ShieldCheck,
                    label: "Verified",
                    copy: `${primaryCity.plumbersOnNetwork} active pros in ${primaryCity.name}`
                  },
                  { icon: Clock3, label: "30 Min", copy: `Average arrival in ${primaryCity.name}` }
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-3.5 shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur sm:rounded-[22px] sm:py-4"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <Icon className="h-4 w-4 text-accent" />
                        <span className="text-base font-semibold sm:text-lg">{item.label}</span>
                      </div>
                      <p className="mt-1 text-sm text-white/65">{item.copy}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
                <Link
                  href="#hero-booking"
                  className="inline-flex min-h-14 items-center justify-center rounded-[20px] bg-accent px-6 py-4 text-base font-semibold text-white shadow-[0_22px_50px_rgba(232,96,28,0.35)] sm:min-h-16 sm:rounded-[22px] sm:px-8 sm:text-lg"
                >
                  Book Plumber Now
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center justify-start rounded-[18px] px-1 py-2 text-sm font-semibold text-white/70 transition hover:text-white sm:min-h-16 sm:justify-center sm:rounded-[22px] sm:px-4 sm:py-4 sm:text-base"
                >
                  View services
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm text-white/76 sm:mt-6 sm:gap-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full border-2 border-primary bg-[linear-gradient(135deg,#f2c7a5,#9db4c7)] sm:h-10 sm:w-10"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                  <span>{primaryCity.plumbersOnNetwork} plumbers active in {primaryCity.name}</span>
                </div>
              </div>
            </div>

            <div className="relative min-h-[400px] lg:min-h-[700px]">
              <div className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-[#0d2036] shadow-[0_36px_100px_rgba(3,10,18,0.42)] sm:rounded-[38px]">
                <HeroVisual />
              </div>
              <div id="hero-booking" className="relative mx-auto max-w-md px-0 pt-[220px] sm:px-0 sm:pt-[310px] lg:absolute lg:bottom-6 lg:right-6 lg:w-[380px] lg:pt-0">
                <LeadForm cities={cities} mode="quick" services={services} sourcePage="/" />
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 grid gap-3 rounded-[24px] border border-primary/10 bg-white p-4 text-primary shadow-[0_24px_80px_rgba(12,24,42,0.16)] md:mt-8 md:grid-cols-4 md:gap-4 md:rounded-[30px] md:p-6">
            {[
              ["1. Book", "Tell us the issue"],
              ["2. Confirm", "We call to verify"],
              ["3. On the Way", "Plumber is dispatched"],
              ["4. Fixed!", "Problem solved quickly"]
            ].map(([title, copy], index) => (
              <div
                key={title}
                className="flex items-start gap-3 border-b border-primary/10 pb-3.5 last:border-b-0 last:pb-0 md:gap-4 md:border-b-0 md:border-r md:pb-0 md:last:border-r-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0e6] text-accent md:h-11 md:w-11">
                  {index === 1 ? (
                    <PhoneCall className="h-5 w-5" />
                  ) : index === 2 ? (
                    <Siren className="h-5 w-5" />
                  ) : index === 3 ? (
                    <ShieldCheck className="h-5 w-5" />
                  ) : (
                    <Clock3 className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold md:text-lg">{title}</p>
                  <p className="mt-1 text-sm text-primary/62">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
              Customer reviews
            </p>
            <h2 className="mt-3 font-display text-4xl text-primary">
              Trust should show up before the user hesitates.
            </h2>
          </div>
          <Link href="/reviews" className="hidden text-sm font-semibold text-accent md:inline-flex">
            View all reviews <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featuredReviews.slice(0, 3).map((review) => (
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

      <section className="border-y border-primary/8 bg-white/70 px-4 py-8 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["30 min", "average arrival across active service zones"],
            [`${totalJobs}+`, "jobs completed across live launch cities"],
            [`${cities.length} cities`, "city pages with local routing and coverage"]
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
              Top plumbing issues
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl text-primary">
              People scan for problems, not generic service categories.
            </h2>
          </div>
          <Link href="/services" className="hidden text-sm font-semibold text-accent md:inline-flex">
            View all services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {highlightedServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group overflow-hidden rounded-[30px] border border-primary/10 bg-white transition hover:-translate-y-1 hover:border-accent"
            >
              <div className="safety-stripes h-14 w-full border-b border-primary/10" />
              <div className="p-6">
                <ServiceIcon name={service.iconName} className="h-10 w-10 text-accent" />
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-teal">
                  Most requested
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-primary">
                  {topServiceLabels[service.slug] ?? service.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary/60 group-hover:text-accent">
                  Solve this issue
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {otherServices.slice(0, 4).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group overflow-hidden rounded-[28px] border border-primary/10 bg-white transition hover:-translate-y-1 hover:border-accent"
            >
              <div className="p-6">
                <ServiceIcon name={service.iconName} className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-xl font-semibold text-primary">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">
              How it works
            </p>
            <h2 className="mt-3 font-display text-4xl">From urgent problem to confirmed visit.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Choose the issue and enter your phone number",
              "Confirm your city and the exact area for routing",
              "Dispatch shares ETA and sends the nearest verified plumber"
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

      <section className="bg-[#f6f0e7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
                Cities we serve
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl text-primary">
                Pick your city fast instead of scanning a long list.
              </h2>
            </div>
            <Link href="/cities" className="hidden text-sm font-semibold text-accent md:inline-flex">
              Browse all {cities.length} cities <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <CitySelector cities={cities} />
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.slice(0, 4).map((city) => (
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
          </div>
        </div>
      </section>
    </main>
  );
}
