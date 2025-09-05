import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = ({ url, position, rotation, scale }: {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) => {
  const gltf = useGLTF(url, true);

  // Apply transforms after model loads
  React.useEffect(() => {
    if (gltf.scene) {
      if (position) gltf.scene.position.set(...position);
      if (rotation) gltf.scene.rotation.set(...rotation);
      if (scale) gltf.scene.scale.set(...scale);
    }
  }, [gltf.scene, position, rotation, scale]);

  return <primitive object={gltf.scene} dispose={null} />;
};

const ModelViewer = () => {
  return (
    <div className="w-full h-[500px] md:h-[700px]">
      <Canvas camera={{ position: [0, 6, 15], fov: 60 }}> {/* Zoomed out */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Model
          url="/models/gaming_desktop_pc_blend_file/scene.gltf"
          position={[2, 0, 0]}         // move right
          rotation={[0, Math.PI / 0.3, 0]} // rotate 45° left
          scale={[1, 1, 1]}             // adjust scale if needed
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
