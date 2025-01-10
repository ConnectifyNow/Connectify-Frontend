import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

export function useSocket(userId: string) {
  const socketRef = useRef<typeof Socket | null>(null);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");

      const socket = io();
      socketRef.current = socket;

      socket.emit("join-chat", userId);

      socket.on("connect", () => {
        console.log("Connected to Socket.IO");
      });

      socket.on("connect_error", (err: Error) => {
        console.error("Socket.IO connection error:", { err });
      });
    };

    socketInitializer();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  return socketRef.current;
}
