import type { MetadataRoute } from "next";
import { getCities, getCityAreas, getServices } from "@/lib/domain/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://plumbri.ght";
  const cities = getCities();
  const services = getServices();

  return [
    "",
    "/cities",
    "/reviews",
    "/contact",
    "/book",
    "/about",
    "/partner-with-us",
    "/privacy-policy",
    "/terms",
    ...services.map((service) => `/services/${service.slug}`),
    ...cities.flatMap((city) => [
      `/${city.slug}/plumber-services`,
      `/${city.slug}/emergency-plumber`,
      ...services.map((service) => `/${city.slug}/${service.slug}`),
      ...getCityAreas(city.slug).map((area) => `/${city.slug}/areas/${area.areaSlug}`)
    ])
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
}
