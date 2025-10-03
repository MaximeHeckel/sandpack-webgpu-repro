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

const AppJs = `import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { Suspense } from 'react';
import { WebGPURenderer } from 'three/webgpu';
import * as THREE from 'three/webgpu';

extend(THREE);

console.log(window.__THREE__);

const Core = () => {
  return (
    <>
      <mesh>
        <sphereGeometry args={[, 256]} />
        <meshStandardMaterial color='hotpink' />
        <directionalLight position={[10, 10, 10]} intensity={4.0} />
      </mesh>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <Canvas
        shadows
        gl={async (props) => {
          props.alpha = true;
          const renderer = new WebGPURenderer(props);
          await renderer.init();
          return renderer;
        }}
      >
        <Suspense>
          <OrbitControls />
          <Core />
        </Suspense>
      </Canvas>
    </>
  );
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
