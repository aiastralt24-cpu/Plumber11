import { createUrlSetXml, getStaticSitemapUrls, type SitemapUrl } from "@/lib/seo/sitemap-xml";
import { getManagedServices } from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

function xmlResponse(urls: SitemapUrl[]) {
  return new Response(createUrlSetXml(urls), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=21600"
    }
  });
}

export async function GET() {
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
