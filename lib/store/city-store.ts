"use client";

import { create } from "zustand";

type CityStore = {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
};

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: "mumbai",
  setSelectedCity: (city) => set({ selectedCity: city })
}));
