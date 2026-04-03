import { siteConfig } from "@/lib/seo/site-config";

export function GET() {
  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Canonical site",
    siteConfig.url,
    "",
    "## What this site is about",
    "- Emergency and same-day plumbing services across Indian cities",
    "- City, service, and area landing pages with contact and pricing context",
    "- Admin-managed city phone numbers, response times, and local pricing",
    "",
    "## Priority pages",
    `${siteConfig.url}/`,
    `${siteConfig.url}/cities`,
    `${siteConfig.url}/services`,
    `${siteConfig.url}/reviews`,
    `${siteConfig.url}/about`,
    "",
    "## Indexing guidance",
    "- Public marketing pages are intended to be indexed",
    "- Admin routes and API routes are not intended for indexing",
    "",
    "## Structured data present on the site",
    "- Plumber / LocalBusiness",
    "- Service",
    "- FAQPage",
    "- Review"
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
