"use client";

import React from 'react';
import Tracker from '../../model/Tracker/Tracker';
import './StatsPanel.css';

const tracker: Tracker = {
    isConnected: true,
    position: {
        x: 2,
        y: 5,
        z: 0,
    },
    rotation: {
        x: 23,
        y: 87,
        z: 156,
    },
};

const StatsPanel: React.FC = () => {
    return (
        <div className='statsPanel'>
            <h2>Stats Panel</h2>

            <div>Tracker status : {tracker.isConnected}</div>

            <h3>IMU data : </h3>
            <div>Position : 
                <p>X : {tracker.position.x}</p>
                <p>Y : {tracker.position.y}</p>
                <p>Z : {tracker.position.z}</p>
            </div>

            <div>Rotation : 
                <p>rX : {tracker.rotation.x}</p>
                <p>rY : {tracker.rotation.y}</p>
                <p>rZ : {tracker.rotation.z}</p>
            </div>
        </div>
    );
};

export default StatsPanel;