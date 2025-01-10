import { useState } from "react";
import UserList from "../components/chat/UserList";
import Chat from "../components/chat/chat";
import { User } from "@/types";
import useUserStore from "@/stores/setUserStore";

// This is mock data. In a real application, you'd fetch this from an API.
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 0,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 0,
  },
  {
    id: "3",
    name: "Acme Corp",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 1,
  },
  {
    id: "4",
    name: "Globex Foundation",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 1,
  },
  {
    id: "5",
    name: "Bob Johnson",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 0,
  },
];

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user } = useUserStore();

  return (
    <div className="flex h-screen bg-white">
      <UserList users={mockUsers} onSelectUser={setSelectedUser} />
      <div className="flex-1">
        <Chat currentUser={user} selectedUser={selectedUser} />
      </div>
    </div>
  );
}
