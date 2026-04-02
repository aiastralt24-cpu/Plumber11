import { prisma } from "@/lib/db";
import {
  getCities,
  getCity,
  getCityServicePage,
  getService,
  getServices
} from "@/lib/domain/catalog";

export async function getManagedCity(citySlug: string) {
  const baseCity = getCity(citySlug);

  if (!baseCity) {
    return undefined;
  }

  const cityRecord = await prisma.city.findUnique({
    where: { slug: citySlug }
  });

  if (!cityRecord) {
    return baseCity;
  }

  return {
    ...baseCity,
    phoneNumber: cityRecord.phoneNumber,
    whatsappNumber: cityRecord.whatsappNumber,
    responseTimeMinutes: cityRecord.responseTimeMinutes,
    jobsCompleted: cityRecord.jobsCompleted,
    metaTitle: cityRecord.metaTitle ?? baseCity.metaTitle,
    metaDescription: cityRecord.metaDescription ?? baseCity.metaDescription,
    launchReady: cityRecord.isActive
  };
}

export async function getManagedService(serviceSlug: string) {
  const baseService = getService(serviceSlug);

  if (!baseService) {
    return undefined;
  }

  const serviceRecord = await prisma.service.findUnique({
    where: { slug: serviceSlug }
  });

  if (!serviceRecord) {
    return baseService;
  }

  return {
    ...baseService,
    name: serviceRecord.name,
    shortDescription: serviceRecord.shortDescription ?? baseService.shortDescription,
    iconName: serviceRecord.iconName ?? baseService.iconName,
    priceMin: serviceRecord.priceMin,
    priceMax: serviceRecord.priceMax,
    durationHours: serviceRecord.durationHours,
    isEmergencyEligible: serviceRecord.isEmergencyEligible
  };
}

export async function getManagedServicesForCity(citySlug: string) {
  const city = await getManagedCity(citySlug);
  const services = getServices();

  if (!city) {
    return [];
  }

  const [serviceRecords, pricingRecords] = await Promise.all([
    prisma.service.findMany({
      where: { slug: { in: services.map((service) => service.slug) } }
    }),
    prisma.cityServicePage.findMany({
      where: { cityId: city.id }
    })
  ]);

  return services.map((service) => {
    const serviceRecord = serviceRecords.find((item) => item.slug === service.slug);
    const pricingRecord = pricingRecords.find((item) => item.serviceId === service.id);

    return {
      ...service,
      name: serviceRecord?.name ?? service.name,
      shortDescription: serviceRecord?.shortDescription ?? service.shortDescription,
      iconName: serviceRecord?.iconName ?? service.iconName,
      priceMin: pricingRecord?.localPriceMin ?? serviceRecord?.priceMin ?? service.priceMin,
      priceMax: pricingRecord?.localPriceMax ?? serviceRecord?.priceMax ?? service.priceMax,
      durationHours: serviceRecord?.durationHours ?? service.durationHours,
      isEmergencyEligible: serviceRecord?.isEmergencyEligible ?? service.isEmergencyEligible
    };
  });
}

export async function getManagedCityServicePage(citySlug: string, serviceSlug: string) {
  const baseCombo = getCityServicePage(citySlug, serviceSlug);
  const city = await getManagedCity(citySlug);
  const service = await getManagedService(serviceSlug);

  if (!baseCombo || !city || !service) {
    return undefined;
  }

  const record = await prisma.cityServicePage.findUnique({
    where: {
      cityId_serviceId: {
        cityId: city.id,
        serviceId: service.id
      }
    }
  });

  if (!record) {
    return baseCombo;
  }

  return {
    ...baseCombo,
    customH1: record.customH1 ?? baseCombo.customH1,
    customBody: record.customBody ? [record.customBody] : baseCombo.customBody,
    localPriceMin: record.localPriceMin ?? baseCombo.localPriceMin,
    localPriceMax: record.localPriceMax ?? baseCombo.localPriceMax,
    publish: record.isPublished
  };
}

export async function getManagedCities() {
  const cities = getCities();
  const cityRecords = await prisma.city.findMany({
    where: { slug: { in: cities.map((city) => city.slug) } }
  });

  return cities.map((city) => {
    const cityRecord = cityRecords.find((item) => item.slug === city.slug);

    return cityRecord
      ? {
          ...city,
          phoneNumber: cityRecord.phoneNumber,
          whatsappNumber: cityRecord.whatsappNumber,
          responseTimeMinutes: cityRecord.responseTimeMinutes,
          jobsCompleted: cityRecord.jobsCompleted,
          metaTitle: cityRecord.metaTitle ?? city.metaTitle,
          metaDescription: cityRecord.metaDescription ?? city.metaDescription,
          launchReady: cityRecord.isActive
        }
      : city;
  });
}
