import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Initialisation of the scene / camera / renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 20;
controls.update();

const textureLoader = new THREE.TextureLoader();

// Initialisation of your objects / materials / light
var IMU = new THREE.Object3D();
scene.add(IMU);

// This is executed for each frames
function render() {
    requestAnimationFrame( render );
    // Animation code goes here

    controls.update();
    renderer.render( scene, camera );
}
render();