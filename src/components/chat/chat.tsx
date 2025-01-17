import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatProps, Message } from "@/types";
import { Building2, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { ScrollArea } from "../ui/scroll-area";

export default function Chat({ currentUser, selectedUser }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const socket = useSocket(currentUser._id);

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

    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
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
    <div className="w-full h-full min-h-100">
      <div className="p-4 flex items-center space-x-2">
        {selectedUser?.role == 0 ? (
          <Building2 className="h-6 w-6" />
        ) : (
          <UserCircle className="h-6 w-6" />
        )}
        <span className="font-semibold">
          {selectedUser.role
            ? selectedUser.organization?.name
            : `${selectedUser.volunteer?.firstName} ${selectedUser.volunteer?.lastName}`}
        </span>
      </div>
      <ScrollArea className="h-[700px] rounded-md p-4 ">
        <div className=" p-4 space-y-4">
          {messages?.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender._id === currentUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}>
              <div
                className={`rounded-lg p-2 max-w-sm ${
                  message.sender._id === currentUser._id
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100"
                }`}>
                <div>{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 flex space-x-2 ">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button type="submit" className="bg-blue-900">
          Send
        </Button>
      </form>
    </div>
  );
}
