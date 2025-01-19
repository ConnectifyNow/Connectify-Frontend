import { useEffect, useState } from "react";
import UserList from "@/components/chat/UserList";
import Chat from "@/components/chat/chat";
import { User } from "@/types";
import useUserStore from "@/stores/setUserStore";
import useChatStore from "@/stores/setChatStore";
import { getUserById } from "@/services/userService";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const user = useUserStore();
  const chat = useChatStore();
  const users = chat.getAllUsers();

  useEffect(() => {
    async function fetchData() {
      const savedUserId = localStorage.getItem("selectedUserId");
      if (savedUserId) {
        const response = await getUserById(savedUserId);
        if (response.data) {
          setSelectedUser(response.data);
          initMessagesByUserId(response.data._id);
        }
      }
    }
    fetchData();
  }, []);

  const initMessagesByUserId = async (userId: string) => {
    let chatId = chat.getChatId(userId);

    if (!chatId) {
      await chat.fetchChats();
      chatId = chat.getChatId(userId);

      if (chatId) {
        setConversationId(chatId);
        chat.setMessages(chatId);
      }
    }
  };

  const chooseUser = (user: User) => {
    localStorage.setItem("selectedUserId", user._id);
    setSelectedUser(user);

    initMessagesByUserId(user._id);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <UserList users={users} onSelectUser={chooseUser} />
      <div className="flex-1">
        <Chat
          currentUser={user}
          selectedUser={selectedUser}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
}
