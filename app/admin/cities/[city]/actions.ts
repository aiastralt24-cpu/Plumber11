"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getCity, getCityAreas, getService, getServices } from "@/lib/domain/catalog";
import { prisma } from "@/lib/db";

async function assertAdminAccess() {
  const session = await auth();
  const localPreviewMode =
    process.env.NODE_ENV !== "production" && process.env.ALLOW_ADMIN_BYPASS === "true";

  if (!session && !localPreviewMode) {
    throw new Error("Unauthorized");
  }
}

function revalidateCityMarketingRoutes(citySlug: string) {
  revalidatePath(`/${citySlug}/plumber-services`);
  revalidatePath(`/${citySlug}/emergency-plumber`);

  for (const service of getServices()) {
    revalidatePath(`/${citySlug}/${service.slug}`);
  }

  for (const area of getCityAreas(citySlug)) {
    revalidatePath(`/${citySlug}/areas/${area.areaSlug}`);
  }
}

export async function updateCitySettings(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const city = getCity(citySlug);

  if (!city) {
    throw new Error("City not found");
  }

  await prisma.city.upsert({
    where: { slug: city.slug },
    update: {
      phoneNumber: String(formData.get("phoneNumber") ?? city.phoneNumber),
      whatsappNumber: String(formData.get("whatsappNumber") ?? city.whatsappNumber),
      responseTimeMinutes: Number(formData.get("responseTimeMinutes") ?? city.responseTimeMinutes),
      isActive: formData.get("launchReady") === "on",
      jobsCompleted: Number(formData.get("jobsCompleted") ?? city.jobsCompleted)
    },
    create: {
      id: city.id,
      slug: city.slug,
      name: city.name,
      state: city.state,
      phoneNumber: String(formData.get("phoneNumber") ?? city.phoneNumber),
      whatsappNumber: String(formData.get("whatsappNumber") ?? city.whatsappNumber),
      responseTimeMinutes: Number(formData.get("responseTimeMinutes") ?? city.responseTimeMinutes),
      jobsCompleted: Number(formData.get("jobsCompleted") ?? city.jobsCompleted),
      isActive: formData.get("launchReady") === "on"
    }
  });

  revalidatePath(`/admin/cities/${city.slug}`);
  revalidatePath("/admin/cities");
  revalidateCityMarketingRoutes(city.slug);
}

export async function updateCityPricing(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const serviceSlug = String(formData.get("serviceSlug") ?? "");
  const city = getCity(citySlug);
  const service = getService(serviceSlug);

  if (!city || !service) {
    throw new Error("City or service not found");
  }

  await prisma.cityServicePage.upsert({
    where: {
      cityId_serviceId: {
        cityId: city.id,
        serviceId: service.id
      }
    },
    update: {
      localPriceMin: Number(formData.get("localPriceMin") ?? service.priceMin),
      localPriceMax: Number(formData.get("localPriceMax") ?? service.priceMax),
      isPublished: true
    },
    create: {
      id: `${city.slug}-${service.slug}`,
      cityId: city.id,
      serviceId: service.id,
      customH1: `${service.name} in ${city.name} | Fast Local Response`,
      customBody: "",
      localPriceMin: Number(formData.get("localPriceMin") ?? service.priceMin),
      localPriceMax: Number(formData.get("localPriceMax") ?? service.priceMax),
      isPublished: true
    }
  });

  revalidatePath(`/admin/cities/${city.slug}`);
  revalidatePath(`/${city.slug}/plumber-services`);
  revalidatePath(`/${city.slug}/${service.slug}`);
}

export async function seedCityPricing(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const city = getCity(citySlug);

  if (!city) {
    throw new Error("City not found");
  }

  const services = getServices();

  await prisma.$transaction(
    services.map((service) =>
      prisma.cityServicePage.upsert({
        where: {
          cityId_serviceId: {
            cityId: city.id,
            serviceId: service.id
          }
        },
        update: {},
        create: {
          id: `${city.slug}-${service.slug}`,
          cityId: city.id,
          serviceId: service.id,
          customH1: `${service.name} in ${city.name} | Fast Local Response`,
          customBody: "",
          localPriceMin: service.priceMin,
          localPriceMax: service.priceMax + 200,
          isPublished: true
        }
      })
    )
  );

  revalidatePath(`/admin/cities/${city.slug}`);
  revalidatePath("/admin/cities");
  revalidateCityMarketingRoutes(city.slug);
}
