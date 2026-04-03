import type { MetadataRoute } from "next";
import { getCities, getCityAreas, getServices } from "@/lib/domain/catalog";
import { siteConfig } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
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
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority:
      path === ""
        ? 1
        : path.startsWith("/services") || path.endsWith("/plumber-services")
          ? 0.8
          : 0.6
  }));
}
