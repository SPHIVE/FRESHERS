"use client";

import React, { useState } from "react";
import { Building2, UserCheck, Users, Sparkles, Award, Search, User, ShieldCheck, ArrowRight, GraduationCap } from "lucide-react";

interface BatchItem {
  id: string;
  label: string;
  start_year: number;
  end_year: number;
}

interface StudentItem {
  id: string;
  full_name: string;
  profile_photo_url: string | null;
  batch_id: string | null;
  batch_label: string | null;
  position?: string;
}

export default function StudentDirectoryPortal({
  batches,
  students,
}: {
  batches: BatchItem[];
  students: StudentItem[];
}) {
  const [selectedBatch, setSelectedBatch] = useState<string | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"DIRECTORIES" | "COLLEGE_INFO" | "FACULTY" | "POSITIONS">("DIRECTORIES");

  // Filter students based on selected batch and search query
  const filteredStudents = students.filter((s) => {
    const matchesBatch = selectedBatch === "ALL" || s.batch_label === selectedBatch || s.batch_id === selectedBatch;
    const matchesSearch = s.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  const destinationCards = [
    {
      id: "DIRECTORIES",
      title: "ALL BATCHES DIRECTORY",
      subtitle: "Explore rosters for 2023–2027, 2024–2028, 2025–2029, 2026–2030",
      icon: Users,
      badge: "ACTIVE DIRECTORY",
    },
    {
      id: "COLLEGE_INFO",
      title: "COLLEGE INFORMATION",
      subtitle: "Academic calendar, campus guidelines, and IICT facilities",
      icon: Building2,
      badge: "CAMPUS GUIDE",
    },
    {
      id: "FACULTY",
      title: "FACULTY DIRECTORY",
      subtitle: "IICT Professors, Department Heads, and Academic Advisors",
      icon: UserCheck,
      badge: "ACADEMIC STAFF",
    },
    {
      id: "POSITIONS",
      title: "STUDENT POSITIONS",
      subtitle: "General Secretary, TPRs, Sports & Cultural Reps",
      icon: Award,
      badge: "LEADERSHIP",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Editorial Destination Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinationCards.map((card) => {
          const Icon = card.icon;
          const isActive = activeTab === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id as any)}
              className={`p-6 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer ${
                isActive
                  ? "bg-[#081221] border-[#D8B56A] shadow-[0_0_30px_rgba(216,181,106,0.2)]"
                  : "bg-[#081221]/60 border-[#6C63A8]/30 hover:border-[#D8B56A]/50 hover:bg-[#081221]/90"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-[#D8B56A] px-2.5 py-1 rounded-full bg-[#050914] border border-[#D8B56A]/20 uppercase tracking-widest">
                  {card.badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-[#F4F1EA] uppercase tracking-wider mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Primary Section: All Batches Directory */}
      {activeTab === "DIRECTORIES" && (
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-8 shadow-2xl">
          {/* Controls Bar: Batch Pills + Search Input */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            {/* Batch Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedBatch("ALL")}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBatch === "ALL"
                    ? "gold-gradient-btn"
                    : "bg-[#050914] text-slate-300 border border-slate-800 hover:border-[#D8B56A]/40"
                }`}
              >
                ALL BATCHES
              </button>
              {batches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBatch(b.label)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedBatch === b.label
                      ? "gold-gradient-btn"
                      : "bg-[#050914] text-slate-300 border border-slate-800 hover:border-[#D8B56A]/40"
                  }`}
                >
                  BATCH {b.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search student by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
              />
            </div>
          </div>

          {/* Student Roster Grid (Strict Privacy Enforced: ONLY photo, name, batch, position) */}
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  className="p-6 rounded-3xl bg-[#050914]/90 border border-slate-800 hover:border-[#D8B56A]/50 flex flex-col items-center text-center space-y-4 shadow-lg hover:-translate-y-1 transition-all"
                >
                  {/* Photo Frame */}
                  <div className="w-20 h-20 rounded-full border-2 border-[#D8B56A]/40 bg-[#081221] overflow-hidden flex items-center justify-center shadow-md">
                    {s.profile_photo_url ? (
                      <img src={s.profile_photo_url} alt={s.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-[#D8B56A]/70" />
                    )}
                  </div>

                  {/* Public Details */}
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-[#F4F1EA] uppercase tracking-wide">
                      {s.full_name}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#D8B56A] font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Batch {s.batch_label || "IICT"}</span>
                    </span>
                  </div>

                  {s.position && (
                    <span className="px-3 py-1 rounded-full bg-[#6C63A8]/20 text-[#6C63A8] text-[10px] font-bold uppercase tracking-wider border border-[#6C63A8]/40">
                      {s.position}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center space-y-3 bg-[#050914]/60 rounded-2xl border border-slate-800">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wider">
                NO VERIFIED STUDENTS FOUND FOR THIS SELECTION
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Approved IICT student profiles for this batch will appear here as accounts are verified by administration.
              </p>
            </div>
          )}
        </div>
      )}

      {/* College Info Tab */}
      {activeTab === "COLLEGE_INFO" && (
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-6 shadow-2xl">
          <h3 className="text-xl font-black text-[#F4F1EA] uppercase tracking-wider">
            COLLEGE INFORMATION & GUIDELINES
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-medium">
            Indian Institute of Carpet Technology (IICT), Bhadohi is an autonomous institute established by Ministry of Textiles, Government of India. Access verified academic guidelines, campus code of conduct, and department resources.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#050914] border border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-[#D8B56A] uppercase">ACADEMIC CALENDAR</h4>
              <p className="text-xs text-slate-400">Exam schedules, semester breaks, and official holiday lists.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#050914] border border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-[#D8B56A] uppercase">CAMPUS FACILITIES</h4>
              <p className="text-xs text-slate-400">Library hours, computer labs, workshop facilities, and hostel rules.</p>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Directory Tab */}
      {activeTab === "FACULTY" && (
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-6 shadow-2xl">
          <h3 className="text-xl font-black text-[#F4F1EA] uppercase tracking-wider">
            FACULTY & ACADEMIC ADVISORS
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            IICT Professors, Department Heads, and Academic Mentors directory.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
            {[
              { name: "Dr. Faculty Director", dept: "Director / Academic Head" },
              { name: "Prof. Carpet Tech HOD", dept: "Textile & Carpet Technology" },
              { name: "Prof. Student Affairs", dept: "Student Welfare & Convenor" },
            ].map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#050914] border border-slate-800 space-y-2 text-center">
                <div className="w-16 h-16 rounded-full bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center text-[#D8B56A] mx-auto">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-sm text-[#F4F1EA] uppercase">{f.name}</h4>
                <p className="text-xs text-[#D8B56A]">{f.dept}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student Positions Tab */}
      {activeTab === "POSITIONS" && (
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-6 shadow-2xl">
          <h3 className="text-xl font-black text-[#F4F1EA] uppercase tracking-wider">
            STUDENT POSITIONS & COUNCIL REPS
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Official IICT Student Representatives, General Secretaries, TPRs, Sports and Cultural Coordinators.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
            {[
              { pos: "General Secretary", title: "Student Council Convenor" },
              { pos: "Training & Placement Rep (TPR)", title: "T&P Cell Coordinator" },
              { pos: "Cultural Secretary", title: "Fresher Party Event Lead" },
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#050914] border border-[#6C63A8]/40 space-y-2 text-center">
                <div className="w-14 h-14 rounded-full bg-[#081221] border border-[#6C63A8] flex items-center justify-center text-[#6C63A8] mx-auto">
                  <Award className="w-7 h-7" />
                </div>
                <h4 className="font-extrabold text-sm text-[#F4F1EA] uppercase">{p.pos}</h4>
                <p className="text-xs text-[#D8B56A] font-semibold">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
