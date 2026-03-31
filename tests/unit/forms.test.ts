import { describe, expect, test } from "vitest";
import { leadSubmissionSchema } from "@/lib/domain/forms";

describe("leadSubmissionSchema", () => {
  test("accepts a valid payload", () => {
    const result = leadSubmissionSchema.safeParse({
      name: "Priya",
      mobile: "9876543210",
      citySlug: "mumbai",
      area: "Andheri West",
      serviceSlug: "pipe-leakage-repair",
      urgency: "urgent",
      sourcePage: "/mumbai/plumber-services",
      sourceChannel: "form"
    });

    expect(result.success).toBe(true);
  });

  test("rejects invalid mobile numbers", () => {
    const result = leadSubmissionSchema.safeParse({
      name: "Priya",
      mobile: "123",
      citySlug: "mumbai",
      area: "Andheri West",
      serviceSlug: "pipe-leakage-repair",
      urgency: "urgent",
      sourcePage: "/mumbai/plumber-services",
      sourceChannel: "form"
    });

    expect(result.success).toBe(false);
  });
});
