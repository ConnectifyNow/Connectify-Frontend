import { useState } from "react";
import UserList from "@/components/chat/UserList";
import Chat from "@/components/chat/chat";
import { User } from "@/types";
import useUserStore from "@/stores/setUserStore";
import { addConversation } from "@/services/chatService";

// This is mock data. In a real application, you'd fetch this from an API.
const mockUsers: User[] = [
  {
    _id: "1",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 0,
    volunteer: {
      firstName: "Hila",
      lastName: "Ohana",
      phone: "1234567890",
      city: "Tel Aviv",
      skills: [
        { _id: "1", name: "React" },
        { _id: "2", name: "Node.js" },
        { _id: "3", name: "TypeScript" }
      ],
      userId: ""
    }
  },
  {
    _id: "2",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 0,
    volunteer: {
      firstName: "Hila",
      lastName: "Ohana 2",
      phone: "1234567890",
      city: "Tel Aviv",
      skills: [
        { _id: "1", name: "React" },
        { _id: "2", name: "Node.js" },
        { _id: "3", name: "TypeScript" }
      ],
      userId: ""
    }
  },
  {
    _id: "3",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 1,
    organization: {
      userId: "3",
      name: "Hila Ohana Organization 1",
      city: "Tel Aviv",
      description: "Software Developer",
      focusAreas: [],
      websiteLink: ""
    }
  },
  {
    _id: "4",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 1,
    organization: {
      userId: "3",
      name: "Hila Ohana Organization 2",
      city: "Tel Aviv",
      description: "Software Developer",
      focusAreas: [],
      websiteLink: ""
    }
  },
  {
    _id: "5",
    email: "",
    password: "1",
    username: "hila.ohana",
    role: 0,
    volunteer: {
      firstName: "Hila",
      lastName: "Ohana 3",
      phone: "1234567890",
      city: "Tel Aviv",
      skills: [
        { _id: "1", name: "React" },
        { _id: "2", name: "Node.js" },
        { _id: "3", name: "TypeScript" }
      ],
      userId: ""
    }
  }
];

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const user = useUserStore();
  addConversation("678a1e6d0b54e42b21696d6a");

  return (
    <div className="flex h-screen bg-gray-100">
      <UserList users={mockUsers} onSelectUser={setSelectedUser} />
      <div className="flex-1">
        <Chat
          currentUser={user}
          selectedUser={selectedUser}
          conversationId=""
        />
      </div>
    </div>
  );
}
