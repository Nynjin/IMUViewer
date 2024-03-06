import { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Server as IOServer } from "socket.io";
import type { Socket as NetSocket } from "net";
import { Server, Socket } from "socket.io";
import Tracker from "@/pages/viewer/types/Tracker/Tracker";

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;
}

export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
    // If server already running
    if (res.socket.server.io) {
        console.log("Socket.IO already started");
        res.end();
        return;
    }

    const io = new Server(res.socket.server, { addTrailingSlash: false, cors: { origin: "*" } })
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
        console.log("Socker.IO client connected");

        // TODO : auth instead of event
        socket.on("imuConnected", () => {
            console.log("IMU connected");
            socket.broadcast.emit("imuUpdated", { isConnected: true });
        });

        // emits an event when imu is updated
        socket.on("updateIMU", (data: Partial<Tracker>) => {
            socket.broadcast.emit("imuUpdated", data);
        });

        socket.on("disconnect", () => {
            console.log("Socket.IO client disconnected");
        });
    });

    console.log("Socket.IO started");
    res.end();
}