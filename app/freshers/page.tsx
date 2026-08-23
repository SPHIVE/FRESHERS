import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, MapPin, Clock, Shirt, Trophy, Music, Heart, ArrowRight, Bell, Star } from "lucide-react";
import { FreshersHero3D } from "@/app/components/3d/FreshersHero3D";

export const metadata = {
  title: "Freshers 2026 | UNOFFICIAL IICT",
  description: "Official event schedule, venue details, gala lineup, countdown, and announcements for IICT Fresher Party 2026.",
};

export default function FreshersPage() {
  const eventDateAvailable = false; // Toggle when official date is finalized

  const eventDetails = [
    { label: "EVENT DATE", value: eventDateAvailable ? "OCTOBER 24, 2026" : "TO BE ANNOUNCED", icon: Calendar, note: "Official Date Announcement Soon" },
    { label: "VENUE", value: "MAIN AUDITORIUM", icon: MapPin, note: "IICT Campus Bhadohi" },
    { label: "TIMINGS", value: "05:00 PM ONWARDS", icon: Clock, note: "Evening Cultural Gala" },
    { label: "DRESS CODE", value: "FORMAL / ETHNIC", icon: Shirt, note: "Champagne & Gold Accents" },
  ];

  const scheduleItems = [
    { time: "05:00 PM", title: "Grand Reception & Lamp Lighting", description: "Welcoming 2026 freshers, senior addresses, and traditional inauguration ceremony.", icon: Sparkles },
    { time: "05:45 PM", title: "Cultural Extravaganza & Music Showcase", description: "Live acoustic performances, group dances, and dramatic theater acts by senior & junior batches.", icon: Music },
    { time: "07:15 PM", title: "Mr. & Ms. Fresher 2026 Talent Hunt", description: "Ramp walk, Q&A round, and crowning of Mr. & Ms. Fresher 2026.", icon: Trophy },
    { time: "08:30 PM", title: "DJ Night & Gala Banquet Dinner", description: "Celebratory banquet dinner, DJ musical night, and batch memory photo booths.", icon: Heart },
  ];

  const announcements = [
    { id: 1, tag: "AUDITIONS", title: "Cultural & Anchor Auditions Open Soon", date: "Coming Soon", desc: "Registration details for performers and anchors will be released on the portal." },
    { id: 2, tag: "THEME", title: "Official Theme Reveal: Celestial Gold", date: "Upcoming", desc: "Get ready for a night of elegance, music, and golden memories." },
  ];

  return (
    <div className="relative min-h-screen selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 3D Atmospheric Hero Environment */}
      <FreshersHero3D />

      {/* Hero Content Section */}
      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221]/90 border border-[#D8B56A]/40 text-[#D8B56A] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B56A] animate-pulse" />
            <span>UNOFFICIAL IICT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F4F1EA] uppercase tracking-tight leading-none drop-shadow-xl">
            FRESHERS <span className="gold-gradient-text">2026</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#F1D28A] tracking-[0.2em] uppercase font-bold">
            A New Beginning. A Lifetime of Memories.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-2 font-medium">
            Celebrating the arrival of the newest batch to Indian Institute of Carpet Technology. Join us for an unforgettable evening of music, talent, and tradition.
          </p>

          <div className="pt-4 flex items-center justify-center">
            <Link
              href="/contribution"
              className="px-8 py-3.5 rounded-full gold-gradient-btn text-xs font-extrabold flex items-center gap-2.5 uppercase tracking-widest"
            >
              <span>CONTRIBUTE TO FRESHERS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Event Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eventDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="backdrop-blur-2xl bg-[#081221]/80 p-6 rounded-3xl border border-[#D8B56A]/25 flex flex-col justify-between space-y-4 shadow-xl hover:border-[#D8B56A]/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D8B56A]">
                    {item.label}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-black text-[#F4F1EA] tracking-wide">{item.value}</h3>
                  <p className="text-[11px] text-slate-400 pt-1 font-medium">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dimensional Countdown Container */}
        <div className="backdrop-blur-2xl bg-[#081221]/75 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8B56A]/5 to-transparent pointer-events-none" />
          
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D8B56A]">
              COUNTDOWN TO GALA
            </span>
            <h2 className="text-2xl font-black text-[#F4F1EA] uppercase tracking-wider">
              {eventDateAvailable ? "THE COUNTDOWN IS ON" : "DATE ANNOUNCEMENT COMING SOON"}
            </h2>
          </div>

          {eventDateAvailable ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
              {[
                { label: "DAYS", value: "30" },
                { label: "HOURS", value: "14" },
                { label: "MINUTES", value: "22" },
                { label: "SECONDS", value: "45" },
              ].map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#050914]/80 border border-[#D8B56A]/30">
                  <span className="block text-3xl sm:text-4xl font-black text-[#D8B56A] font-mono">{c.value}</span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#050914]/70 border border-[#D8B56A]/20 max-w-lg mx-auto">
              <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
                Official date and venue timing details are currently being finalized by the student organizing committee. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* Illuminated Gold Path Event Timeline */}
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-10 shadow-2xl">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D8B56A]">
              TENTATIVE LINEUP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F4F1EA] uppercase tracking-tight">
              EVENT TIMELINE
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto space-y-8 before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-ml-px before:w-0.5 before:bg-gradient-to-b before:from-[#D8B56A] before:via-[#D8B56A]/40 before:to-transparent">
            {scheduleItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group"
                >
                  {/* Timeline Gold Illuminated Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050914] border-2 border-[#D8B56A] flex items-center justify-center text-[#D8B56A] shadow-[0_0_15px_rgba(216,181,106,0.5)] z-10 group-hover:scale-110 transition-transform">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {/* Content Container */}
                  <div className="w-full sm:w-[calc(50%-2rem)] ml-14 sm:ml-0 p-6 rounded-2xl bg-[#050914]/90 border border-[#D8B56A]/20 hover:border-[#D8B56A]/60 transition-all shadow-lg">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 rounded-xl bg-[#081221] border border-[#D8B56A]/30 text-[#D8B56A] font-mono text-xs font-bold">
                        {item.time}
                      </span>
                      <Icon className="w-4 h-4 text-[#D8B56A]" />
                    </div>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#F4F1EA] tracking-wide mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Announcements & Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Announcements */}
          <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 rounded-3xl border border-[#D8B56A]/25 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#F4F1EA] uppercase tracking-wide">
                  LATEST ANNOUNCEMENTS
                </h3>
                <p className="text-xs text-slate-400">Official Fresher Party notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 rounded-2xl bg-[#050914]/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D8B56A]/15 text-[#D8B56A] border border-[#D8B56A]/30">
                      {ann.tag}
                    </span>
                    <span className="text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#F4F1EA]">{ann.title}</h4>
                  <p className="text-xs text-slate-400">{ann.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Highlights */}
          <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 rounded-3xl border border-[#D8B56A]/25 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#F4F1EA] uppercase tracking-wide">
                    EVENT HIGHLIGHTS
                  </h3>
                  <p className="text-xs text-slate-400">What to expect at Freshers 2026</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
                  <span>High-energy live music showcase and acoustic solos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
                  <span>Interactive Mr. & Ms. Fresher crown competition</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
                  <span>Professional 360 photo booth and memory captures</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
                  <span>Celebratory gala banquet dinner for freshers & seniors</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/contribution"
                className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-extrabold flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                <span>SUPPORT THE EVENT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
