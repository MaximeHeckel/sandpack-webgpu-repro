import "./App.css";
import { Sandpack } from "@codesandbox/sandpack-react";

const IndexJs = `import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import "./styles.css";


import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;

const StylesCss = `/* Custom styles for your React previews here */
body, #root {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

canvas {
  width: 100vw;
  height: 100vh;
}
`;

const IndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React app</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

const AppJs = `
import { useEffect, useRef } from 'react';
import { WebGPURenderer } from 'three/webgpu';
import * as THREE from 'three'; // Add this line

const Scene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
    containerRef.current.appendChild(renderer.domElement);

    let animationId = null;

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
        animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Scene;
`;

const setupFiles = {
  "/index.js": {
    code: IndexJs,
    hidden: true,
  },
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
          "/App.js": {
            code: AppJs,
            hidden: false,
          },
        }}
        customSetup={{
          dependencies: {
            "@react-three/drei": "9.120.3",
            "@react-three/fiber": "9.2.0",
            react: "19.1.0",
            "react-dom": "19.1.0",
            leva: "0.9.31",
            three: "0.179.0",
            uuid: "11.0.3",
          },
        }}
        template="react"
      />
    </>
  );
}

export default App;
