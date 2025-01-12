import { Organization, User } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const getOrganizationByUserId = async (
  userId: User["id"]
): Promise<AxiosResponse<Organization>> => {
  return await apiClient.get(`/organization/users/${userId}`, {
    headers: headers(),
  });
};

export const createOrganization = async (organization: Organization) => {
  return await apiClient.post(`/organization`, organization, {
    headers: headers(),
  });
};
