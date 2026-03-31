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
  const [leadCount, leadsByStatus, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({
      by: ["status"],
      _count: {
        status: true
      }
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        city: { select: { name: true, slug: true } },
        service: { select: { name: true, slug: true } }
      }
    })
  ]);

  return {
    leadCount,
    leadsByStatus,
    recentLeads
  };
}
