import { Suspense, lazy } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

const WelcomeContent = lazy(() => import("../welcome/WelcomeContent"));

export default function WelcomeScreen() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
