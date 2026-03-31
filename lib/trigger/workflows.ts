import type { LeadRecord } from "@/types/domain";
import { callTrackingAdapter, crmAdapter, smsAdapter, whatsappAdapter } from "@/lib/integrations/providers";

export async function orchestrateLeadSubmission(lead: LeadRecord) {
  const crm = await crmAdapter.createLead(lead);

  await Promise.all([
    smsAdapter.sendLeadConfirmation(lead),
    whatsappAdapter.sendLeadConfirmation(lead)
  ]);

  if (lead.urgency === "urgent") {
    await callTrackingAdapter.triggerUrgentCallback(lead);
  }

  return crm.externalId;
}

export async function orchestrateMissedCallCallback(payload: {
  mobile: string;
  citySlug: string;
}) {
  await Promise.all([
    callTrackingAdapter.logMissedCall(payload),
    smsAdapter.sendMissedCallFallback(payload)
  ]);
}
