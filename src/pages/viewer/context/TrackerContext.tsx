import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { Tracker } from "@/types/Tracker";
import IMU from "@/pages/viewer/models/IMU";
import { nanoid } from "nanoid";

interface TrackerContextType {
  tracker: Tracker;
  token: string | null;
  updateTracker: (tracker: Partial<Tracker>) => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
};

interface TrackerProviderProps {
  children: ReactNode;
}

let socket: Socket | null = null;

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

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Generate the token only on the client side after the component has mounted
    if (!token) {
      const generatedToken = nanoid(8);
      setToken(generatedToken);
      socketInitializer(generatedToken);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token]);

  const socketInitializer = async (token: string) => {
    try {
      await fetch("/api/socket");
      socket = io({
        query: {
          type: "web",
          token,
        },
      });

      socket.on("connect", () => {
        console.log("Connected");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected");
        socketInitializer(token);
      });

      socket.on("connect_error", () => {
        socketInitializer(token);
      });

      socket.on("imuUpdated", (data: Partial<Tracker>) => {
        updateTracker(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTracker = (updatedFields: Partial<Tracker>) => {
    setTracker((prevTracker) => ({
      ...prevTracker,
      ...updatedFields,
    }));
    IMU.getInstance().updateIMU(updatedFields);
  };

  return (
    <TrackerContext.Provider value={{ tracker, token, updateTracker }}>
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;
