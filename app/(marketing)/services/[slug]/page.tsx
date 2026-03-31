import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadForm } from "@/components/forms/lead-form";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getCities, getService, getServices } from "@/lib/domain/catalog";
import { formatCurrency } from "@/lib/utils/format";

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.name} | PlumbRight`,
    description: service.shortDescription
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  const cities = getCities();

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: service.name,
          provider: { "@type": "Organization", name: "PlumbRight" }
        }}
      />
      <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[32px] bg-white p-8 shadow-panel">
          <ServiceIcon name={service.iconName} className="h-12 w-12 text-accent" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-teal">
            National service page
          </p>
          <h1 className="mt-3 font-display text-5xl text-primary">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{service.shortDescription}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-bg p-5">
              <p className="text-sm text-muted">Pricing range</p>
              <p className="mt-2 text-2xl font-semibold text-primary">
                {formatCurrency(service.priceMin)} - {formatCurrency(service.priceMax)}
              </p>
            </div>
            <div className="rounded-2xl bg-bg p-5">
              <p className="text-sm text-muted">Avg. duration</p>
              <p className="mt-2 text-2xl font-semibold text-primary">{service.durationHours} hrs</p>
            </div>
            <div className="rounded-2xl bg-bg p-5">
              <p className="text-sm text-muted">Emergency eligible</p>
              <p className="mt-2 text-2xl font-semibold text-primary">
                {service.isEmergencyEligible ? "Yes" : "Planned jobs"}
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-5">
            {service.fullDescription.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-base leading-7 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Available in launch cities</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {cities.map((city) => (
                <a
                  key={city.slug}
                  href={`/${city.slug}/${service.slug}`}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary"
                >
                  {city.name} <ArrowRight className="ml-2 inline h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[32px] bg-primary p-8 text-white shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Book this service
          </p>
          <LeadForm
            cities={cities}
            services={getServices()}
            defaultServiceSlug={service.slug}
            sourcePage={`/services/${slug}`}
          />
        </div>
      </section>
    </main>
  );
}
