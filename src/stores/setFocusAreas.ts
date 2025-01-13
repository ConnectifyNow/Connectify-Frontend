import { create } from "zustand";
import { FocusArea } from "@/types";
import { getFocusAreas } from "@/services/focusAreasService";

interface FocusAreaStore {
  focusAreas: FocusArea[];
  fetchFocusArea: () => Promise<void>;
}

const useFocusAreaStore = create<FocusAreaStore>((set) => ({
  focusAreas: [],
  fetchFocusArea: async () => {
    try {
      const response = await getFocusAreas();
      const focusAreas = response.data;
      set({ focusAreas });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  }
}));

export default useFocusAreaStore;
