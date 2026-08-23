import React from "react";
import { requireApprovedUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { HelpHubHero3D } from "@/app/components/3d/HelpHubHero3D";
import { BookOpen, Building2, UserCheck, Users, Award, Sparkles, Lock, ArrowRight } from "lucide-react";
import StudentDirectoryPortal from "./student-directory-portal";

export const revalidate = 0;

export const metadata = {
  title: "Student Help Hub | UNOFFICIAL IICT",
  description: "Verified student resource portal, dynamic batch directories, faculty information, and student positions.",
};

export default async function HelpHubPage() {
  await requireApprovedUser();
  const supabase = await createClient();

  // Fetch dynamic batches from database
  const { data: batches } = await supabase
    .from("batches")
    .select("id, label, start_year, end_year")
    .eq("active", true)
    .order("start_year", { ascending: true });

  const fallbackBatches = [
    { id: "b1", label: "2023–2027", start_year: 2023, end_year: 2027 },
    { id: "b2", label: "2024–2028", start_year: 2024, end_year: 2028 },
    { id: "b3", label: "2025–2029", start_year: 2025, end_year: 2029 },
    { id: "b4", label: "2026–2030", start_year: 2026, end_year: 2030 },
  ];

  const activeBatches = batches && batches.length > 0 ? batches : fallbackBatches;

  // Fetch approved safe public student profiles
  const { data: studentProfiles } = await supabase
    .from("public_student_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="relative min-h-screen selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 3D Atmospheric Portal Scene */}
      <HelpHubHero3D />

      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221]/90 border border-[#6C63A8]/60 text-[#D8B56A] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg">
            <BookOpen className="w-3.5 h-3.5 text-[#D8B56A]" />
            <span>PROTECTED STUDENT PORTAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#F4F1EA] uppercase tracking-tight">
            STUDENT <span className="text-[#6C63A8]">HELP HUB</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 tracking-[0.2em] uppercase font-bold">
            Know Your College. Know Your People.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed pt-1 font-medium">
            Centralized resource environment for verified IICT students. Explore batch rosters, senior connection channels, faculty lists, and leadership representatives.
          </p>
        </div>

        {/* Interactive Student Directory & Batch Selector */}
        <StudentDirectoryPortal batches={activeBatches} students={studentProfiles || []} />
      </div>
    </div>
  );
}
