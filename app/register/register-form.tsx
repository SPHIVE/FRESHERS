"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Hash, GraduationCap, Mail, Phone, Lock, Eye, EyeOff, Upload, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
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
    <div className="relative min-h-[90vh] flex items-center justify-center py-6 px-4">
      {/* 1. Interactive 3D Canvas Background */}
      <SceneCanvas />

      {/* 2. Split Screen / Centered Smoked Glass Registration Panel */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Branding Message (Desktop) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050914]/80 backdrop-blur-md border border-[#D8B56A]/30 text-[#D8B56A] text-[11px] font-bold tracking-widest uppercase w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B56A] animate-pulse" />
            <span>IICT BHADOHI</span>
          </div>

          <h1 className="text-3xl font-black text-[#F4F1EA] tracking-tight uppercase leading-tight">
            JOIN THE <span className="gold-gradient-text block">FRESHER PARTY 2026</span> ECOSYSTEM
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            Create your verified student account to access college batch directories, faculty information, contributor recognition, and student leadership positions.
          </p>

          <div className="p-3.5 rounded-2xl bg-[#050914]/80 border border-navy-700/80 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Admin Verified Access</span>
            </div>
            <p className="text-slate-400">
              Only verified IICT students receive access to protected student resources.
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form Card */}
        <div className="lg:col-span-8 w-full max-w-2xl mx-auto space-y-6">
          <div className="backdrop-blur-2xl bg-[#050914]/90 p-6 sm:p-9 rounded-3xl border border-[#D8B56A]/35 shadow-2xl space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-1">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <h2 className="text-2xl font-black text-[#F4F1EA] tracking-tight uppercase">
                STUDENT REGISTRATION
              </h2>
              <p className="text-xs text-slate-400">
                Official IICT student account setup
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Registration Issue</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Photo Uploader */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Profile Photo <span className="text-[#D8B56A]">*</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-navy-950/70 border border-navy-800">
                  <div className="w-20 h-20 rounded-2xl border-2 border-[#D8B56A]/40 bg-navy-900 overflow-hidden flex items-center justify-center relative shrink-0 shadow-sm">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-slate-500" />
                    )}
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-[#050914]/80 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-[#D8B56A] animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-[#D8B56A]" />
                      <span>{photoUrl ? "Change Photo" : "Upload Profile Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      {photoUrl ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1 justify-center sm:justify-start">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Photo uploaded successfully
                        </span>
                      ) : (
                        "Upload clear front-facing student photo (JPEG/PNG, max 5MB)"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Saurabh Kumar"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Roll Number <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="rollNumber"
                      required
                      placeholder="e.g. IICT-2024-042"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-600 uppercase text-slate-100"
                    />
                  </div>
                </div>

                {/* Batch Selection (Dynamic DB) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Batch <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    <select
                      name="batchId"
                      required
                      defaultValue=""
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input bg-[#050914] text-slate-100 cursor-pointer"
                    >
                      <option value="" disabled>Select your batch</option>
                      {batches.map((batch) => (
                        <option key={batch.id} value={batch.id} className="bg-navy-900 text-slate-100">
                          Batch {batch.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 9876543210"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="student@iict.ac.in"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Password <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Confirm Password <span className="text-[#D8B56A]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-600 text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || uploadingImage}
                className="w-full py-3.5 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:opacity-50 uppercase tracking-wider"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                    <span>CREATING ACCOUNT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>CREATE ACCOUNT</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-navy-800/80">
              <p className="text-xs text-slate-400">
                Already registered?{" "}
                <Link href="/login" className="text-[#D8B56A] font-bold hover:underline">
                  SIGN IN TO YOUR ACCOUNT
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
