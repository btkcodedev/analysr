import { Suspense, lazy } from "react";
import type { ProcessedAnalytics } from "../../lib/motherduck/types";
import NoDataFallback from "../common/DataInfo/NoDataFallback";

const StatGrid = lazy(() => import("../dashboard/Analytics/StatGrid"));
const PositiveInsights = lazy(
  () => import("../dashboard/Analytics/PositiveInsights")
);
const KeyPhraseAnalysis = lazy(
  () => import("../dashboard/TextAnalysis/KeyPhraseAnalysis")
);
const AspectAnalysis = lazy(
  () => import("../dashboard/Analytics/AspectAnalysis")
);
const NegativeInsights = lazy(
  () => import("../dashboard/Analytics/NegativeInsights")
);
const TextAnalysis = lazy(() => import("../dashboard/TextAnalysis"));
const BusinessInsights = lazy(
  () => import("../dashboard/GPTInsights/BusinessInsights")
);

interface DashboardContentProps {
  analyticsData: ProcessedAnalytics | null;
  stack?: string;
  substack?: string;
  groqToken?: string;
}

export default function DashboardContent({
  analyticsData,
  stack,
  substack,
  groqToken,
}: DashboardContentProps) {
  if (!analyticsData || !analyticsData.totalReviews) {
    return <NoDataFallback />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6">
      <Suspense
        fallback={
          <div className="h-24 bg-gray-800/50 rounded-xl animate-pulse" />
        }
      >
        <StatGrid analyticsData={analyticsData} />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
        }
      >
        <BusinessInsights
          data={analyticsData}
          stack={stack!}
          substack={substack!}
          groqToken={groqToken}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
        }
      >
        {analyticsData?.positiveInsights && (
          <PositiveInsights data={analyticsData.positiveInsights} />
        )}
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense
          fallback={
            <div className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
          }
        >
          {analyticsData?.keyPhrases && (
            <KeyPhraseAnalysis data={analyticsData.keyPhrases} />
          )}
        </Suspense>

        <Suspense
          fallback={
            <div className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
          }
        >
          {analyticsData?.aspectAnalysis && (
            <AspectAnalysis data={analyticsData.aspectAnalysis} />
          )}
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
        }
      >
        {analyticsData?.textAnalysis && (
          <TextAnalysis data={analyticsData.textAnalysis} />
        )}
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 bg-gray-800/50 rounded-xl animate-pulse" />
        }
      >
        {analyticsData?.negativeInsights && (
          <NegativeInsights data={analyticsData.negativeInsights} />
        )}
      </Suspense>
    </div>
  );
}
