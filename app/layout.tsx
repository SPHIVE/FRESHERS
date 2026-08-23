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
        <footer className="relative z-10 border-t border-navy-800/60 py-6 text-center text-xs text-slate-500 bg-[#050914]/90 backdrop-blur-md">
          <p>© 2026 IICT Student Association. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
