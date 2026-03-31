import { describe, expect, test } from "vitest";
import { getCity, getService } from "@/lib/domain/catalog";
import { createLocalBusinessSchema, createServiceSchema } from "@/lib/seo/schema";

describe("seo schema builders", () => {
  test("creates local business schema for a city", () => {
    const city = getCity("mumbai");
    expect(city).toBeTruthy();
    const schema = createLocalBusinessSchema(city!);
    expect(schema["@type"]).toBe("Plumber");
  });

  test("creates service schema for a city-service pair", () => {
    const city = getCity("mumbai");
    const service = getService("pipe-leakage-repair");
    const schema = createServiceSchema(city!, service!);
    expect(schema["@type"]).toBe("Service");
  });
});
