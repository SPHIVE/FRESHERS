"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronDown, Compass } from "lucide-react";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

export default function LandingPage() {
  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[300vh] text-slate-100 selection:bg-gold-500 selection:text-navy-950">
      {/* 1. Full-Screen Interactive 3D Background Canvas */}
      <SceneCanvas />

      {/* 2. Minimal Hero UI Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between py-8 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        {/* Top Header Branding */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>IICT BHADOHI</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-gold-400 bg-navy-950/80 backdrop-blur-md border border-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4.5 py-1.5 rounded-xl text-xs font-bold gold-gradient-btn shadow-gold-sm"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Center Hero Tagline & CTA */}
        <div className="text-center space-y-6 max-w-xl mx-auto my-auto pt-48 sm:pt-60 pointer-events-auto">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-slate-200 uppercase drop-shadow-md">
            “A New Beginning. A Lifetime of Memories.”
          </p>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={handleExploreClick}
              className="px-8 py-3.5 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2.5 group cursor-pointer transition-all uppercase tracking-wider"
            >
              <span>EXPLORE EXPERIENCE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="text-center pt-8 pointer-events-auto">
          <div className="inline-flex flex-col items-center gap-1.5 text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
            <span>Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 text-gold-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
