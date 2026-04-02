import { notFound } from "next/navigation";
import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import { getCity, getServices } from "@/lib/domain/catalog";
import { getManagedCity, getManagedCityServicePage } from "@/lib/domain/catalog-managed";
import { updateCityPricing, updateCitySettings, seedCityPricing } from "@/app/admin/cities/[city]/actions";

export default async function AdminCityDetailPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  await getAdminAccess();

  const { city: citySlug } = await params;
  const city = await getManagedCity(citySlug);

  if (!city) {
    notFound();
  }

  const services = getServices();
  const pricingRows = await Promise.all(
    services.map(async (service) => ({
      service,
      combo: await getManagedCityServicePage(city.slug, service.slug)
    }))
  );

  return (
    <AdminShell>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">City editor</p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">{city.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            Update the live contact numbers, SLA, launch status, and city-specific pricing from one place.
          </p>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-panel">
          <h2 className="text-2xl font-semibold text-primary">City settings</h2>
          <form action={updateCitySettings} className="mt-6 grid gap-4 md:grid-cols-2">
            <input name="citySlug" type="hidden" value={city.slug} />
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">Phone number</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.phoneNumber} name="phoneNumber" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">WhatsApp number</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.whatsappNumber} name="whatsappNumber" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">Response time in minutes</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.responseTimeMinutes} min="1" name="responseTimeMinutes" type="number" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">Jobs completed</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.jobsCompleted} min="0" name="jobsCompleted" type="number" />
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold text-primary">
              <input defaultChecked={city.launchReady} name="launchReady" type="checkbox" />
              Launch ready
            </label>
            <div className="md:col-span-2">
              <button className="rounded-2xl bg-accent px-6 py-3 font-semibold text-white" type="submit">
                Save city settings
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-primary">City pricing</h2>
              <p className="mt-2 text-sm text-muted">
                These values feed the city landing and city-service pages.
              </p>
            </div>
            <form action={seedCityPricing}>
              <input name="citySlug" type="hidden" value={city.slug} />
              <button className="rounded-2xl border border-primary/10 px-5 py-3 text-sm font-semibold text-primary" type="submit">
                Seed all city pricing rows
              </button>
            </form>
          </div>

          <div className="mt-6 space-y-4">
            {pricingRows.map(({ service, combo }) => (
              <form key={service.slug} action={updateCityPricing} className="grid gap-4 rounded-[24px] bg-bg p-5 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto] md:items-end">
                <input name="citySlug" type="hidden" value={city.slug} />
                <input name="serviceSlug" type="hidden" value={service.slug} />
                <div>
                  <p className="text-lg font-semibold text-primary">{service.name}</p>
                  <p className="text-sm text-muted">{service.shortDescription}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">Min price</label>
                  <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-white px-4" defaultValue={combo?.localPriceMin ?? service.priceMin} name="localPriceMin" min="0" type="number" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">Max price</label>
                  <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-white px-4" defaultValue={combo?.localPriceMax ?? service.priceMax} name="localPriceMax" min="0" type="number" />
                </div>
                <button className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white" type="submit">
                  Save
                </button>
              </form>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
