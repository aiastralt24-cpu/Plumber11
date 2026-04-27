import { notFound } from "next/navigation";
import {
  SITEMAP_CHUNK_SIZE,
  createUrlSetXml,
  getCityServiceSitemapUrls
} from "@/lib/seo/sitemap-xml";
import { getManagedCities, getManagedServices } from "@/lib/domain/catalog-managed";

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

  const [cities, services] = await Promise.all([getManagedCities(), getManagedServices()]);

  return new Response(
    createUrlSetXml(sliceChunk(getCityServiceSitemapUrls(cities, services), chunkNumber)),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=21600"
      }
    }
  );
}
