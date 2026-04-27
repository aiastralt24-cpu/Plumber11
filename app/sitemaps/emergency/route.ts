import { createUrlSetXml, getEmergencySitemapUrls } from "@/lib/seo/sitemap-xml";
import { getManagedCities } from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

export async function GET() {
  const cities = await getManagedCities();

  return new Response(createUrlSetXml(getEmergencySitemapUrls(cities)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=21600"
    }
  });
}
