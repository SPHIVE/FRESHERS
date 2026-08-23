"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
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
    <div className="relative min-h-[92vh] flex items-center justify-center py-12 px-4">
      {/* 1. Full-Screen Atmospheric 3D Scene Backdrop */}
      <SceneCanvas isAuthPage={true} />

      {/* 2. Smoked Dark Glass Auth Card (Matching input_file_0.png) */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-6">
        <div className="backdrop-blur-2xl bg-[#050914]/85 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/35 shadow-[0_16px_50px_rgba(0,0,0,0.7)] space-y-6 text-center">
          {/* Logo Crest & IICT BHADOHI */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-11 h-11 rounded-xl bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(216,181,106,0.15)]">
              <Sparkles className="w-5 h-5 text-[#D8B56A]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-widest text-[#F4F1EA] uppercase">
                IICT
              </span>
              <span className="text-[9px] text-[#D8B56A] font-bold tracking-widest uppercase -mt-0.5">
                BHADOHI
              </span>
            </div>
          </div>

          {/* Heading & Description */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-[#F4F1EA]">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400">
              Login to continue your journey
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-2.5 text-left">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email or Phone Number"
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
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

              <div className="text-right pt-2">
                <a href="#" className="text-[11px] text-[#D8B56A] font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* LOGIN Gold Pill Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-extrabold text-xs gold-gradient-btn flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 uppercase tracking-widest"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                  <span>LOGGING IN...</span>
                </>
              ) : (
                <span>LOGIN</span>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="pt-3 text-center border-t border-slate-800/80 text-xs text-slate-400">
            <span>Don't have an account? </span>
            <Link href="/register" className="text-[#D8B56A] font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

