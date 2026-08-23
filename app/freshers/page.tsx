import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, MapPin, Clock, Shirt, Trophy, Music, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Fresher Party 2026 | IICT Bhadohi",
  description: "Official event schedule, venue details, cultural lineup, and announcements for IICT Fresher Party 2026.",
};

export default function FreshersPage() {
  const eventDetails = [
    { label: "EVENT DATE", value: "TO BE ANNOUNCED", icon: Calendar, note: "Official Date Coming Soon" },
    { label: "VENUE", value: "MAIN AUDITORIUM", icon: MapPin, note: "IICT Campus Bhadohi" },
    { label: "TIMINGS", value: "05:00 PM ONWARDS", icon: Clock, note: "Evening Cultural Gala" },
    { label: "DRESS CODE", value: "FORMAL / ETHNIC", icon: Shirt, note: "Champagne & Gold Accents" },
  ];

  const scheduleItems = [
    { time: "05:00 PM", title: "Grand Reception & Lighting of the Lamp", description: "Welcoming 2026 freshers, faculty address, and traditional inauguration ceremony.", icon: Sparkles },
    { time: "05:45 PM", title: "Cultural Extravaganza & Music Showcase", description: "Live acoustic performances, group dances, and dramatic theater acts by senior & junior batches.", icon: Music },
    { time: "07:15 PM", title: "Mr. & Ms. Fresher 2026 Talent Hunt", description: "Ramp walk, Q&A round, and crowning of Mr. & Ms. Fresher 2026.", icon: Trophy },
    { time: "08:30 PM", title: "DJ Night & Gala Dinner", description: "Celebratory banquet dinner, DJ musical night, and batch memory photo booths.", icon: Heart },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 pt-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221] border border-[#D8B56A]/40 text-[#D8B56A] text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-4 h-4 text-[#D8B56A] animate-pulse" />
          <span>IICT BHADOHI OFFICIAL EVENT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#F4F1EA] uppercase tracking-tight">
          FRESHER PARTY <span className="gold-gradient-text">2026</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 tracking-wider uppercase font-semibold">
          “A New Beginning. A Lifetime of Memories.”
        </p>

        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed pt-2">
          Celebrating the arrival of the newest batch to Indian Institute of Carpet Technology. Join us for an unforgettable evening of music, talent, and tradition.
        </p>
      </div>

      {/* Event Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {eventDetails.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="backdrop-blur-2xl bg-[#081221]/80 p-6 rounded-2xl border border-[#D8B56A]/25 flex flex-col justify-between space-y-4 shadow-lg hover:border-[#D8B56A]/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D8B56A]">
                  {item.label}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-[#F4F1EA] tracking-wide">{item.value}</h3>
                <p className="text-[11px] text-slate-400 pt-1">{item.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Schedule Timeline */}
      <div className="backdrop-blur-2xl bg-[#081221]/70 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/25 space-y-8 shadow-2xl">
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D8B56A]">
            TENTATIVE LINEUP
          </p>
          <h2 className="text-2xl font-black text-[#F4F1EA] uppercase tracking-tight">
            EVENT SCHEDULE
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {scheduleItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#050914]/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#D8B56A]/40 transition-all"
              >
                <div className="px-3 py-1.5 rounded-xl bg-[#081221] border border-[#D8B56A]/30 text-[#D8B56A] font-mono text-xs font-bold shrink-0">
                  {item.time}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-sm text-[#F4F1EA] flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#D8B56A]" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link
          href="/contributors"
          className="p-6 rounded-2xl bg-[#081221]/80 border border-[#D8B56A]/25 hover:border-[#D8B56A]/60 flex items-center justify-between group transition-all"
        >
          <div>
            <h4 className="font-bold text-sm text-[#F4F1EA] group-hover:text-[#D8B56A] transition-colors">
              CONTRIBUTOR WALL
            </h4>
            <p className="text-xs text-slate-400">Meet event supporters & team</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#D8B56A] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/finance"
          className="p-6 rounded-2xl bg-[#081221]/80 border border-[#D8B56A]/25 hover:border-[#D8B56A]/60 flex items-center justify-between group transition-all"
        >
          <div>
            <h4 className="font-bold text-sm text-[#F4F1EA] group-hover:text-[#D8B56A] transition-colors">
              FINANCIAL TRANSPARENCY
            </h4>
            <p className="text-xs text-slate-400">100% Verified Expense Ledger</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#D8B56A] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/register"
          className="p-6 rounded-2xl bg-[#081221]/80 border border-[#D8B56A]/25 hover:border-[#D8B56A]/60 flex items-center justify-between group transition-all"
        >
          <div>
            <h4 className="font-bold text-sm text-[#F4F1EA] group-hover:text-[#D8B56A] transition-colors">
              REGISTER STUDENT ACCOUNT
            </h4>
            <p className="text-xs text-slate-400">Join IICT student portal</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#D8B56A] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
