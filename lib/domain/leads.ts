import { prisma } from "@/lib/db";
import { getCity, getService } from "@/lib/domain/catalog";
import type { LeadRecord, LeadSubmission } from "@/types/domain";

function toLeadRecord(lead: {
  id: string;
  name: string;
  mobile: string;
  area: string | null;
  urgency: "urgent" | "week" | "planned";
  photoUrl: string | null;
  sourcePage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  sourceChannel: "call" | "whatsapp" | "form" | "callback";
  status: "new" | "contacted" | "booked" | "completed" | "lost";
  createdAt: Date;
  city: { slug: string };
  service: { slug: string };
}): LeadRecord {
  return {
    id: lead.id,
    name: lead.name,
    mobile: lead.mobile,
    citySlug: lead.city.slug,
    area: lead.area ?? "",
    serviceSlug: lead.service.slug,
    urgency: lead.urgency,
    photoUrl: lead.photoUrl ?? undefined,
    sourcePage: lead.sourcePage ?? "",
    utmSource: lead.utmSource ?? undefined,
    utmMedium: lead.utmMedium ?? undefined,
    utmCampaign: lead.utmCampaign ?? undefined,
    sourceChannel: lead.sourceChannel,
    status: lead.status,
    createdAt: lead.createdAt.toISOString()
  };
}

export async function createLeadSubmission(input: LeadSubmission): Promise<LeadRecord> {
  const city = getCity(input.citySlug);
  const service = getService(input.serviceSlug);

  if (!city || !service) {
    throw new Error("Invalid city or service selection.");
  }

  await prisma.city.upsert({
    where: { slug: city.slug },
    update: {
      name: city.name,
      state: city.state,
      phoneNumber: city.phoneNumber,
      whatsappNumber: city.whatsappNumber,
      responseTimeMinutes: city.responseTimeMinutes,
      jobsCompleted: city.jobsCompleted,
      isActive: city.launchReady
    },
    create: {
      id: city.id,
      slug: city.slug,
      name: city.name,
      state: city.state,
      phoneNumber: city.phoneNumber,
      whatsappNumber: city.whatsappNumber,
      responseTimeMinutes: city.responseTimeMinutes,
      jobsCompleted: city.jobsCompleted,
      isActive: city.launchReady
    }
  });

  await prisma.service.upsert({
    where: { slug: service.slug },
    update: {
      name: service.name,
      shortDescription: service.shortDescription,
      iconName: service.iconName,
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      durationHours: service.durationHours,
      isEmergencyEligible: service.isEmergencyEligible,
      isActive: true
    },
    create: {
      id: service.id,
      slug: service.slug,
      name: service.name,
      shortDescription: service.shortDescription,
      iconName: service.iconName,
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      durationHours: service.durationHours,
      isEmergencyEligible: service.isEmergencyEligible,
      isActive: true
    }
  });

  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      mobile: input.mobile,
      cityId: city.id,
      area: input.area,
      serviceId: service.id,
      urgency: input.urgency,
      photoUrl: input.photoUrl || null,
      sourceChannel: input.sourceChannel,
      sourcePage: input.sourcePage,
      utmSource: input.utmSource || null,
      utmMedium: input.utmMedium || null,
      utmCampaign: input.utmCampaign || null
    },
    include: {
      city: { select: { slug: true } },
      service: { select: { slug: true } }
    }
  });

  return toLeadRecord(lead);
}

export async function updateLeadCrmId(leadId: string, crmLeadId: string) {
  await prisma.lead.update({
    where: { id: leadId },
    data: { crmLeadId }
  });
}

export async function getAdminLeadDashboard() {
  const [leadCount, leadsByStatus, leadsBySource, leadsByCity, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({
      by: ["status"],
      _count: {
        status: true
      }
    }),
    prisma.lead.groupBy({
      by: ["sourceChannel"],
      _count: {
        sourceChannel: true
      }
    }),
    prisma.lead.groupBy({
      by: ["cityId"],
      _count: {
        cityId: true
      }
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        city: { select: { name: true, slug: true } },
        service: { select: { name: true, slug: true } }
      }
    })
  ]);

  const urgentLeadCount = await prisma.lead.count({
    where: { urgency: "urgent" }
  });

  const newLeadCount = leadsByStatus.find((item) => item.status === "new")?._count.status ?? 0;

  return {
    leadCount,
    urgentLeadCount,
    newLeadCount,
    leadsByStatus,
    leadsBySource,
    leadsByCity,
    recentLeads
  };
}
