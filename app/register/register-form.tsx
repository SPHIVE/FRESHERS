"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Hash, GraduationCap, Mail, Phone, Lock, Eye, EyeOff, Upload, AlertCircle, Loader2, CheckCircle2, Camera, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registerStudentAction } from "@/app/actions/auth";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

interface BatchOption {
  id: string;
  label: string;
  start_year: number;
  end_year: number;
}

export default function RegisterForm({ batches }: { batches: BatchOption[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Photo File Select & Direct Storage Upload
  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image size must be under 5MB.");
      return;
    }

    setError(null);
    setUploadingImage(true);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `registrations/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("student-profile-photos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        setError("Failed to upload profile photo. Please try another image.");
        setUploadingImage(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("student-profile-photos")
        .getPublicUrl(fileName);

      setPhotoUrl(publicUrlData.publicUrl);
    } catch (err: any) {
      console.error("Photo upload exception:", err);
      setError("Photo upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!photoUrl) {
      setError("Please select and upload your profile photo.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("profilePhotoUrl", photoUrl);

    const result = await registerStudentAction(formData);

    setSubmitting(false);

    if (!result.success) {
      setError(result.error || "Registration failed.");
    } else if (result.redirect) {
      router.push(result.redirect);
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-12 px-4 selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 1. Full-Screen Atmospheric 3D Scene Backdrop */}
      <SceneCanvas isAuthPage={true} />

      {/* 2. Asymmetrical Desktop Composition Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Side: Editorial Atmospheric Branding Area (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-6 p-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221]/90 border border-[#D8B56A]/40 text-[#D8B56A] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B56A]" />
            <span>UNOFFICIAL IICT</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-[#F4F1EA] uppercase tracking-tight leading-tight">
            STUDENT <span className="gold-gradient-text">REGISTRATION</span>
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Create your unified IICT student account. Access Student Help Hub resources, batch rosters, and Fresher Party 2026 contributions.
          </p>

          <div className="p-4 rounded-2xl bg-[#081221]/80 border border-[#D8B56A]/20 space-y-2">
            <span className="text-[10px] font-bold text-[#D8B56A] uppercase tracking-wider block">PRIVACY ASSURANCE</span>
            <p className="text-[11px] text-slate-400">Roll numbers, emails, and phone numbers are strictly protected via Supabase RLS and are never exposed publicly.</p>
          </div>
        </div>

        {/* Right Side: Smoked Dark Glass Registration Form */}
        <div className="lg:col-span-7 w-full max-w-lg mx-auto">
          <div className="backdrop-blur-2xl bg-[#050914]/90 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/35 shadow-[0_16px_50px_rgba(0,0,0,0.7)] space-y-6 text-center">
            {/* Logo Crest & UNOFFICIAL IICT */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-xl bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(216,181,106,0.15)]">
                <Sparkles className="w-5 h-5 text-[#D8B56A]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs tracking-widest text-[#F4F1EA] uppercase">
                  UNOFFICIAL
                </span>
                <span className="text-[9px] text-[#D8B56A] font-bold tracking-widest uppercase -mt-0.5">
                  IICT
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-[#F4F1EA] uppercase">
                CREATE ACCOUNT
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Join the IICT Student Community
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-2.5 text-left">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {/* Custom Profile Photo Avatar Uploader */}
              <div className="p-3.5 rounded-2xl bg-[#081221]/80 border border-[#D8B56A]/25 flex items-center gap-4 shadow-sm">
                <div className="w-16 h-16 rounded-full border-2 border-[#D8B56A]/50 bg-[#050914] overflow-hidden flex items-center justify-center relative shrink-0 shadow-[0_0_15px_rgba(216,181,106,0.2)]">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-[#D8B56A]/70" />
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-[#050914]/85 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-[#D8B56A] animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#050914] hover:bg-[#0D1624] text-slate-200 text-xs font-semibold border border-[#D8B56A]/40 cursor-pointer transition-all hover:border-[#D8B56A]">
                    <Upload className="w-3.5 h-3.5 text-[#D8B56A]" />
                    <span>{photoUrl ? "Change Photo" : "Upload Profile Photo"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <p className="text-[10px] text-slate-400">
                    {photoUrl ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Photo uploaded & ready
                      </span>
                    ) : (
                      "Select passport/front photo (max 5MB)"
                    )}
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                </div>
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Roll Number *
                </label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="rollNumber"
                    required
                    placeholder="e.g. IICT-2024-042"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 uppercase text-slate-100 font-medium"
                  />
                </div>
              </div>

              {/* Batch Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Batch Year *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  <select
                    name="batchId"
                    required
                    defaultValue=""
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input bg-[#081221] text-slate-100 cursor-pointer font-medium"
                  >
                    <option value="" disabled>Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch.id} value={batch.id} className="bg-[#050914] text-slate-100">
                        Batch {batch.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* CREATE ACCOUNT Gold Pill Button */}
              <button
                type="submit"
                disabled={submitting || uploadingImage}
                className="w-full py-3.5 rounded-full font-extrabold text-xs gold-gradient-btn flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 uppercase tracking-widest shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                    <span>CREATING ACCOUNT...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>CREATE ACCOUNT</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Link */}
            <div className="pt-3 text-center border-t border-slate-800/80 text-xs text-slate-400">
              <span>Already have an account? </span>
              <Link href="/login" className="text-[#D8B56A] font-bold hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
