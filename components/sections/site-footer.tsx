import Link from "next/link";
import { getCities, getServices } from "@/lib/domain/catalog";

export function SiteFooter() {
  const cities = getCities().slice(0, 6);
  const services = getServices().slice(0, 6);

  return (
    <footer className="border-t border-border bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">PlumbRight</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            City-first plumbing lead generation platform built for fast local response, clean
            routing, and conversion-first UX.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Cities</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link href={`/${city.slug}/plumber-services`}>{city.name}</Link>
              </li>
            ))}
          </ul>
          <Link className="mt-4 inline-flex text-sm font-semibold text-accent" href="/cities">
            View all cities
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/60">
        © 2026 PlumbRight. GST and license fields are reserved in CMS and admin metadata.
      </div>
    </footer>
  );
}
