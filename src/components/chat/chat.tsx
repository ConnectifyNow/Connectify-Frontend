import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChatProps,
  Message,
  ReceiveNewMessageResponse,
  Role,
  User
} from "@/types";
import { Building2, UserCircle } from "lucide-react";
import { useCallback, useState } from "react";
import useChatSocket from "@/hooks/useChatSocket";
import { ScrollArea } from "../ui/scroll-area";
import useChatStore from "@/stores/setChatStore";

export default function Chat({
  currentUser,
  selectedUser,
  conversationId
}: ChatProps) {
  const chats = useChatStore();
  const currentMessages = useChatStore((state) => state.currentMessages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [input, setInput] = useState("");
  const onNewMessage = useCallback((data: ReceiveNewMessageResponse) => {
    const senderUser: User = {
      _id: data.sender._id,
      username: data.sender.username,
      role: data.sender.role,
      email: "",
      password: ""
    };

    const newMessage: Message = {
      _id: data._id,
      content: data.content,
      sender: senderUser,
      createdAt: new Date(data.createdAt)
    };
    chats.addMessageToConversation(data.conversationId, newMessage);
  }, []);

  const chatIds = chats.chats.map((chat) => chat._id);
  const { sendMessage, listenToConversations } = useChatSocket(onNewMessage);

  listenToConversations(chatIds);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!sendMessage || !selectedUser || !input.trim()) return;

    sendMessage({
      conversationId,
      content: input
    });

    addMessage({
      _id: Date.now().toString(),
      content: input,
      sender: currentUser,
      createdAt: new Date()
    });

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
    <div className="w-full h-full">
      <div className="p-4 flex items-center space-x-2">
        {selectedUser?.role == Role.Organization ? (
          <Building2 className="h-6 w-6" />
        ) : (
          <UserCircle className="h-6 w-6" />
        )}
        <span className="font-semibold">{selectedUser.username}</span>
      </div>
      <ScrollArea className="h-[700px] rounded-md p-4 ">
        <div className=" p-4 space-y-4">
          {currentMessages?.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender._id === currentUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-sm ${
                  message.sender._id === currentUser._id
                    ? "bg-gray-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                <div>{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(message.createdAt).toLocaleTimeString()}
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
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
