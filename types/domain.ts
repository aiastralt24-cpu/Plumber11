export type Urgency = "urgent" | "week" | "planned";
export type LeadStatus = "new" | "contacted" | "booked" | "completed" | "lost";
export type SourceChannel = "call" | "whatsapp" | "form" | "callback";
export type VerificationStatus = "pending" | "verified" | "suspended";

export type FAQ = {
  question: string;
  answer: string;
};

export type PricingBand = {
  priceMin: number;
  priceMax: number;
  durationHours: number;
};

export type Review = {
  id: string;
  citySlug: string;
  serviceSlug?: string;
  reviewerName: string;
  reviewerArea: string;
  rating: number;
  reviewText: string;
  date: string;
  isFeatured: boolean;
};

export type Neighbourhood = {
  id: string;
  citySlug: string;
  name: string;
  slug: string;
  pincode: string;
  isServiceable: boolean;
};

export type City = {
  id: string;
  slug: string;
  name: string;
  state: string;
  priorityTier?: number;
  phoneNumber: string;
  whatsappNumber: string;
  responseTimeMinutes: number;
  jobsCompleted: number;
  plumbersOnNetwork: number;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  neighbourhoods: string[];
  heroHeadline: string;
  heroSubheadline: string;
  bodyCopy: string[];
  faq: FAQ[];
  featuredReviewIds: string[];
  launchReady: boolean;
  updatedAt?: string | Date;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string[];
  iconName: string;
  priceMin: number;
  priceMax: number;
  durationHours: number;
  isEmergencyEligible: boolean;
};

export type CityServicePage = {
  id: string;
  citySlug: string;
  serviceSlug: string;
  customH1: string;
  customBody: string[];
  localPriceMin: number;
  localPriceMax: number;
  publish: boolean;
  updatedAt?: string | Date;
};

export type AreaPage = {
  id: string;
  citySlug: string;
  cityName: string;
  areaName: string;
  areaSlug: string;
  pincode?: string;
  priority?: number;
  isServiceable?: boolean;
  heroHeadline: string;
  metaTitle: string;
  metaDescription: string;
  bodyCopy: string[];
  highlights: string[];
  faq: FAQ[];
  updatedAt?: string | Date;
};

export type ServiceCoverageZone = {
  id: string;
  citySlug: string;
  areaName: string;
  pincode: string;
  responseTimeMinutes: number;
  isServiceable: boolean;
};

export type LeadSubmission = {
  name: string;
  mobile: string;
  citySlug: string;
  area: string;
  serviceSlug: string;
  urgency: Urgency;
  photoUrl?: string;
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  sourceChannel: SourceChannel;
};

export type LeadRecord = LeadSubmission & {
  id: string;
  status: LeadStatus;
  createdAt: string;
};
