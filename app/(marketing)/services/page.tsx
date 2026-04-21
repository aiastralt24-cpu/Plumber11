import Link from "next/link";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getManagedServices } from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

export default async function ServicesIndexPage() {
  const services = await getManagedServices();

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Services index</p>
      <h1 className="mt-3 font-display text-5xl text-primary">Core plumbing services built into the launch platform.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-[28px] bg-white p-6 shadow-panel">
            <ServiceIcon name={service.iconName} className="h-8 w-8 text-accent" />
            <h2 className="mt-4 text-2xl font-semibold text-primary">{service.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
