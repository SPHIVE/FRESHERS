import Link from "next/link";
import { Sparkles, ShieldCheck, Users, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-radial pointer-events-none opacity-60 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs text-gold-300 border border-gold-500/30 mb-2">
          <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
          <span>Official IICT Student Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          <span className="block text-slate-100 uppercase font-black text-3xl sm:text-5xl">
            IICT Student Help Hub &
          </span>
          <span className="block gold-gradient-text mt-2 text-5xl sm:text-7xl font-black tracking-widest drop-shadow-md">
            FRESHER PARTY 2026
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Welcome to the official student portal for IICT. Connect with seniors, juniors, batchmates, and faculty members in one secure, unified experience.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 group"
          >
            <span>Register Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm glass-card hover:bg-navy-800/80 text-slate-200 border border-slate-700 hover:border-gold-500/40 transition-all flex items-center justify-center"
          >
            Student Login
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-16 text-left">
          <div className="glass-card p-5 rounded-2xl border border-navy-700/50 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-slate-100">Verified Access</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Admin-approved registrations ensure only verified IICT students can view directory information.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-navy-700/50 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-slate-100">Dynamic Batches</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Organized student directories across batches 2023–2027, 2024–2028, 2025–2029 & 2026–2030.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-navy-700/50 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-slate-100">Student Help Hub</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Centralized platform for college updates, faculty info, senior guides, and student positions.
            </p>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Private Data Encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Strict Privacy RLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
