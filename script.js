import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0xAAAAAA);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 20, 100);
camera.lookAt(0, 20, 0);

const groundGeometry = new THREE.PlaneGeometry(100, 100);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(15, 40, 35);
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

scene.add(spotLight);

let car; // store model reference

const loader = new GLTFLoader().setPath('carmodel/');
loader.load('scene.gltf', function (gltf) {
  car = gltf.scene;
  car.position.set(0, 1.05, -1);
  car.scale.set(20, 20, 20);
  scene.add(car);
});

// Track mouse
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
  // Normalize mouse coordinates (-1 to +1)
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  if (car) {
    // Rotate based on mouse movement
    car.rotation.y = mouseX * Math.PI;      // left-right spin
    car.rotation.x = mouseY * 0.5;          // slight tilt up-down
  }

  renderer.render(scene, camera);
}
animate();
