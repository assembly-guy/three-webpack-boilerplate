import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// ======================
// ====== RENDERER ======
// ======================
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ======================
// ====== ORBITAL =======
// ======================
const controls = new OrbitControls(camera, renderer.domElement);

// ======================
// ======= LIGHTS =======
// ======================

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 0);
light.castShadow = true;
scene.add(light);

// =====================
// ====== CUBE =========
// =====================
const cube_composition = {
    geometry: new THREE.BoxGeometry(),
    material: new THREE.MeshStandardMaterial({ color: 0xff2200 })
}

const cube = new THREE.Mesh(cube_composition.geometry, cube_composition.material);
cube.castShadow = true;
cube.receiveShadow = false;
scene.add(cube);

// =====================
// ====== PLANE ========
// =====================
const plane_composition = {
    geometry: new THREE.PlaneGeometry(100, 100, 100, 100),
    material: new THREE.MeshStandardMaterial({ color: 0xffffff })
}

const plane = new THREE.Mesh(plane_composition.geometry, plane_composition.material);
plane.receiveShadow = true;
plane.castShadow = true;
scene.add(plane);


// =====================
// == TRANSFORMATIONS ==
// =====================
plane.position.y = -0.5;
plane.rotateX(-1.57);


// =====================
// ===== CAMERA ========
// =====================

camera.position.z = 5;
camera.position.y = 3;
camera.lookAt(0, 0, 0);
controls.update();


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

document.body.appendChild(renderer.domElement);