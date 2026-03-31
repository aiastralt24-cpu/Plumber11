import type {
  CRMAdapter,
  CallTrackingAdapter,
  ReviewImportAdapter,
  SmsAdapter,
  WhatsAppAdapter
} from "@/lib/integrations/contracts";
import { getCityReviews } from "@/lib/domain/catalog";
import type { LeadRecord } from "@/types/domain";

async function log(label: string, payload: unknown) {
  console.info(`[integration:${label}]`, payload);
}

export const crmAdapter: CRMAdapter = {
  async createLead(lead) {
    await log("zoho:createLead", lead);
    return { externalId: `zoho-${lead.id}` };
  },
  async syncLeadStatus(externalId, status) {
    await log("zoho:syncLeadStatus", { externalId, status });
  }
};

export const callTrackingAdapter: CallTrackingAdapter = {
  async triggerUrgentCallback(lead: LeadRecord) {
    await log("exotel:triggerUrgentCallback", lead);
  },
  async logMissedCall(payload) {
    await log("exotel:missedCall", payload);
  }
};

export const whatsappAdapter: WhatsAppAdapter = {
  async sendLeadConfirmation(lead) {
    await log("wati:leadConfirmation", lead);
  },
  async sendReviewRequest(lead, reviewUrl) {
    await log("wati:reviewRequest", { leadId: lead.id, reviewUrl });
  }
};

export const smsAdapter: SmsAdapter = {
  async sendLeadConfirmation(lead) {
    await log("msg91:leadConfirmation", lead);
  },
  async sendMissedCallFallback(payload) {
    await log("msg91:missedCallFallback", payload);
  }
};

export const reviewImportAdapter: ReviewImportAdapter = {
  async importCityReviews(citySlug) {
    await log("gbp:import", { citySlug });
    return getCityReviews(citySlug);
  }
};
