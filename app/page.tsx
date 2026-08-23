import { Hero3DScene } from "@/app/components/3d/Hero3DScene";
import { QuickAccess3D } from "@/app/components/3d/QuickAccess3D";
import { Financial3DSection } from "@/app/components/3d/Financial3DSection";
import { ContributorsTeaser } from "@/app/components/3d/ContributorsTeaser";
import { HelpHubPortal } from "@/app/components/3d/HelpHubPortal";
import { EventTeaserScene } from "@/app/components/3d/EventTeaserScene";

export const revalidate = 0;

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. Full-Screen Interactive 3D Hero Scene */}
      <Hero3DScene />

      {/* 2. Interactive 3D Navigation Portals */}
      <QuickAccess3D />

      {/* 3. Real-Time Financial Transparency Ledger (Starts at ₹0) */}
      <Financial3DSection totalCollected={0} totalExpenses={0} />

      {/* 4. Hall of Recognition & Contributors Teaser */}
      <ContributorsTeaser contributors={[]} />

      {/* 5. Protected Student Help Hub Gateway */}
      <HelpHubPortal />

      {/* 6. Event Teaser Scene */}
      <EventTeaserScene />
    </div>
  );
}
