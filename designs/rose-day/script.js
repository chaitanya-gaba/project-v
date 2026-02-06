import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

let camera, scene, renderer, controls;
let object;
let t = 0;

const materialBase = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0.8,
  side: THREE.DoubleSide
});

init();
animate();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    33,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.set(0, 150, 250);

  scene = new THREE.Scene();

  /* LIGHTING */
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));

  const keyLight = new THREE.PointLight(0xffffff, 0.6);
  keyLight.position.set(200, 200, 200);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xffb3c1, 0.6);
  rimLight.position.set(-200, 150, -100);
  scene.add(rimLight);

  /* MODEL */
  const manager = new THREE.LoadingManager(() => {
    scene.add(object);
  });

  const loader = new OBJLoader(manager);
  loader.load(
    "https://happy358.github.io/Images/Model/red_rose3.obj",
    (obj) => {
      object = obj;

      object.traverse((child) => {
        if (!child.isMesh) return;

        const mat = materialBase.clone();

        if (child.name === "rose") mat.color.set("crimson");
        if (child.name === "calyx") mat.color.set("#001a14");
        if (child.name === "leaf1" || child.name === "leaf2")
          mat.color.set("#00331b");

        child.material = mat;
      });

      object.rotation.y = Math.PI / 1.7;
    }
  );

  /* RENDERER */
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  /* CONTROLS */
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2;
  controls.update();

  /* INTERACTION */
  document.addEventListener("mousemove", (e) => {
    if (!object) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 0.4;
    const y = (e.clientY / window.innerHeight - 0.5) * 0.4;

    object.rotation.x = y;
    object.rotation.z = x;
  });

  window.addEventListener("resize", onResize);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  t += 0.01;

  if (object) {
    object.position.y = Math.sin(t) * 2; // breathing motion
  }

  controls.update();
  renderer.render(scene, camera);
}