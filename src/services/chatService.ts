import { AxiosResponse } from "axios";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { Chat, Message, User } from "@/types";

export const getConversations = async (): Promise<AxiosResponse<Chat[]>> => {
  return await apiClient.get(`/chat/conversation`, { headers: headers() });
};

export const getConversationWith = async (
  userId?: User["_id"]
): Promise<AxiosResponse<Chat | null>> => {
  return await apiClient.get(`/chats/conversation/with/${userId}`, {
    headers: headers()
  });
};

export const addConversation = async (
  userId?: User["_id"]
): Promise<AxiosResponse<Chat>> => {
  return await apiClient.post(
    `/chats/conversation/with/${userId}`,
    {},
    { headers: headers() }
  );
};

export const getMessages = async (
  conversationId: Chat["_id"] | undefined
): Promise<AxiosResponse<Message[]>> => {
  return await apiClient.get(`/chats/conversation/${conversationId}/messages`, {
    headers: headers()
  });
};
