import { create } from "zustand";
import { City } from "@/types";
import { getCities } from "@/services/citiesService";

interface CitiesStore {
  cities: City[];
  fetchCities: () => Promise<void>;
}

const useCitiesStore = create<CitiesStore>((set) => ({
  cities: [],
  fetchCities: async () => {
    try {
      const response = await getCities();
      const cities = response.data;
      set({ cities });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  }
}));

export default useCitiesStore;
