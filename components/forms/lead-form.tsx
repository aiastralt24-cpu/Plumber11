"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { City, Service } from "@/types/domain";
import { leadSubmissionSchema } from "@/lib/domain/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type FormValues = {
  name: string;
  mobile: string;
  citySlug: string;
  area: string;
  serviceSlug: string;
  urgency: "urgent" | "week" | "planned";
  sourcePage: string;
  sourceChannel: "form";
  photoUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export function LeadForm({
  cities,
  services,
  defaultCitySlug,
  defaultServiceSlug,
  sourcePage,
  compact = false
}: {
  cities: City[];
  services: Service[];
  defaultCitySlug?: string;
  defaultServiceSlug?: string;
  sourcePage: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<string>("");
  const defaults = useMemo<FormValues>(
    () => ({
      name: "",
      mobile: "",
      citySlug: defaultCitySlug ?? cities[0]?.slug ?? "mumbai",
      area: "",
      serviceSlug: defaultServiceSlug ?? services[0]?.slug ?? "pipe-leakage-repair",
      urgency: "urgent",
      sourcePage,
      sourceChannel: "form",
      photoUrl: ""
    }),
    [cities, defaultCitySlug, defaultServiceSlug, services, sourcePage]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(leadSubmissionSchema),
    defaultValues: defaults
  });

  async function onSubmit(values: FormValues) {
    setStatus("Sending...");

    const response = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const payload = await response.json();
    setStatus(payload.message ?? "Request received.");

    if (response.ok) {
      form.reset(defaults);
    }
  }

  return (
    <form
      className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className={compact ? "" : "md:col-span-1"}>
        <Input placeholder="Name" {...form.register("name")} />
        <p className="mt-1 text-xs text-error">{form.formState.errors.name?.message}</p>
      </div>
      <div>
        <Input placeholder="Mobile number" {...form.register("mobile")} />
        <p className="mt-1 text-xs text-error">{form.formState.errors.mobile?.message}</p>
      </div>
      <div>
        <Select {...form.register("citySlug")}>
          {cities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Input placeholder="Area or pincode" {...form.register("area")} />
      </div>
      <div>
        <Select {...form.register("serviceSlug")}>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Select {...form.register("urgency")}>
          <option value="urgent">Urgent (today)</option>
          <option value="week">This week</option>
          <option value="planned">Planning ahead</option>
        </Select>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <Button fullWidth disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Sending..." : "Get a Plumber in 5 Minutes"}
        </Button>
        {status ? <p className="mt-2 text-sm text-primary">{status}</p> : null}
      </div>
    </form>
  );
}
