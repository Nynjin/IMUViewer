"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import IMUModel from '../../components/IMUModel/IMUModel';
import StatsPanel from '../../components/StatsPanel/StatsPanel';
import { useTracker } from '../../context/TrackerContext/TrackerContext';

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { updateTracker } = useTracker();

    const round = (number: number, decimals: number) => {
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    const rotationInDegrees = (radAngle: number, decimals: number) => {
        return (round(THREE.MathUtils.euclideanModulo(THREE.MathUtils.radToDeg(radAngle), 360), decimals));
    }

    useEffect(() => {
        if (containerRef.current) {
            // Create a scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            // Create a camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            camera.position.y = 5;

            // Create a renderer
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.VSMShadowMap;
            containerRef.current.appendChild(renderer.domElement); // Append to container

            // Create camera controls
            const controls = new OrbitControls(camera, renderer.domElement);
            // controls.minDistance = 1;
            // controls.maxDistance = 20;
            controls.enabled = false;

            // IMU Model
            const IMU = IMUModel();
            scene.add(IMU);

            // Grid helper
            const gridHelper = new THREE.GridHelper( 20, 41, new THREE.Color(0xffffff), new THREE.Color(0x00e0ff));
            scene.add(gridHelper);

            // Animation loop
            const renderScene = () => {
                renderer.render(scene, camera);
                controls.update();
                controls.target = IMU.position;
                IMU.rotation.x += 0.01;
                IMU.rotation.y += 0.01;

                updateTracker({
                    position: {
                        x: round(IMU.position.x, 2),
                        y: round(IMU.position.y, 2),
                        z: round(IMU.position.z, 2),
                    },
                    rotation: {
                        x: rotationInDegrees(IMU.rotation.x, 2),
                        y: rotationInDegrees(IMU.rotation.y, 2),
                        z: rotationInDegrees(IMU.rotation.z, 2),
                    },
                });
                
                requestAnimationFrame(renderScene);
            };
            
            // Handle window resize
            const handleResize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);
            };
            window.addEventListener('resize', handleResize);

            renderScene();

            // Cleanup
            return () => {
                window.removeEventListener('resize', handleResize);
                containerRef.current?.removeChild(renderer.domElement);
            };
        }
    }, []);

    return (
        <div ref={containerRef} className='threeScene'>
            <StatsPanel />
        </div>
    );
};

export default ThreeScene;