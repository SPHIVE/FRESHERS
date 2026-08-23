"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { loginUserAction } from "@/app/actions/auth";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginUserAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Login failed");
    } else if (result.redirect) {
      router.push(result.redirect);
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-[88vh] flex items-center justify-center py-6 px-4">
      {/* 1. Interactive 3D World Background */}
      <SceneCanvas />

      {/* 2. Split Screen Auth Panel Layout */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: 3D Branding & Welcome Message (Desktop) */}
        <div className="hidden lg:flex flex-col space-y-6 text-left p-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050914]/80 backdrop-blur-md border border-[#D8B56A]/30 text-[#D8B56A] text-xs font-bold tracking-widest uppercase w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B56A] animate-pulse" />
            <span>IICT BHADOHI • STUDENT PORTAL</span>
          </div>

          <h1 className="text-4xl font-black text-[#F4F1EA] tracking-tight uppercase">
            WELCOME BACK TO <span className="gold-gradient-text block">FRESHER PARTY 2026</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md">
            Sign in to access your verified IICT student profile, financial transparency ledger, contributor recognition, and Student Help Hub resources.
          </p>

          <div className="pt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Student Gateway
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D8B56A]" />
              Strict RLS Protection
            </span>
          </div>
        </div>

        {/* Right Side: Smoked Dark Glass Form Card */}
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="backdrop-blur-2xl bg-[#050914]/90 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/35 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-1">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-[#F4F1EA] tracking-tight uppercase">
                STUDENT LOGIN
              </h2>
              <p className="text-xs text-slate-400">
                Continue your journey into the IICT ecosystem
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@iict.ac.in"
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:opacity-50 uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>LOGIN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 text-center border-t border-navy-800/80">
              <p className="text-xs text-slate-400">
                New here?{" "}
                <Link href="/register" className="text-[#D8B56A] font-bold hover:underline">
                  CREATE ACCOUNT
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
