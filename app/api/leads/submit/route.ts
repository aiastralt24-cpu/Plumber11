import { NextResponse } from "next/server";
import { leadSubmissionSchema } from "@/lib/domain/forms";
import { createLeadSubmission, updateLeadCrmId } from "@/lib/domain/leads";
import { orchestrateLeadSubmission } from "@/lib/trigger/workflows";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  const lead = await createLeadSubmission({
    name: parsed.data.name,
    mobile: parsed.data.mobile,
    citySlug: parsed.data.citySlug,
    area: parsed.data.area,
    serviceSlug: parsed.data.serviceSlug,
    urgency: parsed.data.urgency,
    photoUrl: parsed.data.photoUrl,
    sourcePage: parsed.data.sourcePage,
    utmSource: parsed.data.utmSource,
    utmMedium: parsed.data.utmMedium,
    utmCampaign: parsed.data.utmCampaign,
    sourceChannel: parsed.data.sourceChannel
  });

  const crmLeadId = await orchestrateLeadSubmission(lead);
  await updateLeadCrmId(lead.id, crmLeadId);

  return NextResponse.json({
    success: true,
    lead_id: lead.id,
    message: "We will call you in 5 minutes."
  });
}
