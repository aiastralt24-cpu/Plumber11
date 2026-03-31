export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "shortDescription", title: "Short description", type: "text" },
    { name: "fullDescription", title: "Full description", type: "array", of: [{ type: "block" }] },
    { name: "iconName", title: "Icon name", type: "string" },
    { name: "priceMin", title: "Price min", type: "number" },
    { name: "priceMax", title: "Price max", type: "number" },
    { name: "durationHours", title: "Duration hours", type: "number" },
    { name: "isEmergencyEligible", title: "Emergency eligible", type: "boolean" }
  ]
};
