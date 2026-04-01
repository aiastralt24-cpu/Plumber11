"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { City } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function CitySelector({ cities }: { cities: City[] }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(cities[0]?.slug ?? "mumbai");

  return (
    <div className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-panel">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal">
        Find your city
      </p>
      <p className="mt-2 text-2xl font-semibold text-primary">Choose a city and go straight to booking.</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Faster than browsing a long city grid. Pick your location and jump to the matching service page.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Select
          className="sm:flex-1"
          onChange={(event) => setSelectedCity(event.target.value)}
          value={selectedCity}
        >
          {cities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}, {city.state}
            </option>
          ))}
        </Select>
        <Button onClick={() => router.push(`/${selectedCity}/plumber-services`)} type="button">
          Explore city
        </Button>
      </div>
    </div>
  );
}
