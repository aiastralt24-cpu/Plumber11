import type { Metadata } from "next";
import type { AreaPage, City, Service } from "@/types/domain";

const siteUrl = "https://plumbri.ght";

export function buildDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: "PlumbRight | City-First Plumbing Lead Engine",
    description:
      "Book trusted local plumbers across major Indian cities with fast response, transparent pricing, and WhatsApp-first support.",
    openGraph: {
      title: "PlumbRight",
      description:
        "City-first plumbing lead generation platform built for speed, SEO coverage, and conversion.",
      url: siteUrl,
      siteName: "PlumbRight",
      type: "website"
    }
  };
}

export function buildCityMetadata(city: City): Metadata {
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `/${city.slug}/plumber-services`
    }
  };
}

export function buildCityServiceMetadata(city: City, service: Service): Metadata {
  return {
    title: `${service.name} in ${city.name} | 24/7 Plumber | PlumbRight`,
    description: `${service.shortDescription} Book verified ${service.name.toLowerCase()} support in ${city.name} with fast response and transparent pricing.`,
    alternates: {
      canonical: `/${city.slug}/${service.slug}`
    }
  };
}

export function buildAreaMetadata(area: AreaPage): Metadata {
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: {
      canonical: `/${area.citySlug}/areas/${area.areaSlug}`
    }
  };
}
