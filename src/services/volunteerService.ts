import { AxiosResponse } from "axios";
import {
  CreateVolunteerResponse,
  PaginationSimpleVolunteer,
  reqApiVolunteer,
  SimpleVolunteer,
} from "../types/index";
import apiClient from "./apiClient";
import { headers } from "./authService";

export const createVolunteer = async (
  volunteer: SimpleVolunteer
): Promise<AxiosResponse<CreateVolunteerResponse>> => {
  return await apiClient.post(`/volunteers`, volunteer, {
    headers: headers(),
  });
};

export const getVolunteers = async (
  page = 1,
  limit = 10,
  searchTerm = ''
): Promise<AxiosResponse<PaginationSimpleVolunteer>> => {
  let url = `/volunteers?page=${page}&limit=${limit}`;
  
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }
  
  return await apiClient.get(url, {
    headers: headers(),
  });
};

export const updateVolunteerApi = async (volunteer: reqApiVolunteer) => {
  return await apiClient.put(`/volunteers/${volunteer._id}`, volunteer, {
    headers: headers(),
  });
};
