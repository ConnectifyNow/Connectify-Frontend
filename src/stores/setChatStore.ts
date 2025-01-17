import { create } from "zustand";
import { Chat, User } from "@/types";
import { getConversations } from "@/services/chatService";
import useUserStore from "./setUserStore";

interface ChatStore {
  chats: Chat[];
  fetchChats: () => Promise<void>;
  getAllUsers: () => User[];
}

const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  fetchChats: async () => {
    try {
      const response = await getConversations();

      const convertedChats = response.data.map((chat) => {
        const convertedUsers: User[] = chat.users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            role: user.role,
            email: "",
            password: ""
          };
        });

        return {
          _id: chat._id,
          users: convertedUsers
        };
      });
      set({ chats: convertedChats });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  },
  getAllUsers: () => {
    const currentUserId = useUserStore.getState()._id;
    return get()
      .chats.flatMap((chat) => chat.users)
      .filter((user) => user._id !== currentUserId);
  }
}));

export default useChatStore;
