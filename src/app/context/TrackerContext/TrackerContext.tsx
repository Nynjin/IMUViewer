import React, { createContext, useContext, useState } from 'react';
import Tracker from '../../model/Tracker/Tracker';

interface TrackerContextType {
    tracker: Tracker;
    updateTracker: (tracker: Tracker) => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const useTracker = () => {
    const context = useContext(TrackerContext);
    if (!context) {
        throw new Error('useTracker must be used within a TrackerProvider');
    }
    return context;
}

const TrackerProvider: React.FC = ({ children }) => {
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

    const updateTracker = (updatedFields: Partial<Tracker>) => {
        setTracker(prevTracker => ({
            ...prevTracker,
            ...updatedFields
        }));
    };

    return (
        <TrackerContext.Provider value={{ tracker, updateTracker }}>
            {children}
        </TrackerContext.Provider>
    );
};

export default TrackerProvider;