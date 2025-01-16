import { AxiosResponse } from "axios";
import {
  CreateOrganizationResponse,
  PaginationSimpleOrganization,
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
  limit = 10
): Promise<AxiosResponse<PaginationSimpleOrganization>> => {
  return await apiClient.get(`/organizations?page=${page}&limit=${limit}`, {
    headers: headers(),
  });
};
