import { AxiosResponse } from "axios";
import {
  CreateOrganizationResponse,
  PaginationSimpleOrganization,
  reqApiOrganization,
  SimpleOrganization,
} from "../types/index";
import apiClient from "./apiClient";
import { headers } from "./authService";

export const createOrganization = async (
  organization: SimpleOrganization
): Promise<AxiosResponse<CreateOrganizationResponse>> => {
  return await apiClient.post(`/organizations`, organization, {
    headers: headers(),
  });
};

export const getOrganizations = async (
  page = 1,
  limit = 10,
  searchTerm = ''
): Promise<AxiosResponse<PaginationSimpleOrganization>> => {
  let url = `/organizations?page=${page}&limit=${limit}`;
  
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }
  
  return await apiClient.get(url, {
    headers: headers(),
  });
};

export const updateOrganizationApi = async (
  organization: reqApiOrganization
) => {
  return await apiClient.put(
    `/organizations/${organization._id}`,
    organization,
    {
      headers: headers(),
    }
  );
};
