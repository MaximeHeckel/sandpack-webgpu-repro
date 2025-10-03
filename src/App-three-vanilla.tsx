import "./App.css";
import { Sandpack } from "@codesandbox/sandpack-react";

const IndexJs = `import './styles.css';
import * as THREE from 'three';
import { WebGPURenderer } from 'three/webgpu';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer setup
const renderer = new WebGPURenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Initialize WebGPU
renderer.init().then(() => {
  // Add mesh
  const geometry = new THREE.SphereGeometry(1, 256, 256);
  const material = new THREE.MeshStandardMaterial({ color: 'hotpink' });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Add light
  const light = new THREE.DirectionalLight(0xffffff, 4.0);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Add ambient light for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
});

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
`;

const StylesCss = `body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
`;

const IndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Three.js WebGPU Demo</title>
</head>
<body>
</body>
</html>
`;

const setupFiles = {
  "/styles.css": {
    code: StylesCss,
    hidden: true,
  },
  "/index.html": {
    code: IndexHtml,
    hidden: true,
  },
};

function App() {
  return (
    <>
      <Sandpack
        files={{
          ...setupFiles,
          "/index.js": {
            code: IndexJs,
            hidden: false,
          },
        }}
        customSetup={{
          dependencies: {
            three: "0.179.0",
          },
        }}
        template="vanilla"
      />
    </>
  );
}

export default App;
