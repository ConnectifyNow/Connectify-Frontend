import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";
import { getTokens } from "../services/authService";
import { Chat, ReceiveNewMessageResponse, SendNewMessageInput } from "@/types";

const useChatSocket = (
  onNewMessage: (data: ReceiveNewMessageResponse) => void
) => {
  const [socketInstance, setSocketInstance] = useState<typeof Socket>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket: typeof Socket = socketIOClient(
      import.meta.env.VITE_REACT_APP_API_URL,
      {
        auth: {
          token: getTokens().accessToken
        }
      }
    );
    setSocketInstance(socket);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socketInstance?.on("receiveMessage", onNewMessage);

    return () => {
      socketInstance?.off("receiveMessage", onNewMessage);
    };
  }, [socketInstance, onNewMessage]);

  const sendMessage = (data: SendNewMessageInput) => {
    socketInstance?.emit("sendMessage", data);
  };

  const listenToConversations = (conversationIds: Chat["_id"][]) => {
    conversationIds.forEach((conversation) => {
      socketInstance?.emit("joinRoom", conversation);
    });
  };

  return {
    isConnected,
    listenToConversations,
    sendMessage,
    socket: socketInstance
  };
};

export default useChatSocket;
