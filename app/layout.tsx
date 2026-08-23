import type { Metadata } from "next";
import "./globals.css";
import { getCurrentProfile } from "@/lib/auth/helpers";
import { Navbar } from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "IICT FRESHER PARTY 2026 & Student Help Hub",
  description: "Official 3D portal for IICT Fresher Party 2026, Student Directories, Leadership, and Help Hub resources.",
  keywords: ["IICT", "Fresher Party 2026", "Student Help Hub", "IICT Students", "Batch Directory"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfile();

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#050914] text-[#F4F1EA] selection:bg-[#D8B56A] selection:text-[#050914] overflow-x-hidden antialiased">
        {/* Floating Smoked Dark Glass Navbar */}
        <Navbar profile={profile} />

        {/* Main Content Area */}
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>

        {/* Minimal Footer */}
        <footer className="relative z-10 border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 bg-[#050914]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[11px]">
              <span className="text-[#D8B56A]">IICT BHADOHI</span>
              <span>•</span>
              <span>FRESHER PARTY 2026</span>
            </div>
            <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-400">
              <a href="/freshers" className="hover:text-[#D8B56A] transition-colors">Freshers</a>
              <a href="/contributors" className="hover:text-[#D8B56A] transition-colors">Contributors</a>
              <a href="/finance" className="hover:text-[#D8B56A] transition-colors">Finance</a>
              <a href="/help-hub" className="hover:text-[#D8B56A] transition-colors">Help Hub</a>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">© 2026 IICT Student Association. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
