import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { Building2, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";

interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
}

interface ChatProps {
  currentUser: User;
  selectedUser: User | null;
}

export default function Chat({ currentUser, selectedUser }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const socket = useSocket(currentUser.id);

  useEffect(() => {
    if (!socket) {
      console.log("error");
      return;
    }

    socket.on("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new-message");
    };
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !selectedUser || !input.trim()) return;

    const messageData = {
      message: input,
      currentUser,
      selectedUser,
    };

    socket.emit("send-message", messageData);

    // Add message to local state
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: input,
        sender: currentUser,
        timestamp: new Date(),
      },
    ]);

    setInput("");
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 flex items-center space-x-2">
        {selectedUser?.role == 0 ? (
          <Building2 className="h-6 w-6" />
        ) : (
          <UserCircle className="h-6 w-6" />
        )}
        <span className="font-semibold">{selectedUser.name}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender.id === currentUser.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-2 max-w-sm ${
                message.sender.id === currentUser.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <div>{message.content}</div>
              <div className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
