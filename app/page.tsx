"use client";

import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

export default function LandingPage() {
  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[300vh] text-[#F4F1EA] selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 1. Full-Screen 100vw x 100dvh 3D Scene Background */}
      <SceneCanvas />

      {/* 2. Hero Overlay Content */}
      <div className="relative z-10 min-h-[85vh] flex flex-col justify-between py-6 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        {/* Empty space top to account for floating Navbar */}
        <div className="h-12" />

        {/* Center Tagline & Primary CTA */}
        <div className="text-center space-y-5 max-w-xl mx-auto my-auto pt-32 sm:pt-44 pointer-events-auto">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#F4F1EA] uppercase drop-shadow-md">
            “A New Beginning. A Lifetime of Memories.”
          </p>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={handleExploreClick}
              className="px-8 py-3.5 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2.5 group cursor-pointer transition-all uppercase tracking-widest"
            >
              <span>EXPLORE EXPERIENCE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-4 pointer-events-auto">
          <div className="inline-flex flex-col items-center gap-1.5 text-[11px] text-slate-400 font-semibold tracking-widest uppercase">
            <span>Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 text-[#D8B56A] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
