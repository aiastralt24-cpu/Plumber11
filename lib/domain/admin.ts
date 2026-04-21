import { prisma } from "@/lib/db";
import { getFeaturedReviews } from "@/lib/domain/catalog";
import { getManagedCities, getManagedServices } from "@/lib/domain/catalog-managed";

export async function getAdminOverviewStats() {
  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);
  const reviews = getFeaturedReviews();
  const [leadCount, urgentLeadCount] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { urgency: "urgent" } })
  ]);

  return {
    leadCount,
    urgentLeadCount,
    cityCount: cities.length,
    launchReadyCityCount: cities.filter((city) => city.launchReady).length,
    serviceCount: services.length,
    featuredReviewCount: reviews.length
  };
}

export async function getAdminLeadsPageData() {
  const [leads, statuses, sources] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        city: { select: { name: true, slug: true } },
        service: { select: { name: true, slug: true } },
        plumber: { select: { name: true } }
      }
    }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true }
    }),
    prisma.lead.groupBy({
      by: ["sourceChannel"],
      _count: { sourceChannel: true }
    })
  ]);

  return {
    leads,
    statuses,
    sources
  };
}

export async function getAdminAnalyticsPageData() {
  const [byStatus, bySource, byCity, byService] = await Promise.all([
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true }
    }),
    prisma.lead.groupBy({
      by: ["sourceChannel"],
      _count: { sourceChannel: true }
    }),
    prisma.lead.groupBy({
      by: ["cityId"],
      _count: { cityId: true }
    }),
    prisma.lead.groupBy({
      by: ["serviceId"],
      _count: { serviceId: true }
    })
  ]);

  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);

  return {
    byStatus,
    bySource,
    byCity: cities
      .map((city) => ({
        city,
        leadCount: byCity.find((item) => item.cityId === city.id)?._count.cityId ?? 0
      }))
      .sort((a, b) => b.leadCount - a.leadCount),
    byService: services
      .map((service) => ({
        service,
        leadCount: byService.find((item) => item.serviceId === service.id)?._count.serviceId ?? 0
      }))
      .sort((a, b) => b.leadCount - a.leadCount)
  };
}

export async function getAdminCitiesPageData() {
  const cities = await getManagedCities();
  const [leadGroups, plumberGroups] = await Promise.all([
    prisma.lead.groupBy({
      by: ["cityId"],
      _count: { cityId: true }
    }),
    prisma.plumber.groupBy({
      by: ["cityId"],
      _count: { cityId: true }
    })
  ]);

  return cities
    .map((city) => ({
      ...city,
      leadCount: leadGroups.find((item) => item.cityId === city.id)?._count.cityId ?? 0,
      rosterCount: plumberGroups.find((item) => item.cityId === city.id)?._count.cityId ?? 0
    }))
    .sort((a, b) => b.leadCount - a.leadCount || Number(b.launchReady) - Number(a.launchReady));
}

export async function getAdminServicesPageData() {
  const services = await getManagedServices();
  const leadGroups = await prisma.lead.groupBy({
    by: ["serviceId"],
    _count: { serviceId: true }
  });

  return services
    .map((service) => ({
      ...service,
      leadCount: leadGroups.find((item) => item.serviceId === service.id)?._count.serviceId ?? 0
    }))
    .sort((a, b) => b.leadCount - a.leadCount);
}

export async function getAdminReviewsPageData() {
  return getFeaturedReviews();
}
