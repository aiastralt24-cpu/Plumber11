import Link from "next/link";
import { getCities, getCityAreas } from "@/lib/domain/catalog";

export default function CitiesPage() {
  const cities = getCities();
  const areaCount = cities.reduce((total, city) => total + getCityAreas(city.slug).length, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Cities index</p>
      <h1 className="mt-3 font-display text-5xl text-primary">City pages built for broad local search coverage.</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        {cities.length} city pages and {areaCount} area subpages are now mapped into the content network so users can land on city-level and locality-level plumbing intent without thin duplication.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}/plumber-services`}
            className="rounded-[28px] bg-white p-6 shadow-panel"
          >
            <p className="text-sm text-muted">{city.state}</p>
            <p className="mt-2 text-2xl font-semibold text-primary">{city.name}</p>
            <p className="mt-3 text-sm text-muted">{city.responseTimeMinutes}-minute average response.</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
