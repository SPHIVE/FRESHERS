"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function PortalStructure() {
  const portalRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={portalRef} position={[0, -0.1, 0]}>
      {/* Floating Architectural Portal Frame */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[2.4, 3.4, 0.08]} />
          <meshStandardMaterial
            color="#0D1624"
            metalness={0.8}
            roughness={0.2}
            emissive="#6C63A8"
            emissiveIntensity={0.3}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Pathway Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <torusGeometry args={[2.0, 0.03, 16, 100]} />
        <meshStandardMaterial color="#6C63A8" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.2, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#D8B56A" metalness={0.95} roughness={0.05} />
      </mesh>
    </group>
  );
}

export function HelpHubHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 4]} intensity={1.4} color="#6C63A8" />
        <pointLight position={[-3, -3, 3]} intensity={1.5} color="#244C7A" />
        <Environment preset="night" environmentIntensity={1.3} />
        <PortalStructure />
        <Sparkles count={45} scale={7} size={2} speed={0.4} color="#6C63A8" opacity={0.6} />
      </Canvas>
    </div>
  );
}
