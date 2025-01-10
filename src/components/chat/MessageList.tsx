import React from "react";

interface MessageProps {
  messages: { sender: string; message: string }[];
}

const MessageList: React.FC<MessageProps> = ({ messages }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
