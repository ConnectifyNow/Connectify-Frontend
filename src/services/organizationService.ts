import { Organization } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const createOrganization = async (organization: Organization) => {
  return await apiClient.post(`/organization`, organization, {
    headers: headers()
  });
};
