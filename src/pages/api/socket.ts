import { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Server as IOServer } from "socket.io";
import type { Socket as NetSocket } from "net";
import { Server, Socket } from "socket.io";
import { Tracker } from "@/types/Tracker";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log("Socket.IO already started");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    cors: { origin: "*" },
  });
  res.socket.server.io = io;

  const activeRooms = new Map<string, { imuSocketId: string | null }>(); // Track active rooms and IMU connections

  io.on("connection", (socket: Socket) => {
    const token = socket.handshake.query?.token as string;
    const clientType = socket.handshake.query?.type;

    if (!token || !clientType) {
      console.log("Missing token or client type");
      socket.disconnect(true);
      return;
    }

    if (clientType === "web") {
      if (activeRooms.has(token)) {
        console.log(`Room with token ${token} already exists`);
        socket.disconnect(true);
        return;
      }

      console.log(
        `Web client connected and creating room with token: ${token}`
      );
      socket.join(token);
      activeRooms.set(token, { imuSocketId: null }); // Initialize room with no IMU connected

      socket.on("disconnect", () => {
        console.log(`Web client disconnected, destroying room: ${token}`);
        socket.to(token).emit("roomClosed"); // Notify IMU clients
        io.in(token).socketsLeave(token); // Disconnect all IMU clients in the room
        activeRooms.delete(token); // Remove the room from active list
      });
    } else if (clientType === "imu") {
      const room = activeRooms.get(token);
      if (!room) {
        console.log(`Room with token ${token} does not exist`);
        socket.disconnect(true);
        return;
      }

      if (room.imuSocketId) {
        console.log("Replacing the previous IMU client");
        io.sockets.sockets.get(room.imuSocketId)?.disconnect(); // Disconnect the previous IMU
      }

      console.log("IMU client connected to room:", token);
      socket.join(token);
      room.imuSocketId = socket.id; // Track the current IMU socket ID
      socket.to(token).emit("imuUpdated", { isConnected: true });

      socket.on("updateIMU", (data: Partial<Tracker>) => {
        socket.to(token).emit("imuUpdated", data);
      });

      socket.on("disconnect", () => {
        console.log("IMU client disconnected");
        socket.to(token).emit("imuUpdated", { isConnected: false });
        room.imuSocketId = null; // Clear the IMU tracking on disconnect
      });
    } else {
      console.log("Invalid client type");
      socket.disconnect(true);
    }
  });

  console.log("Socket.IO started");
  res.end();
}
