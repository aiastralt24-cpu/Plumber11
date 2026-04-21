import type { City, Service } from "@/types/domain";
import { siteConfig } from "@/lib/seo/site-config";

export const SITEMAP_CHUNK_SIZE = 5000;

export type SitemapUrl = {
  path: string;
  lastModified?: Date | string;
  changeFrequency?: "daily" | "weekly" | "monthly";
  priority?: number;
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(value?: Date | string) {
  if (!value) {
    return new Date().toISOString();
  }

  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function createSitemapIndexXml(paths: string[]) {
  const entries = paths
    .map(
      (path) => `<sitemap>
  <loc>${escapeXml(absoluteUrl(path))}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

export function createUrlSetXml(urls: SitemapUrl[]) {
  const entries = urls
    .map((url) => {
      const parts = [
        "<url>",
        `  <loc>${escapeXml(absoluteUrl(url.path))}</loc>`,
        `  <lastmod>${formatDate(url.lastModified)}</lastmod>`
      ];

      if (url.changeFrequency) {
        parts.push(`  <changefreq>${url.changeFrequency}</changefreq>`);
      }

      if (url.priority) {
        parts.push(`  <priority>${url.priority}</priority>`);
      }

      parts.push("</url>");
      return parts.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

export function getStaticSitemapUrls(): SitemapUrl[] {
  return [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/cities", changeFrequency: "weekly", priority: 0.8 },
    { path: "/services", changeFrequency: "weekly", priority: 0.8 },
    { path: "/reviews", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/book", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/verification-process", changeFrequency: "monthly", priority: 0.5 },
    { path: "/pricing-policy", changeFrequency: "monthly", priority: 0.5 },
    { path: "/review-policy", changeFrequency: "monthly", priority: 0.5 },
    { path: "/partner-with-us", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.4 },
    { path: "/terms", changeFrequency: "monthly", priority: 0.4 }
  ];
}

export function getCitySitemapUrls(cities: City[]): SitemapUrl[] {
  return cities.map((city) => ({
    path: `/${city.slug}/plumber-services`,
    lastModified: city.updatedAt,
    changeFrequency: "weekly",
    priority: (city.priorityTier ?? 3) <= 1 ? 0.9 : 0.6
  }));
}

export function getEmergencySitemapUrls(cities: City[]): SitemapUrl[] {
  return cities.map((city) => ({
    path: `/${city.slug}/emergency-plumber`,
    lastModified: city.updatedAt,
    changeFrequency: "weekly",
    priority: (city.priorityTier ?? 3) <= 1 ? 0.85 : 0.6
  }));
}

export function getCityServiceSitemapUrls(cities: City[], services: Service[]): SitemapUrl[] {
  return cities.flatMap((city) =>
    services.map((service) => ({
      path: `/${city.slug}/${service.slug}`,
      lastModified: city.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75
    }))
  );
}
