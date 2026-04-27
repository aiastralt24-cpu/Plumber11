import {
  SITEMAP_CHUNK_SIZE,
  createSitemapIndexXml
} from "@/lib/seo/sitemap-xml";
import {
  getManagedCities,
  getManagedCityAreas,
  getManagedServices
} from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

function xmlResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=21600"
    }
  });
}

export async function GET() {
  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);
  const areaGroups = await Promise.all(cities.map((city) => getManagedCityAreas(city.slug)));
  const areaCount = areaGroups.reduce((total, areas) => total + areas.length, 0);
  const cityServiceCount = cities.length * services.length;
  const areaChunks = Math.max(1, Math.ceil(areaCount / SITEMAP_CHUNK_SIZE));
  const cityServiceChunks = Math.max(1, Math.ceil(cityServiceCount / SITEMAP_CHUNK_SIZE));
  const paths = [
    "/sitemaps/static",
    "/sitemaps/cities",
    "/sitemaps/emergency",
    ...Array.from({ length: areaChunks }, (_, index) => `/sitemaps/areas/${index + 1}`),
    ...Array.from(
      { length: cityServiceChunks },
      (_, index) => `/sitemaps/city-services/${index + 1}`
    )
  ];

  return xmlResponse(createSitemapIndexXml(paths));
}
