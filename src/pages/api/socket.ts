import { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Server as IOServer } from 'socket.io';
import type { Socket as NetSocket } from 'net';
import { Server, Socket } from 'socket.io';
import Tracker from '@/pages/viewer/types/Tracker/Tracker';

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
        const token = socket.handshake.auth?.token || socket.handshake.headers?.token;

        switch (token) {
            case "imu":
                // Handle imu client-specific events
                console.log("IMU client connected");
                socket.join("imu");
                socket.to("web").emit("imuUpdated", { isConnected: true });

                socket.on("updateIMU", (data: Partial<Tracker>) => {
                    socket.to("web").emit("imuUpdated", data);
                });

                socket.on("disconnect", () => {
                    console.log("IMU client disconnected");
                    socket.to("web").emit("imuUpdated", { isConnected: false });
                });
                break;
            case "web":
                // Handle web client-specific events
                console.log("Web client connected");
                socket.join("web");

                socket.on("disconnect", () => {
                    console.log("Web client disconnected");
                });
                break;
            default:
                console.log("Invalid client token");
                socket.disconnect(true);
                break;
        }
    });

    console.log("Socket.IO started");
    res.end();
}