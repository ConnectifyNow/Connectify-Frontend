import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface SocketServer extends HTTPServer {
  io?: Server;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiRequest {
  socket: SocketWithIO;
}

const socketHandler = (req: NextApiResponseWithSocket) => {
  if (!req.socket.server.io) {
    const io = new Server(req.socket.server);
    req.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("join-chat", (userId: string) => {
        socket.join(userId);
        console.log(`User ${socket.id} joined chat: ${userId}`);
      });

      socket.on("send-message", (data) => {
        const { message, currentUser, selectedUser } = data;
        io.to(selectedUser.id).emit("new-message", {
          content: message,
          sender: currentUser,
          timestamp: new Date(),
        });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return NextResponse.json({ success: true });
};

export { socketHandler as GET, socketHandler as POST };
