"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import IMU from '../../models/IMU/IMU';
import StatsPanel from '../../components/StatsPanel/StatsPanel';
import { useTracker } from '../../context/TrackerContext/TrackerContext';
import TrailRenderer from '../../models/TrailRenderer/TrailRenderer';

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
            controls.enabled = false;

            // IMU Model
            const imuInstance = new IMU();
            const imu = imuInstance.imu;
            scene.add(imu);

            // Grid helper
            const gridHelper = new THREE.GridHelper( 20, 41, new THREE.Color(0xffffff), new THREE.Color(0x00e0ff));
            scene.add(gridHelper);

            // Trail
            const trailRenderer = new TrailRenderer(10, 0x000000);
            const trail = trailRenderer.trail;
            scene.add(trail);
            
            // Animation loop
            const renderScene = () => {
                renderer.render(scene, camera);
                controls.update();
                controls.target = imu.position;
                imu.rotation.x += 0.01;
                imu.rotation.y += 0.01;
                imu.position.x += 0.005;
                imu.position.z += 0.005;
                imu.position.y += 0.005;

                const IMUData = {
                    position: {
                        x: round(imu.position.x, 2),
                        y: round(imu.position.y, 2),
                        z: round(imu.position.z, 2),
                    },
                    rotation: {
                        x: rotationInDegrees(imu.rotation.x, 2),
                        y: rotationInDegrees(imu.rotation.y, 2),
                        z: rotationInDegrees(imu.rotation.z, 2),
                    },
                }

                updateTracker({
                    ...IMUData
                });

                trailRenderer.updateTrail(imu.position);
                
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