import Link from "next/link";
import { getCities } from "@/lib/domain/catalog";

export default function NationalEmergencyPage() {
  const cities = getCities();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[32px] bg-primary p-10 text-white shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
          National emergency entry
        </p>
        <h1 className="mt-3 font-display text-5xl">Emergency plumbing support across launch cities.</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/78">
          Choose your city to reach the correct local team fast. Emergency routes prioritize phone
          and WhatsApp above all other actions.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/emergency-plumber`}
              className="rounded-xl bg-white/10 px-4 py-3 text-center font-semibold text-white"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
