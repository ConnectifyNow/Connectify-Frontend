import {
  CreateOrganizationResponse,
  PaginationSimpleOrganization,
  Organization,
  SimpleOrganization,
  User,
} from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

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
