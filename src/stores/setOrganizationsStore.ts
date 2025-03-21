import { create } from "zustand";
import { Organization } from "@/types";
import { getOrganizations } from "@/services/organizationService";
import useFocusAreaStore from "./setFocusAreas";

interface OrganizationsStore {
  organizations: Organization[];
  pages: number;
  fetchOrganizations: (page?: number, limit?: number, searchTerm?: string) => Promise<void>;
}

const useOrganizationsStore = create<OrganizationsStore>((set) => ({
  organizations: [],
  pages: 0,

  fetchOrganizations: async (page = 1, limit = 10, searchTerm = '') => {
    try {
      const focusAreas = useFocusAreaStore.getState().focusAreas;
      const response = await getOrganizations(page, limit, searchTerm);

      const simpleOrganizations = response.data.organizations;

      const organizations = simpleOrganizations?.map((simpleOrganization) => {
        const organizationFocusAreas = simpleOrganization.focusAreas?.map(
          (focusAreaId) =>
            focusAreas.find((focusArea) => focusArea._id === focusAreaId)
        );
        const filteredOrganizationFocusAreas = organizationFocusAreas.filter(
          (focusArea) => focusArea !== undefined
        );

        return {
          ...simpleOrganization,
          focusAreas: filteredOrganizationFocusAreas
        };
      });

      set({ organizations, pages: response.data.pages });
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    }
  }
}));

export default useOrganizationsStore;
