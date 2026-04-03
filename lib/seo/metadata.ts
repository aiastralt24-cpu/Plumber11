import type { Metadata } from "next";
import type { AreaPage, City, Service } from "@/types/domain";
import { siteConfig } from "@/lib/seo/site-config";

export function buildDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: `${siteConfig.name} | City-First Plumbing Lead Engine`,
    description: siteConfig.description,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: siteConfig.name,
      description:
        "City-first plumbing lead generation platform built for speed, SEO coverage, and conversion.",
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description
    }
  };
}

export function buildCityMetadata(city: City): Metadata {
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `/${city.slug}/plumber-services`
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `/${city.slug}/plumber-services`,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription
    }
  };
}

export function buildCityServiceMetadata(city: City, service: Service): Metadata {
  const title = `${service.name} in ${city.name} | 24/7 Plumber | ${siteConfig.name}`;
  const description = `${service.shortDescription} Book verified ${service.name.toLowerCase()} support in ${city.name} with fast response and transparent pricing.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${city.slug}/${service.slug}`
    },
    openGraph: {
      title,
      description,
      url: `/${city.slug}/${service.slug}`,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function buildAreaMetadata(area: AreaPage): Metadata {
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: {
      canonical: `/${area.citySlug}/areas/${area.areaSlug}`
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `/${area.citySlug}/areas/${area.areaSlug}`,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription
    }
  };
}
