// Import Three.js
import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Ground geometry
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
scene.add(ground);

// Building geometry
const buildingGeometry = new THREE.BoxGeometry(5, 10, 5);
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
building.position.set(0, 5, 0);
scene.add(building);

// Enemy spawning
const enemies = [];
const enemyCount = 5;

for (let i = 0; i < enemyCount; i++) {
    const enemy = new THREE.Mesh(buildingGeometry, new THREE.MeshStandardMaterial({ color: 0x0000ff }));
    enemy.position.set(Math.random() * 50 - 25, 5, Math.random() * 50 - 25);
    enemies.push(enemy);
    scene.add(enemy);
}

// Player controls
const player = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffff00 }));
player.position.set(0, 1, 0);
scene.add(player);

const keys = {};
document.addEventListener('keydown', (event) => { keys[event.key] = true; });
document.addEventListener('keyup', (event) => { keys[event.key] = false; });

function movePlayer() {
    if (keys['a']) player.position.x -= 0.1; // Move left
    if (keys['d']) player.position.x += 0.1; // Move right
    if (keys['w']) player.position.z -= 0.1; // Move forward
    if (keys['s']) player.position.z += 0.1; // Move backward
}

// Shooting mechanics
let ammo = 30;

function shoot() {
    if (ammo > 0) {
        // Implement raycasting for shooting logic (example)
        console.log('Shoot!');
        ammo--;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    renderer.render(scene, camera);
}

animate();
