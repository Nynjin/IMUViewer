import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useTracker } from "@/pages/viewer/context/TrackerContext/TrackerContext";
import StatsPanel from "@/pages/viewer/components/StatsPanel/StatsPanel";
import IMU from "@/pages/viewer/models/IMU/IMU";
import TrailRenderer from "@/pages/viewer/models/TrailRenderer/TrailRenderer";
import { motion } from "framer-motion";

const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
}

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { tracker } = useTracker();

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
            const imuInstance = new IMU(0xff0000, 0x0000ff, 0x00ff00);
            const imu = imuInstance.imu;
            scene.add(imu);

            // Grid helper
            const gridHelper = new THREE.GridHelper(20, 41, new THREE.Color(0xffffff), new THREE.Color(0x00e0ff));
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

                imuInstance.updateIMU(tracker);

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
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            ref={containerRef}>
            <StatsPanel />
        </motion.div>
    );
};

export default ThreeScene;