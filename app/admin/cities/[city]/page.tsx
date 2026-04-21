import { notFound } from "next/navigation";
import { AdminShell } from "@/components/sections/admin-shell";
import { getAdminAccess } from "@/lib/admin";
import {
  getManagedAllCityAreas,
  getManagedCity,
  getManagedCityServicePage,
  getManagedServices
} from "@/lib/domain/catalog-managed";
import {
  updateAreaSettings,
  updateCityPricing,
  updateCitySettings,
  seedCityPricing
} from "@/app/admin/cities/[city]/actions";

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

  const [services, areas] = await Promise.all([getManagedServices(), getManagedAllCityAreas(city.slug)]);
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
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">Plumbers on network</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.plumbersOnNetwork} min="0" name="plumbersOnNetwork" type="number" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">Priority tier</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.priorityTier ?? 3} min="1" name="priorityTier" type="number" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-primary">SEO title</label>
              <input className="h-14 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4" defaultValue={city.metaTitle} name="metaTitle" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-primary">SEO description</label>
              <textarea className="min-h-28 w-full rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-4 py-3" defaultValue={city.metaDescription} name="metaDescription" />
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
          <h2 className="text-2xl font-semibold text-primary">Area serviceability</h2>
          <p className="mt-2 text-sm text-muted">
            Control which area pages are active, their priority, and their SEO snippets.
          </p>
          <div className="mt-6 space-y-4">
            {areas.map((area) => (
              <form key={area.id} action={updateAreaSettings} className="grid gap-4 rounded-[24px] bg-bg p-5 md:grid-cols-[1fr_0.4fr_0.5fr_auto] md:items-end">
                <input name="citySlug" type="hidden" value={city.slug} />
                <input name="areaSlug" type="hidden" value={area.areaSlug} />
                <div>
                  <p className="text-lg font-semibold text-primary">{area.areaName}</p>
                  <label className="mt-3 block text-sm font-semibold text-primary">SEO title</label>
                  <input className="mt-2 h-12 w-full rounded-2xl border border-[#d8d1c5] bg-white px-4" defaultValue={area.metaTitle} name="metaTitle" />
                  <label className="mt-3 block text-sm font-semibold text-primary">SEO description</label>
                  <textarea className="mt-2 min-h-20 w-full rounded-2xl border border-[#d8d1c5] bg-white px-4 py-3" defaultValue={area.metaDescription} name="metaDescription" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">Priority</label>
                  <input className="h-12 w-full rounded-2xl border border-[#d8d1c5] bg-white px-4" defaultValue={area.priority ?? 10} min="1" name="priority" type="number" />
                </div>
                <label className="flex items-center gap-3 text-sm font-semibold text-primary">
                  <input defaultChecked={area.isServiceable ?? true} name="isServiceable" type="checkbox" />
                  Serviceable
                </label>
                <button className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white" type="submit">
                  Save area
                </button>
              </form>
            ))}
          </div>
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
                <label className="flex items-center gap-3 text-sm font-semibold text-primary">
                  <input defaultChecked={combo?.publish ?? true} name="isPublished" type="checkbox" value="on" />
                  Published
                </label>
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
