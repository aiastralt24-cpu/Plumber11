import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import {
  getCities,
  getCity,
  getCityArea,
  getCityAreas,
  getCityServicePage,
  getService,
  getServices
} from "@/lib/domain/catalog";
import type { AreaPage, City, CityServicePage, FAQ, Service } from "@/types/domain";

const CATALOG_REVALIDATE_SECONDS = 60 * 60 * 6;

function logCatalogFallback(scope: string, error: unknown) {
  console.error(`[catalog-managed] Falling back to seed data for ${scope}`, error);
}

function asStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : fallback;
}

function asFaqArray(value: unknown, fallback: FAQ[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const faq = value.filter(
    (item): item is FAQ =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as FAQ).question === "string" &&
      typeof (item as FAQ).answer === "string"
  );

  return faq.length > 0 ? faq : fallback;
}

function fallbackCityBody(city: string) {
  return [
    `${city} plumbing requests are usually urgent, local, and trust-sensitive, so this page focuses on response time, service coverage, and clear next steps before booking.`,
    `Plumberdost connects ${city} customers with phone and WhatsApp-led plumbing support for leakage, drainage, toilet, tap, tank, and emergency repair needs.`
  ];
}

function fallbackCityFaq(city: string): FAQ[] {
  return [
    {
      question: `How fast can a plumber reach in ${city}?`,
      answer: `Response times depend on technician availability and locality, but active ${city} zones are routed for fast same-day plumbing support.`
    },
    {
      question: `Can I book a plumber in ${city} on WhatsApp?`,
      answer: `Yes. You can share your issue, area, and preferred timing by phone or WhatsApp before the job is confirmed.`
    },
    {
      question: `Do you share plumbing prices before work starts in ${city}?`,
      answer: "Yes. The issue, scope, and estimated price band are confirmed before larger repair work begins."
    }
  ];
}

function fallbackAreaBody(cityName: string, areaName: string) {
  return [
    `${areaName} in ${cityName} receives local plumbing demand for leakage control, blocked drains, toilet repairs, tap replacement, and water pressure issues.`,
    `This page helps ${areaName} customers confirm service coverage, response expectations, and booking options without landing on a generic national page.`
  ];
}

function fallbackAreaFaq(cityName: string, areaName: string): FAQ[] {
  return [
    {
      question: `Do you offer same-day plumber service in ${areaName}, ${cityName}?`,
      answer: `Same-day support is available when technicians are active near ${areaName}; urgent leakage, blockage, and overflow requests are prioritised.`
    },
    {
      question: `Can I book by WhatsApp from ${areaName}?`,
      answer: `Yes. Share your area, issue, and preferred timing by WhatsApp or phone and the ${cityName} dispatch flow will guide the next step.`
    },
    {
      question: `What plumbing issues are common in ${areaName}?`,
      answer: "Common requests include pipe leakage repair, blocked drains, toilet repair, tap replacement, kitchen sink issues, water tank repair, and water motor fitting."
    }
  ];
}

function mapCityRecord(record: any, baseCity?: City): City {
  const neighbourhoods =
    record.neighbourhoods?.length > 0
      ? record.neighbourhoods.map((item: any) => item.name)
      : (baseCity?.neighbourhoods ?? []);
  const fallbackBody = baseCity?.bodyCopy ?? fallbackCityBody(record.name);
  const fallbackFaq = baseCity?.faq ?? fallbackCityFaq(record.name);

  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    state: record.state,
    priorityTier: record.priorityTier,
    phoneNumber: record.phoneNumber,
    whatsappNumber: record.whatsappNumber,
    responseTimeMinutes: record.responseTimeMinutes,
    jobsCompleted: record.jobsCompleted,
    plumbersOnNetwork: record.plumbersOnNetwork ?? baseCity?.plumbersOnNetwork ?? 0,
    heroImage: record.heroImageUrl ?? baseCity?.heroImage ?? "/images/plumber-hero.jpg",
    metaTitle:
      record.metaTitle ?? baseCity?.metaTitle ?? `Plumber in ${record.name} | Same-Day Plumbing | Plumberdost`,
    metaDescription:
      record.metaDescription ??
      baseCity?.metaDescription ??
      `Book verified plumbers in ${record.name} for leakage, blockage, bathroom fitting, tank repair, and emergency plumbing support.`,
    neighbourhoods,
    heroHeadline: record.heroHeadline ?? baseCity?.heroHeadline ?? `Plumber Services in ${record.name}`,
    heroSubheadline:
      record.heroSubheadline ??
      baseCity?.heroSubheadline ??
      `Book verified plumbers in ${record.name} for urgent and same-day plumbing support.`,
    bodyCopy: asStringArray(record.bodyCopy, fallbackBody),
    faq: asFaqArray(record.faq, fallbackFaq),
    featuredReviewIds: baseCity?.featuredReviewIds ?? [],
    launchReady: record.isActive,
    updatedAt: record.updatedAt
  };
}

function mapAreaRecord(record: any, city: City): AreaPage {
  const fallbackBody = fallbackAreaBody(city.name, record.name);
  const fallbackFaq = fallbackAreaFaq(city.name, record.name);

  return {
    id: record.id,
    citySlug: city.slug,
    cityName: city.name,
    areaName: record.name,
    areaSlug: record.slug,
    pincode: record.pincode ?? undefined,
    priority: record.priority,
    isServiceable: record.isServiceable,
    heroHeadline: `Plumber Services in ${record.name}, ${city.name}`,
    metaTitle:
      record.metaTitle ??
      `Plumber in ${record.name}, ${city.name} | Same-Day Service | Plumberdost`,
    metaDescription:
      record.metaDescription ??
      `Book a verified plumber in ${record.name}, ${city.name} for leakage, blockage, toilet repair, tap fitting, and urgent plumbing support.`,
    bodyCopy: asStringArray(record.bodyCopy, fallbackBody),
    highlights: [
      `${city.responseTimeMinutes}-${city.responseTimeMinutes + 8} minute target across ${record.name}`,
      `Call and WhatsApp routing linked to the ${city.name} dispatch desk`,
      `Clear pricing bands before larger repair work begins`,
      `Fast handoff to relevant city and service pages`
    ],
    faq: asFaqArray(record.faq, fallbackFaq),
    updatedAt: record.updatedAt
  };
}

function mapServiceRecord(record: any, baseService?: Service): Service {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    shortDescription: record.shortDescription ?? baseService?.shortDescription ?? "",
    fullDescription: baseService?.fullDescription ?? [record.fullDescription].filter(Boolean),
    iconName: record.iconName ?? baseService?.iconName ?? "Wrench",
    priceMin: record.priceMin,
    priceMax: record.priceMax,
    durationHours: record.durationHours,
    isEmergencyEligible: record.isEmergencyEligible
  };
}

function createGeneratedCityServicePage(city: City, service: Service, record?: any): CityServicePage {
  const bodyFromJson = asStringArray(record?.customBodyJson, []);
  const bodyFromText = record?.customBody ? [record.customBody] : [];
  const baseCombo = getCityServicePage(city.slug, service.slug);

  return {
    id: record?.id ?? `${city.slug}-${service.slug}`,
    citySlug: city.slug,
    serviceSlug: service.slug,
    customH1: record?.customH1 ?? baseCombo?.customH1 ?? `${service.name} in ${city.name} | Fast Local Response`,
    customBody:
      bodyFromJson.length > 0
        ? bodyFromJson
        : bodyFromText.length > 0
          ? bodyFromText
          : (baseCombo?.customBody ?? [
              `${service.name} in ${city.name} helps customers solve high-intent plumbing issues with local response, clear price direction, and phone or WhatsApp booking.`,
              `This page connects ${city.name} searchers to relevant service details, area links, and dispatch steps instead of sending them to a generic national page.`
            ]),
    localPriceMin: record?.localPriceMin ?? baseCombo?.localPriceMin ?? service.priceMin,
    localPriceMax: record?.localPriceMax ?? baseCombo?.localPriceMax ?? service.priceMax,
    publish: record?.isPublished ?? baseCombo?.publish ?? true,
    updatedAt: record?.updatedAt
  };
}

const getCachedCityRecord = unstable_cache(
  async (citySlug: string) =>
    prisma.city.findUnique({
      where: { slug: citySlug },
      include: {
        neighbourhoods: {
          where: { isServiceable: true },
          orderBy: [{ priority: "asc" }, { name: "asc" }],
          take: 10
        }
      }
    }),
  ["managed-city"],
  { revalidate: CATALOG_REVALIDATE_SECONDS, tags: ["catalog", "cities"] }
);

export async function getManagedCity(citySlug: string) {
  const baseCity = getCity(citySlug);

  try {
    const cityRecord = await getCachedCityRecord(citySlug);
    return cityRecord?.isActive ? mapCityRecord(cityRecord, baseCity) : baseCity;
  } catch (error) {
    logCatalogFallback(`city:${citySlug}`, error);
    return baseCity;
  }
}

export async function getManagedCities() {
  try {
    const cityRecords = await prisma.city.findMany({
      where: { isActive: true },
      include: {
        neighbourhoods: {
          where: { isServiceable: true },
          orderBy: [{ priority: "asc" }, { name: "asc" }],
          take: 10
        }
      },
      orderBy: [{ priorityTier: "asc" }, { name: "asc" }]
    });

    if (cityRecords.length > 0) {
      return cityRecords.map((cityRecord) => mapCityRecord(cityRecord, getCity(cityRecord.slug)));
    }
  } catch (error) {
    logCatalogFallback("cities", error);
  }

  return getCities();
}

export async function getManagedStaticCities(limit = 100) {
  const cities = await getManagedCities();
  return cities.filter((city) => (city.priorityTier ?? 3) <= 1).slice(0, limit);
}

export async function getManagedService(serviceSlug: string) {
  const baseService = getService(serviceSlug);

  try {
    const serviceRecord = await prisma.service.findUnique({
      where: { slug: serviceSlug }
    });
    return serviceRecord?.isActive ? mapServiceRecord(serviceRecord, baseService) : baseService;
  } catch (error) {
    logCatalogFallback(`service:${serviceSlug}`, error);
    return baseService;
  }
}

export async function getManagedServices() {
  try {
    const serviceRecords = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" }
    });

    if (serviceRecords.length > 0) {
      return serviceRecords.map((record) => mapServiceRecord(record, getService(record.slug)));
    }
  } catch (error) {
    logCatalogFallback("services", error);
  }

  return getServices();
}

export async function getManagedServicesForCity(citySlug: string) {
  const city = await getManagedCity(citySlug);
  const services = await getManagedServices();

  if (!city) {
    return [];
  }

  try {
    const pricingRecords = await prisma.cityServicePage.findMany({
      where: { cityId: city.id }
    });

    return services.map((service) => {
      const pricingRecord = pricingRecords.find((item) => item.serviceId === service.id);

      return {
        ...service,
        priceMin: pricingRecord?.localPriceMin ?? service.priceMin,
        priceMax: pricingRecord?.localPriceMax ?? service.priceMax
      };
    });
  } catch (error) {
    logCatalogFallback(`services-for-city:${citySlug}`, error);
    return services;
  }
}

export async function getManagedCityAreas(citySlug: string) {
  return getManagedCityAreasByStatus(citySlug, true);
}

export async function getManagedAllCityAreas(citySlug: string) {
  return getManagedCityAreasByStatus(citySlug);
}

async function getManagedCityAreasByStatus(citySlug: string, serviceable?: boolean) {
  const city = await getManagedCity(citySlug);

  if (!city) {
    return [];
  }

  try {
    const areaRecords = await prisma.neighbourhood.findMany({
      where: { cityId: city.id, ...(typeof serviceable === "boolean" ? { isServiceable: serviceable } : {}) },
      orderBy: [{ priority: "asc" }, { name: "asc" }]
    });

    if (areaRecords.length > 0) {
      return areaRecords.map((areaRecord) => mapAreaRecord(areaRecord, city));
    }
  } catch (error) {
    logCatalogFallback(`areas:${citySlug}`, error);
  }

  return getCityAreas(citySlug);
}

export async function getManagedCityArea(citySlug: string, areaSlug: string) {
  const city = await getManagedCity(citySlug);

  if (!city) {
    return undefined;
  }

  try {
    const areaRecord = await prisma.neighbourhood.findFirst({
      where: { cityId: city.id, slug: areaSlug, isServiceable: true }
    });

    return areaRecord ? mapAreaRecord(areaRecord, city) : getCityArea(citySlug, areaSlug);
  } catch (error) {
    logCatalogFallback(`area:${citySlug}:${areaSlug}`, error);
    return getCityArea(citySlug, areaSlug);
  }
}

export async function getManagedCityServicePage(citySlug: string, serviceSlug: string) {
  const city = await getManagedCity(citySlug);
  const service = await getManagedService(serviceSlug);

  if (!city || !service) {
    return undefined;
  }

  try {
    const record = await prisma.cityServicePage.findUnique({
      where: {
        cityId_serviceId: {
          cityId: city.id,
          serviceId: service.id
        }
      }
    });

    if (record && !record.isPublished) {
      return undefined;
    }

    return createGeneratedCityServicePage(city, service, record);
  } catch (error) {
    logCatalogFallback(`city-service:${citySlug}:${serviceSlug}`, error);
    return createGeneratedCityServicePage(city, service);
  }
}

export async function getManagedCityServiceSitemapEntries() {
  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);
  return cities.flatMap((city) =>
    services.map((service) => ({
      city,
      service,
      updatedAt: city.updatedAt
    }))
  );
}
