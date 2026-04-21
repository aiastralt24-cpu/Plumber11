import { notFound } from "next/navigation";
import {
  SITEMAP_CHUNK_SIZE,
  createUrlSetXml,
  getCityServiceSitemapUrls,
  getCitySitemapUrls,
  getEmergencySitemapUrls,
  getStaticSitemapUrls,
  type SitemapUrl
} from "@/lib/seo/sitemap-xml";
import {
  getManagedCities,
  getManagedCityAreas,
  getManagedServices
} from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

function xmlResponse(urls: SitemapUrl[]) {
  return new Response(createUrlSetXml(urls), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=21600"
    }
  });
}

function getChunkNumber(sitemap: string, prefix: string) {
  const match = sitemap.match(new RegExp(`^${prefix}-(\\d+)\\.xml$`));
  return match ? Number(match[1]) : undefined;
}

function sliceChunk<T>(items: T[], chunkNumber: number) {
  const start = (chunkNumber - 1) * SITEMAP_CHUNK_SIZE;
  return items.slice(start, start + SITEMAP_CHUNK_SIZE);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sitemap: string }> }
) {
  const { sitemap } = await params;

  if (sitemap === "static.xml") {
    const services = await getManagedServices();
    return xmlResponse([
      ...getStaticSitemapUrls(),
      ...services.map((service) => ({
        path: `/services/${service.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8
      }))
    ]);
  }

  const cities = await getManagedCities();

  if (sitemap === "cities.xml") {
    return xmlResponse(getCitySitemapUrls(cities));
  }

  if (sitemap === "emergency.xml") {
    return xmlResponse(getEmergencySitemapUrls(cities));
  }

  const areaChunk = getChunkNumber(sitemap, "areas");
  if (areaChunk) {
    const areaGroups = await Promise.all(cities.map((city) => getManagedCityAreas(city.slug)));
    const urls = cities.flatMap((city, index) =>
      areaGroups[index].map((area) => ({
        path: `/${city.slug}/areas/${area.areaSlug}`,
        lastModified: area.updatedAt ?? city.updatedAt,
        changeFrequency: "weekly" as const,
        priority: (area.priority ?? 10) <= 3 ? 0.65 : 0.5
      }))
    );

    return xmlResponse(sliceChunk(urls, areaChunk));
  }

  const cityServicesChunk = getChunkNumber(sitemap, "city-services");
  if (cityServicesChunk) {
    const services = await getManagedServices();
    return xmlResponse(sliceChunk(getCityServiceSitemapUrls(cities, services), cityServicesChunk));
  }

  notFound();
}
