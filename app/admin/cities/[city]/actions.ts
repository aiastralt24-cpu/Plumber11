"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getManagedAllCityAreas, getManagedCity, getManagedService, getManagedServices } from "@/lib/domain/catalog-managed";
import { prisma } from "@/lib/db";

async function assertAdminAccess() {
  const session = await auth();
  const localPreviewMode =
    process.env.NODE_ENV !== "production" && process.env.ALLOW_ADMIN_BYPASS === "true";

  if (!session && !localPreviewMode) {
    throw new Error("Unauthorized");
  }
}

async function revalidateCityMarketingRoutes(citySlug: string) {
  revalidatePath(`/${citySlug}/plumber-services`);
  revalidatePath(`/${citySlug}/emergency-plumber`);
  revalidatePath("/sitemap.xml");

  const [services, areas] = await Promise.all([
    getManagedServices(),
    getManagedAllCityAreas(citySlug)
  ]);

  for (const service of services) {
    revalidatePath(`/${citySlug}/${service.slug}`);
  }

  for (const area of areas) {
    revalidatePath(`/${citySlug}/areas/${area.areaSlug}`);
  }
}

export async function updateCitySettings(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const city = await getManagedCity(citySlug);

  if (!city) {
    throw new Error("City not found");
  }

  await prisma.city.upsert({
    where: { slug: city.slug },
    update: {
      phoneNumber: String(formData.get("phoneNumber") ?? city.phoneNumber),
      whatsappNumber: String(formData.get("whatsappNumber") ?? city.whatsappNumber),
      responseTimeMinutes: Number(formData.get("responseTimeMinutes") ?? city.responseTimeMinutes),
      jobsCompleted: Number(formData.get("jobsCompleted") ?? city.jobsCompleted),
      plumbersOnNetwork: Number(formData.get("plumbersOnNetwork") ?? city.plumbersOnNetwork),
      priorityTier: Number(formData.get("priorityTier") ?? city.priorityTier ?? 3),
      metaTitle: String(formData.get("metaTitle") ?? city.metaTitle),
      metaDescription: String(formData.get("metaDescription") ?? city.metaDescription),
      isActive: formData.get("launchReady") === "on"
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
      plumbersOnNetwork: Number(formData.get("plumbersOnNetwork") ?? city.plumbersOnNetwork),
      priorityTier: Number(formData.get("priorityTier") ?? city.priorityTier ?? 3),
      metaTitle: String(formData.get("metaTitle") ?? city.metaTitle),
      metaDescription: String(formData.get("metaDescription") ?? city.metaDescription),
      isActive: formData.get("launchReady") === "on"
    }
  });

  revalidatePath(`/admin/cities/${city.slug}`);
  revalidatePath("/admin/cities");
  await revalidateCityMarketingRoutes(city.slug);
}

export async function updateAreaSettings(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const areaSlug = String(formData.get("areaSlug") ?? "");
  const city = await getManagedCity(citySlug);

  if (!city) {
    throw new Error("City not found");
  }

  await prisma.neighbourhood.update({
    where: {
      cityId_slug: {
        cityId: city.id,
        slug: areaSlug
      }
    },
    data: {
      isServiceable: formData.get("isServiceable") === "on",
      priority: Number(formData.get("priority") ?? 10),
      metaTitle: String(formData.get("metaTitle") ?? ""),
      metaDescription: String(formData.get("metaDescription") ?? "")
    }
  });

  revalidatePath(`/admin/cities/${city.slug}`);
  await revalidateCityMarketingRoutes(city.slug);
}

export async function updateCityPricing(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const serviceSlug = String(formData.get("serviceSlug") ?? "");
  const city = await getManagedCity(citySlug);
  const service = await getManagedService(serviceSlug);

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
      isPublished: formData.get("isPublished") === "on",
      publishedAt: formData.get("isPublished") === "on" ? new Date() : null
    },
    create: {
      cityId: city.id,
      serviceId: service.id,
      customH1: `${service.name} in ${city.name} | Fast Local Response`,
      customBody: "",
      localPriceMin: Number(formData.get("localPriceMin") ?? service.priceMin),
      localPriceMax: Number(formData.get("localPriceMax") ?? service.priceMax),
      isPublished: formData.get("isPublished") === "on",
      publishedAt: formData.get("isPublished") === "on" ? new Date() : null
    }
  });

  revalidatePath(`/admin/cities/${city.slug}`);
  revalidatePath(`/${city.slug}/plumber-services`);
  revalidatePath(`/${city.slug}/${service.slug}`);
  revalidatePath("/sitemap.xml");
}

export async function seedCityPricing(formData: FormData) {
  await assertAdminAccess();

  const citySlug = String(formData.get("citySlug") ?? "");
  const city = await getManagedCity(citySlug);

  if (!city) {
    throw new Error("City not found");
  }

  const services = await getManagedServices();

  await prisma.$transaction(
    services.map((service) =>
      prisma.cityServicePage.upsert({
        where: {
          cityId_serviceId: {
            cityId: city.id,
            serviceId: service.id
          }
        },
        update: {
          isPublished: true
        },
        create: {
          cityId: city.id,
          serviceId: service.id,
          customH1: `${service.name} in ${city.name} | Fast Local Response`,
          customBody: "",
          localPriceMin: service.priceMin,
          localPriceMax: service.priceMax + 200,
          isPublished: true,
          publishedAt: new Date()
        }
      })
    )
  );

  revalidatePath(`/admin/cities/${city.slug}`);
  revalidatePath("/admin/cities");
  await revalidateCityMarketingRoutes(city.slug);
}
