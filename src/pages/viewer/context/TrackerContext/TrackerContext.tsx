import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import Tracker from '@/pages/viewer/types/Tracker/Tracker';
import IMU from '../../models/IMU/IMU';

interface TrackerContextType {
    tracker: Tracker;
    updateTracker: (tracker: Partial<Tracker>) => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const useTracker = () => {
    const context = useContext(TrackerContext);
    if (!context) {
        throw new Error('useTracker must be used within a TrackerProvider');
    }
    return context;
}

interface TrackerProviderProps {
    children: ReactNode;
}

let socket: Socket;

const TrackerProvider: React.FC<TrackerProviderProps> = ({ children }) => {
    const [tracker, setTracker] = useState<Tracker>({
        isConnected: false,
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        },
    });

    useEffect(() => {
        socketInitializer();

        // Cleanup function to close the socket connection
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    const socketInitializer = async () => {
        await fetch("/api/socket");
        socket = io({
            auth: {
                token: "web"
            },
        });

        socket.on("connect", () => {
            console.log("Connected")
        });

        socket.on("disconnect", () => {
            console.log("Disconnected")
        });

        socket.on("connect_error", async err => {
            socketInitializer();
        });

        socket.on("imuUpdated", (data: Partial<Tracker>) => {
            updateTracker(data);
        });
    }

    const updateTracker = (updatedFields: Partial<Tracker>) => {
        setTracker(prevTracker => ({
            ...prevTracker,
            ...updatedFields
        }));
        IMU.getInstance().updateIMU(updatedFields);
    };

    return (
        <TrackerContext.Provider value={{ tracker, updateTracker }}>
            {children}
        </TrackerContext.Provider>
    );
};

export default TrackerProvider;