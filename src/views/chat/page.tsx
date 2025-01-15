import { useEffect, useState } from "react";
import UserList from "@/components/chat/UserList";
import Chat from "@/components/chat/chat";
import { User } from "@/types";
import useUserStore from "@/stores/setUserStore";
import { getUsers } from "@/services/userService";

// This is mock data. In a real application, you'd fetch this from an API.

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([]); // State to hold users

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data)); // Fetch and set users
  }, []);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const user = useUserStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <UserList users={users} onSelectUser={setSelectedUser} />
      <div className="flex-1">
        <Chat currentUser={user} selectedUser={selectedUser} />
      </div>
    </div>
  );
}
