"use client";

import React from "react";
import { Award, Sparkles, UserCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface Contributor {
  id: string;
  fullName: string;
  batchLabel: string;
  photoUrl?: string;
  amount: number;
}

interface ContributorsProps {
  contributors?: Contributor[];
}

export function ContributorsTeaser({ contributors = [] }: ContributorsProps) {
  const hasContributors = contributors.length > 0;

  return (
    <div id="contributors-section" className="space-y-8 py-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
          <Award className="w-4 h-4 text-gold-400" />
          <span>Hall of Recognition</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 uppercase tracking-tight">
          THE CONTRIBUTORS
        </h2>

        <p className="text-xs sm:text-sm text-gold-400 font-semibold uppercase tracking-wider">
          “The People Who Made It Possible.”
        </p>
      </div>

      {/* 3D Contributor Showcase or Elegant Empty State */}
      {!hasContributors ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-12 rounded-3xl text-center border border-gold-500/30 space-y-5 max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold-radial opacity-30 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 border-2 border-gold-500/40 text-gold-400 mx-auto shadow-gold-sm">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-100 gold-gradient-text uppercase">
                Contributor Wall Opening Soon
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Verified Fresher Party 2026 contributors will receive their 3D honor card on this wall once contribution verification begins.
              </p>
            </div>

            <div className="pt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950/80 border border-navy-700 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span>Admin Verified Contributor Status</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contributors.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-card p-6 rounded-3xl border border-gold-500/30 space-y-4 relative"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl border-2 border-gold-500/40 overflow-hidden bg-navy-900 shrink-0">
                  {c.photoUrl ? (
                    <img src={c.photoUrl} alt={c.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gold-400 font-black text-lg">
                      {c.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-100">{c.fullName}</h3>
                  <p className="text-xs text-gold-400">Batch {c.batchLabel}</p>
                  <p className="text-xs text-emerald-400 font-extrabold mt-1">
                    Contributed ₹{c.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="pt-2 text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1 border-t border-navy-800">
                <UserCheck className="w-3.5 h-3.5" /> Verified Contributor
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
