"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import modelIMU from '../../components/modelIMU/modelIMU';

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Create a scene
            const scene = new THREE.Scene();

            // Create a camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            // Create a renderer
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.VSMShadowMap;
            document.body.appendChild(renderer.domElement);

            // Create camera controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 1;
            controls.maxDistance = 20;

            scene.add(modelIMU());

            // Animation loop
            const renderScene = () => {
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(renderScene);
            }

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
        }
    }, []);

    return <div ref={containerRef} />;
};

export default ThreeScene;