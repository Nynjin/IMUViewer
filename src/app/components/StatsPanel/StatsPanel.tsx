"use client";

import React from 'react';
import './StatsPanel.css';
import { Divider } from '@nextui-org/react';
import { useTracker } from '@/app/context/TrackerContext/TrackerContext';


const StatsPanel: React.FC = () => {
    const { tracker } = useTracker();
    
    return (
        <div className='statsPanel'>
            <div>
                <p>Tracker status : </p>
                <span className={tracker.isConnected ? 'connected' : 'disconnected'}>
                    {tracker.isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            <Divider/>
            <div>Position : 
                <p>pX : {tracker.position.x}</p>
                <p>pY : {tracker.position.y}</p>
                <p>pZ : {tracker.position.z}</p>
            </div>
            <Divider/>
            <div>Rotation : 
                <p>rX : {tracker.rotation.x}</p>
                <p>rY : {tracker.rotation.y}</p>
                <p>rZ : {tracker.rotation.z}</p>
            </div>
        </div>
    );
};

export default StatsPanel;