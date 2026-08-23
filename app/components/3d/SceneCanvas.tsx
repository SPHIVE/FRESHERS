"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { LightingSystem } from "./LightingSystem";
import { HeroEnvironment3D } from "./HeroEnvironment3D";
import { FresherTypography3D } from "./FresherTypography3D";
import { NavDestinations3D } from "./NavDestinations3D";
import { CameraJourneyController } from "./CameraJourneyController";

interface SceneCanvasProps {
  isAuthPage?: boolean;
}

export function SceneCanvas({ isAuthPage = false }: SceneCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 w-full h-full min-h-screen z-0 pointer-events-none bg-[#050914] overflow-hidden">
        <Canvas
          camera={{
            position: isMobile ? [0, 0.45, 9.8] : [0, 0.4, 7.8],
            fov: isMobile ? 54 : 44,
          }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: true }}
        >
          {/* Studio Environment Map for Metallic Title & Stage Reflections */}
          <Environment preset="night" environmentIntensity={1.2} />

          <CameraJourneyController
            mousePos={mousePos}
            isMobile={isMobile}
            onScrollProgress={setScrollProgress}
          />
          <LightingSystem scrollProgress={scrollProgress} />
          <HeroEnvironment3D isMobile={isMobile} />

          {/* 3D Title is only shown on main Hero, not on Auth pages */}
          {!isAuthPage && <FresherTypography3D isMobile={isMobile} />}

          {/* NavDestinations3D is only visible when scrolling down */}
          {!isAuthPage && scrollProgress > 0.08 && <NavDestinations3D />}
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}


