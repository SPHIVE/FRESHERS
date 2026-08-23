"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraProps {
  mousePos: { x: number; y: number };
  onScrollProgress?: (progress: number) => void;
}

export function CameraJourneyController({
  mousePos,
  onScrollProgress,
}: CameraProps) {
  const vec = useRef(new THREE.Vector3());
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      scrollProgressRef.current = progress;
      if (onScrollProgress) {
        onScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollProgress]);

  useFrame((state) => {
    const p = scrollProgressRef.current;

    // Mouse parallax effect
    const mouseX = mousePos.x * 0.7;
    const mouseY = mousePos.y * 0.4 + 0.2;

    // Camera journey Z offset: moves from 7.5 down to -14 smoothly
    const targetZ = 7.5 - p * 21.5;
    const targetY = mouseY + p * 0.5;
    const targetX = mouseX + (p > 0.3 ? (p - 0.3) * 2.5 : 0);

    state.camera.position.lerp(
      vec.current.set(targetX, targetY, targetZ),
      0.05
    );

    // Look target shifts smoothly as camera pushes forward
    const lookZ = -p * 20;
    state.camera.lookAt(0, 0, lookZ);
  });

  return null;
}
