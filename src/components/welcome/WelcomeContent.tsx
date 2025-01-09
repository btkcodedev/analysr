import { Suspense } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import WelcomeHero from "./WelcomeHero";
import GetStartedSection from "./GetStartedSection";
import WelcomeBackground from "./WelcomeBackground";

export default function WelcomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-x-hidden">
      <WelcomeBackground />

      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <WelcomeHero />
            <GetStartedSection />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
