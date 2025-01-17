import { create } from "zustand";
import { Chat, Message, User } from "@/types";
import {
  addConversation,
  getConversations,
  getMessages
} from "@/services/chatService";
import useUserStore from "./setUserStore";

interface ChatStore {
  chats: Chat[];
  currentMessages: Message[];
  currentConversationId: Chat["_id"];
  fetchChats: () => Promise<void>;
  getAllUsers: () => User[];
  getChatId: (userId: User["_id"]) => Chat["_id"];
  setMessages: (chatId: Chat["_id"]) => void;
  addMessage: (message: Message) => void;
  addConversation: (userId: User["_id"]) => Promise<void>;
  addMessageToConversation: (
    conversationId: Chat["_id"],
    message: Message
  ) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentMessages: [],
  currentConversationId: "",
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
  },
  getChatId: (userId: User["_id"]) => {
    const chat = get().chats.find((chat) =>
      chat.users.some((user) => user._id === userId)
    );

    return chat?._id ?? "";
  },
  setMessages: async (chatId: Chat["_id"]) => {
    const response = await getMessages(chatId);

    set({ currentMessages: response.data, currentConversationId: chatId });
  },
  addMessage: (message: Message) => {
    set((state) => {
      return { currentMessages: [...state.currentMessages, message] };
    });
  },
  addConversation: async (userId: User["_id"]) => {
    try {
      const response = await addConversation(userId);

      if (response.status === 200) {
        set((state) => {
          return { chats: [...state.chats, response.data] };
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addMessageToConversation: (conversationId: Chat["_id"], message: Message) => {
    const currentUserId = useUserStore.getState()._id;

    if (
      get().currentConversationId === conversationId &&
      message.sender._id !== currentUserId
    ) {
      set((state) => {
        return { currentMessages: [...state.currentMessages, message] };
      });
    }
  }
}));

export default useChatStore;
