import { useLocation, Navigate } from 'react-router-dom';
import type { BusinessData } from '../onboarding/OnboardingForm';
import DashboardContent from '../dashboard/DashboardView/DashboardContent';
import DashboardError from '../dashboard/DashboardView/DashboardError';
import DashboardLoading from '../dashboard/DashboardView/DashboardLoading';
import StatusIndicator from '../common/ProgressLoader/StatusIndicator';
import MockDataBanner from '../common/DataInfo/MockDataBanner';
import NoDataFallback from '../common/DataInfo/NoDataFallback';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useStatus } from '../../hooks/useStatus';
import { useTokenStore } from '../../lib/motherduck/tokenStore';

export default function Dashboard() {
  const location = useLocation();
  const businessData = location.state as BusinessData;
  const token = useTokenStore((state) => state.token);

  if (!token || !businessData) {
    return <Navigate to="/onboarding" replace />;
  }
  
  const {
    data: analyticsData,
    loading,
    error,
    lastFetchTime,
    isMockData,
    loadingState,
    queryStats
  } = useAnalytics(
    businessData.database,
    businessData.tableName,
    businessData.limit || 'All',
    businessData.stack,
    businessData.substack,
    businessData.groqToken
  );

  const statusState = useStatus(loading, error, lastFetchTime);

  if (loading && loadingState) {
    return (
      <DashboardLoading 
        loadingState={loadingState} 
        debugInfo={{
          status: statusState.status,
          details: `Loading analytics data for ${businessData?.stack} - ${businessData?.substack}`,
          timestamp: new Date().toISOString(),
          queryCount: queryStats?.count
        }}
        onLoadComplete={() => {}} 
      />
    );
  }

  if (error) {
    return <DashboardError error={error} debugInfo="Error fetching analytics data" />;
  }

  if (!analyticsData || !analyticsData.totalReviews) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <StatusIndicator {...statusState} />
          <div className="mt-8">
            <NoDataFallback message={`No analytics data available for ${businessData?.stack} - ${businessData?.substack}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="space-y-6 mb-8">
        {isMockData && <MockDataBanner />}
        <StatusIndicator {...statusState} />
      </div>

      <DashboardContent 
        analyticsData={analyticsData} 
        stack={businessData.stack}
        substack={businessData.substack}
        groqToken={businessData.groqToken}
      />
    </div>
  );
}
