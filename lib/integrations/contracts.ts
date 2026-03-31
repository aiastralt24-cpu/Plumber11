import type { LeadRecord, Review } from "@/types/domain";

export interface CRMAdapter {
  createLead(lead: LeadRecord): Promise<{ externalId: string }>;
  syncLeadStatus(externalId: string, status: LeadRecord["status"]): Promise<void>;
}

export interface CallTrackingAdapter {
  triggerUrgentCallback(lead: LeadRecord): Promise<void>;
  logMissedCall(payload: { mobile: string; citySlug: string }): Promise<void>;
}

export interface WhatsAppAdapter {
  sendLeadConfirmation(lead: LeadRecord): Promise<void>;
  sendReviewRequest(lead: LeadRecord, reviewUrl: string): Promise<void>;
}

export interface SmsAdapter {
  sendLeadConfirmation(lead: LeadRecord): Promise<void>;
  sendMissedCallFallback(payload: { mobile: string; citySlug: string }): Promise<void>;
}

export interface ReviewImportAdapter {
  importCityReviews(citySlug: string): Promise<Review[]>;
}
