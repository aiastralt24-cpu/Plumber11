export default {
  name: "cityServicePage",
  title: "City Service Page",
  type: "document",
  fields: [
    { name: "citySlug", title: "City slug", type: "string" },
    { name: "serviceSlug", title: "Service slug", type: "string" },
    { name: "customH1", title: "Custom H1", type: "string" },
    { name: "customBody", title: "Custom body", type: "array", of: [{ type: "block" }] },
    { name: "localPriceMin", title: "Local price min", type: "number" },
    { name: "localPriceMax", title: "Local price max", type: "number" },
    { name: "publish", title: "Publish", type: "boolean" }
  ]
};
