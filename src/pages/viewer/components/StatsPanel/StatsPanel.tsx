import React from "react";
import { Divider } from "@nextui-org/react";
import { useTracker } from "@/pages/viewer/context/TrackerContext/TrackerContext";

const StatsPanel: React.FC = () => {
    const { tracker } = useTracker();

    return (
        <div className="absolute top-0 left-0 p-3 bg-black bg-opacity-50 rounded-br-xl">
            <div>
                <p>Tracker status : </p>
                <span className={tracker.isConnected ? "text-sky-500 font-bold" : 'text-red-500 font-bold'}>
                    {tracker.isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            <Divider />
            <div>Position :
                <p>pX : {tracker.position.x}</p>
                <p>pY : {tracker.position.y}</p>
                <p>pZ : {tracker.position.z}</p>
            </div>
            <Divider />
            <div>Rotation :
                <p>rX : {tracker.rotation.x}</p>
                <p>rY : {tracker.rotation.y}</p>
                <p>rZ : {tracker.rotation.z}</p>
            </div>
        </div>
    );
};

export default StatsPanel;