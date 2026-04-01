import type { AreaPage, City, Review, Service } from "@/types/domain";

export function createLocalBusinessSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: `PlumbRight ${city.name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN"
    },
    telephone: `+91-${city.phoneNumber}`,
    openingHours: "Mo-Su 00:00-24:00",
    areaServed: city.neighbourhoods,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: `${city.jobsCompleted}`
    }
  };
}

export function createServiceSchema(city: City, service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: "PlumbRight"
    },
    areaServed: city.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      lowPrice: service.priceMin,
      highPrice: service.priceMax
    }
  };
}

export function createFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function createReviewSchema(city: City, cityReviews: Review[]) {
  return cityReviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: review.reviewerName,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating
    },
    reviewBody: review.reviewText,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: `PlumbRight ${city.name}`
    }
  }));
}

export function createAreaLocalBusinessSchema(city: City, area: AreaPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: `PlumbRight ${area.areaName}, ${city.name}`,
    areaServed: [area.areaName, city.name],
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN"
    },
    telephone: `+91-${city.phoneNumber}`,
    openingHours: "Mo-Su 00:00-24:00"
  };
}
