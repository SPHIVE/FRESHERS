"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Center } from "@react-three/drei";
import * as THREE from "three";

interface TitleProps {
  isMobile?: boolean;
}

export function Fresher3DTitle({ isMobile = false }: TitleProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle float & rotation reaction
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  const fontSizeTitle = isMobile ? 1.15 : 1.95;
  const fontSizeYear = isMobile ? 0.9 : 1.4;

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0.5, 0]}>
        <Center position={[0, 1.4, 0]}>
          {/* FRESHER - Metallic Chrome / Silver */}
          <Text
            fontSize={fontSizeTitle}
            fontStyle="italic"
            letterSpacing={0.12}
            lineHeight={1}
            castShadow
            receiveShadow
          >
            FRESHER
            <meshStandardMaterial
              color="#f8fafc"
              metalness={0.95}
              roughness={0.15}
              envMapIntensity={2.5}
            />
          </Text>
        </Center>

        <Center position={[0, 0, 0]}>
          {/* PARTY - Metallic Gold */}
          <Text
            fontSize={fontSizeTitle}
            letterSpacing={0.18}
            lineHeight={1}
            castShadow
            receiveShadow
          >
            PARTY
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.9}
              roughness={0.2}
              emissive="#aa8625"
              emissiveIntensity={0.15}
            />
          </Text>
        </Center>

        <Center position={[0, -1.2, 0]}>
          {/* 2026 - Glowing Emissive Gold */}
          <Text
            fontSize={fontSizeYear}
            letterSpacing={0.3}
            lineHeight={1}
          >
            2026
            <meshStandardMaterial
              color="#f5d77f"
              metalness={0.8}
              roughness={0.2}
              emissive="#d4af37"
              emissiveIntensity={0.6}
            />
          </Text>
        </Center>
      </group>
    </Float>
  );
}
