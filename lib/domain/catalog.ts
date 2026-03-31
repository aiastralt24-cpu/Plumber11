import { comboPages, coverageZones, launchCities, reviews, services } from "@/lib/content/seed";

export function getCities() {
  return launchCities;
}

export function getCity(slug: string) {
  return launchCities.find((city) => city.slug === slug);
}

export function getServices() {
  return services;
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCityServicePage(citySlug: string, serviceSlug: string) {
  return comboPages.find(
    (page) => page.citySlug === citySlug && page.serviceSlug === serviceSlug && page.publish
  );
}

export function getCityReviews(citySlug: string) {
  return reviews.filter((review) => review.citySlug === citySlug);
}

export function getFeaturedReviews() {
  return reviews.filter((review) => review.isFeatured);
}

export function getCoverageByPincode(pincode: string) {
  return coverageZones.find((zone) => zone.pincode === pincode);
}
