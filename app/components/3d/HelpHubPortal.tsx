"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Users, GraduationCap, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function HelpHubPortal() {
  return (
    <div className="py-12 relative overflow-hidden">
      {/* Background Portal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-radial opacity-30 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="glass-card p-8 sm:p-12 rounded-3xl border border-gold-500/30 text-center space-y-6 max-w-4xl mx-auto relative z-10 shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest mx-auto">
          <BookOpen className="w-4 h-4 text-gold-400" />
          <span>Central Student Directory & Resource Portal</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 uppercase tracking-tight">
            STUDENT HELP HUB
          </h2>
          <p className="text-sm sm:text-base text-gold-400 font-semibold uppercase tracking-wider">
            “Know Your College. Know Your People.”
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A protected environment exclusively for verified IICT students. Locate senior mentors, faculty profiles, batch rosters, and official student representative positions.
          </p>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-4 rounded-2xl bg-navy-950/70 border border-navy-700/60 space-y-1.5">
            <div className="flex items-center gap-2 text-gold-400">
              <Users className="w-4 h-4" />
              <h4 className="font-bold text-xs text-slate-200">All Batches Directory</h4>
            </div>
            <p className="text-[11px] text-slate-400">2023–2027, 2024–2028, 2025–2029 & 2026–2030 student rosters.</p>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/70 border border-navy-700/60 space-y-1.5">
            <div className="flex items-center gap-2 text-gold-400">
              <GraduationCap className="w-4 h-4" />
              <h4 className="font-bold text-xs text-slate-200">Know Your Seniors</h4>
            </div>
            <p className="text-[11px] text-slate-400">Visual photo directories to connect with experienced IICT guides.</p>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/70 border border-navy-700/60 space-y-1.5">
            <div className="flex items-center gap-2 text-gold-400">
              <ShieldCheck className="w-4 h-4" />
              <h4 className="font-bold text-xs text-slate-200">Official Positions</h4>
            </div>
            <p className="text-[11px] text-slate-400">General Secretary, TPRs, Sports & Cultural reps.</p>
          </div>
        </div>

        {/* Portal Entry Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/help-hub"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 group"
          >
            <span>Enter Help Hub</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>Requires Admin-Approved Account</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
