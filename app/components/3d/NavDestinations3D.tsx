"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Center } from "@react-three/drei";
import * as THREE from "three";

export function NavDestinations3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, -9]}>
      {/* =================================================== */}
      {/* DESTINATION 1: THE CONTRIBUTORS (Left, Position Z = -7) */}
      {/* =================================================== */}
      <group position={[-4.2, 0.5, 2]}>
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          {/* Monument Base Pedestal */}
          <mesh position={[0, -1.2, 0]}>
            <boxGeometry args={[3.2, 0.4, 1.8]} />
            <meshStandardMaterial color="#081221" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Champagne Ring Light */}
          <mesh position={[0, -0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.35, 32]} />
            <meshBasicMaterial color="#D8B56A" side={THREE.DoubleSide} />
          </mesh>

          {/* 3D Title */}
          <Center position={[0, 0.4, 0]}>
            <Text fontSize={0.55} letterSpacing={0.15}>
              THE CONTRIBUTORS
              <meshStandardMaterial color="#D8B56A" metalness={0.9} roughness={0.15} />
            </Text>
          </Center>

          <Center position={[0, -0.2, 0]}>
            <Text fontSize={0.24} letterSpacing={0.08}>
              “The People Who Made It Possible”
              <meshStandardMaterial color="#F4F1EA" metalness={0.5} roughness={0.4} />
            </Text>
          </Center>
        </Float>
      </group>

      {/* =================================================== */}
      {/* DESTINATION 2: FINANCIAL TRANSPARENCY (Center, Position Z = -11) */}
      {/* =================================================== */}
      <group position={[0, 1.2, -4]}>
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
          {/* Smoked Glass Display Backing */}
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[6.8, 3.2, 0.2]} />
            <meshStandardMaterial
              color="#050914"
              metalness={0.95}
              roughness={0.1}
              transparent
              opacity={0.85}
            />
          </mesh>

          <Center position={[0, 1.0, 0.1]}>
            <Text fontSize={0.5} letterSpacing={0.15}>
              FINANCIAL TRANSPARENCY
              <meshStandardMaterial color="#D8B56A" metalness={0.9} roughness={0.15} />
            </Text>
          </Center>

          {/* 3 Metrics Block Display */}
          <Center position={[-2.0, 0.1, 0.1]}>
            <Text fontSize={0.22}>
              TOTAL COLLECTED
              <meshStandardMaterial color="#94a3b8" />
            </Text>
          </Center>
          <Center position={[-2.0, -0.3, 0.1]}>
            <Text fontSize={0.45}>
              ₹0
              <meshStandardMaterial color="#4ade80" />
            </Text>
          </Center>

          <Center position={[0, 0.1, 0.1]}>
            <Text fontSize={0.22}>
              TOTAL EXPENSES
              <meshStandardMaterial color="#94a3b8" />
            </Text>
          </Center>
          <Center position={[0, -0.3, 0.1]}>
            <Text fontSize={0.45}>
              ₹0
              <meshStandardMaterial color="#f87171" />
            </Text>
          </Center>

          <Center position={[2.0, 0.1, 0.1]}>
            <Text fontSize={0.22}>
              REMAINING BALANCE
              <meshStandardMaterial color="#94a3b8" />
            </Text>
          </Center>
          <Center position={[2.0, -0.3, 0.1]}>
            <Text fontSize={0.45}>
              ₹0
              <meshStandardMaterial color="#D8B56A" />
            </Text>
          </Center>

          <Center position={[0, -0.9, 0.1]}>
            <Text fontSize={0.2}>
              100% Transparent • Every Penny Accounted For
              <meshStandardMaterial color="#F4F1EA" />
            </Text>
          </Center>
        </Float>
      </group>

      {/* =================================================== */}
      {/* DESTINATION 3: STUDENT HELP HUB (Right, Position Z = -16) */}
      {/* =================================================== */}
      <group position={[4.2, 0.5, -9]}>
        <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
          {/* Digital Gateway Arch / Portal Geometry */}
          <mesh position={[0, 0, -0.2]}>
            <torusGeometry args={[1.8, 0.12, 16, 64, Math.PI]} />
            <meshStandardMaterial
              color="#6C63A8"
              metalness={0.9}
              roughness={0.2}
              emissive="#244C7A"
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* Portal Inner Glow */}
          <pointLight position={[0, 0.5, 0]} intensity={2.5} color="#6C63A8" distance={8} />

          <Center position={[0, 0.6, 0.1]}>
            <Text fontSize={0.5} letterSpacing={0.15}>
              STUDENT HELP HUB
              <meshStandardMaterial color="#F4F1EA" metalness={0.7} roughness={0.2} />
            </Text>
          </Center>

          <Center position={[0, 0, 0.1]}>
            <Text fontSize={0.24} letterSpacing={0.08}>
              “Know Your College. Know Your People.”
              <meshStandardMaterial color="#D8B56A" />
            </Text>
          </Center>
        </Float>
      </group>
    </group>
  );
}
