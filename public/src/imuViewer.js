import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);

// Create camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 20;
controls.update();

// Create a cube geometry
const cubeGeometry = new THREE.BoxGeometry(1, 0.5, 1);

// Create materials for roll, pitch, and yaw arrows
const rollMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const pitchMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const yawMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a cube mesh
const cube = new THREE.Mesh(cubeGeometry, [rollMaterial, rollMaterial, pitchMaterial, pitchMaterial, yawMaterial, yawMaterial]);
scene.add(cube);

// Create arrow geometries
const arrowGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);

// Create roll arrow
const rollArrow = new THREE.Mesh(arrowGeometry, rollMaterial);
rollArrow.position.x = 0.8;
rollArrow.rotation.z = Math.PI * 3 / 2;
cube.add(rollArrow);

// Create pitch arrow
const pitchArrow = new THREE.Mesh(arrowGeometry, pitchMaterial);
pitchArrow.position.y = 0.8;
pitchArrow.rotation.y = Math.PI / 2;
cube.add(pitchArrow);

// Create yaw arrow
const yawArrow = new THREE.Mesh(arrowGeometry, yawMaterial);
yawArrow.position.z = 0.8;
yawArrow.rotation.x = Math.PI / 2;
cube.add(yawArrow);

// Render the scene
// This is executed for each frames
function render() {
    requestAnimationFrame(render);
    // Animation code goes here
    controls.update();
    renderer.render(scene, camera);
}
render();