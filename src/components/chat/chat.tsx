import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import MessageList from "./MessageList";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const username = "hila";

  useEffect(() => {
    socket.emit("set username", username);

    socket.on(
      "chat message",
      (data: { sender: string; receiver: string; message: string }) => {
        if (data.sender === selectedUser || data.receiver === selectedUser) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      }
    );

    return () => {
      socket.off("chat message");
    };
  }, [username, selectedUser]);

  const handleSendMessage = (): void => {
    if (message.trim() && selectedUser.trim()) {
      socket.emit("chat message", {
        sender: username,
        receiver: selectedUser,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: username, receiver: selectedUser, message },
      ]);
      setMessage("");
    }
  };

  const loadMessages = async (user: string): Promise<void> => {
    setSelectedUser(user);
    const res = await axios.get(
      `http://localhost:3000/messages/${username}/${user}`
    );
    setMessages(res.data);
  };

  return (
    <div>
      <h2>Chat with: {selectedUser}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "15%",
        }}
      >
        <button onClick={() => loadMessages("User2")}>User2</button>
        <button onClick={() => loadMessages("User3")}>User3</button>
      </div>
      <MessageList messages={messages} />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
