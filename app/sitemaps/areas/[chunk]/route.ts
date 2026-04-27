import { notFound } from "next/navigation";
import { SITEMAP_CHUNK_SIZE, createUrlSetXml } from "@/lib/seo/sitemap-xml";
import { getManagedCities, getManagedCityAreas } from "@/lib/domain/catalog-managed";

export const revalidate = 21600;

function sliceChunk<T>(items: T[], chunkNumber: number) {
  const start = (chunkNumber - 1) * SITEMAP_CHUNK_SIZE;
  return items.slice(start, start + SITEMAP_CHUNK_SIZE);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ chunk: string }> }
) {
  const { chunk } = await params;
  const chunkNumber = Number.parseInt(chunk, 10);

  if (!Number.isFinite(chunkNumber) || chunkNumber < 1) {
    notFound();
  }

  const cities = await getManagedCities();
  const areaGroups = await Promise.all(cities.map((city) => getManagedCityAreas(city.slug)));
  const urls = cities.flatMap((city, index) =>
    areaGroups[index].map((area) => ({
      path: `/${city.slug}/areas/${area.areaSlug}`,
      lastModified: area.updatedAt ?? city.updatedAt,
      changeFrequency: "weekly" as const,
      priority: (area.priority ?? 10) <= 3 ? 0.65 : 0.5
    }))
  );

  return new Response(createUrlSetXml(sliceChunk(urls, chunkNumber)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=21600"
    }
  });
}
