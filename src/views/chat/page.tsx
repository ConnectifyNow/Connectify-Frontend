import { useState } from "react";
import UserList from "@/components/chat/UserList";
import Chat from "@/components/chat/chat";
import { User } from "@/types";
import useUserStore from "@/stores/setUserStore";
import useChatStore from "@/stores/setChatStore";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const user = useUserStore();
  const chat = useChatStore();
  const users = chat.getAllUsers();

  const chooseUser = (user: User) => {
    setSelectedUser(user);

    const chatId = chat.getChatId(user._id);
    setConversationId(chatId);

    chat.setMessages(chatId);
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
