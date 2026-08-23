"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function EventTeaserScene() {
  return (
    <div id="legendary-section" className="py-14 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative overflow-hidden glass-card p-8 sm:p-14 rounded-3xl border border-gold-500/40 text-center space-y-6 max-w-4xl mx-auto shadow-2xl"
      >
        {/* Dynamic Background Stage Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-radial opacity-30 blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-700/30 blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest mx-auto">
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>Official Fresher Celebration</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-widest text-slate-100 uppercase drop-shadow-md">
            SOMETHING <span className="gold-gradient-text block mt-1">LEGENDARY</span> IS COMING
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            IICT Bhadohi welcomes the incoming batch of 2026. Prepare for an unforgettable evening of performances, contributor recognition, awards, and student union traditions.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy-950/80 border border-navy-700">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Event Date: <strong className="text-slate-100">To Be Announced</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy-950/80 border border-navy-700">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Venue: <strong className="text-slate-100">IICT Main Campus Auditorium</strong></span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 group"
            >
              <span>Register Student Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-xs glass-card hover:bg-navy-800 text-slate-200 border border-slate-700 transition-all flex items-center justify-center"
            >
              Student Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
