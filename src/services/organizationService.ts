import {
  CreateOrganizationResponse,
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

export const getOrganizationByUserId = async (
  userId: User["_id"]
): Promise<AxiosResponse<Organization>> => {
  return await apiClient.get(`/organizations/user/${userId}`, {
    headers: headers(),
  });
};
