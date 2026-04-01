"use client";

import { useMemo, useState } from "react";
import { Clock3, MapPin, PhoneCall, ShieldCheck, Wrench } from "lucide-react";
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

  const fullForm = !compact;

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
      className={
        compact
          ? "space-y-3"
          : "overflow-hidden rounded-[30px] border border-[#d9d1c3] bg-[linear-gradient(180deg,#fffdfa_0%,#f6efe4_100%)] shadow-[0_28px_80px_rgba(15,35,58,0.14)]"
      }
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {fullForm ? (
        <div className="border-b border-primary/10 bg-[linear-gradient(90deg,rgba(15,35,58,0.96)_0%,rgba(18,42,67,0.92)_100%)] px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/90">
                Booking desk
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Book a verified plumber in minutes.</h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
                Share the city, area, and issue type. The dispatch team uses this to route the nearest available crew faster.
              </p>
            </div>
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 md:block">
              <Clock3 className="mr-2 inline h-3.5 w-3.5 text-accent" />
              Fast triage
            </div>
          </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
              { icon: PhoneCall, label: "Phone + WhatsApp routing" },
              { icon: ShieldCheck, label: "Verified service network" },
              { icon: Wrench, label: "Leakage to renovation support" }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/74"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className={compact ? "space-y-3" : "grid gap-4 p-6 md:grid-cols-2"}>
        <div className={compact ? "" : "md:col-span-1"}>
          {fullForm ? (
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/58">
              Name
            </label>
          ) : null}
          <Input placeholder="Full name" {...form.register("name")} />
          <p className="mt-1 text-xs text-error">{form.formState.errors.name?.message}</p>
        </div>
        <div>
          {fullForm ? (
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/58">
              Mobile number
            </label>
          ) : null}
          <Input placeholder="Mobile number" {...form.register("mobile")} />
          <p className="mt-1 text-xs text-error">{form.formState.errors.mobile?.message}</p>
        </div>
        <div>
          {fullForm ? (
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/58">
              City
            </label>
          ) : null}
          <Select {...form.register("citySlug")}>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          {fullForm ? (
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/58">
              Area or pincode
            </label>
          ) : null}
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/40" />
            <Input className="pl-11" placeholder="Area or pincode" {...form.register("area")} />
          </div>
        </div>
        <div>
          {fullForm ? (
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/58">
              Service needed
            </label>
          ) : null}
          <Select {...form.register("serviceSlug")}>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          {fullForm ? (
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/58">
              Urgency
            </label>
          ) : null}
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
          {fullForm ? (
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/48">
              Dispatch desk reviews call priority, city coverage, and service fit before assignment.
            </p>
          ) : null}
          {status ? <p className="mt-2 text-sm text-primary">{status}</p> : null}
        </div>
      </div>
    </form>
  );
}
