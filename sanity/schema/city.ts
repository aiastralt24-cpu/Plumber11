export default {
  name: "city",
  title: "City",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "phoneNumber", title: "Phone number", type: "string" },
    { name: "whatsappNumber", title: "WhatsApp number", type: "string" },
    { name: "heroHeadline", title: "Hero headline", type: "string" },
    { name: "heroSubheadline", title: "Hero subheadline", type: "text" },
    { name: "bodyCopy", title: "Body copy", type: "array", of: [{ type: "block" }] },
    { name: "faq", title: "FAQ", type: "array", of: [{ type: "object", fields: [{ name: "question", type: "string" }, { name: "answer", type: "text" }] }] },
    { name: "neighbourhoods", title: "Neighbourhoods", type: "array", of: [{ type: "string" }] },
    { name: "pricingOverrides", title: "Pricing overrides", type: "array", of: [{ type: "object", fields: [{ name: "serviceSlug", type: "string" }, { name: "priceMin", type: "number" }, { name: "priceMax", type: "number" }] }] },
    { name: "featuredReviewIds", title: "Featured review IDs", type: "array", of: [{ type: "string" }] },
    { name: "heroImageUrl", title: "Hero image URL", type: "url" },
    { name: "metaTitle", title: "Meta title", type: "string" },
    { name: "metaDescription", title: "Meta description", type: "text" },
    { name: "launchReady", title: "Launch ready", type: "boolean" }
  ]
};
