
"use client";

import { FiRefreshCw } from 'react-icons/fi';

import CGScore from '@/components/dashboard/CGScore';
import IncidentSeverity from '@/components/dashboard/IncidentSeverity';
import AutomationGauge from '@/components/dashboard/AutomationGauge';
import AssetMonitor from '@/components/dashboard/AssetMonitor';
import TriageFeed from '@/components/dashboard/TriageFeed';
import ResponseTime from '@/components/dashboard/ResponseTime';
import IncidentSummary from '@/components/dashboard/IncidentSummary';
import { LoadingCard } from '@/components/ui/LoadingCard';
import { Button } from '@/components/ui/button';

import { useIncidents } from '@/hooks/useIncidents';
import { useMetrics } from '@/hooks/useMetrics';

export const Grid = ({ setActiveView } : { setActiveView: (view: string) => void }) => {
  const { data: incidents, isLoading: incidentsLoading, error: incidentsError } = useIncidents();
  const { data: metrics, isLoading: metricsLoading, error: metricsError, refetch: refetchMetrics, dataUpdatedAt } = useMetrics();

  return (
    <>
      {/* Refresh Button and Timestamp */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Last updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never'}
        </div>
        <Button
          onClick={() => refetchMetrics()}
          variant="outline"
          size="sm"
          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          <FiRefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      {/* Row 1: Core Metrics */}
      <LoadingCard isLoading={metricsLoading} error={!!metricsError}>
        <CGScore
          score={metrics?.cgScore || 0}
          trend={metrics?.cgTrend || 'stable'}
          trendValue={5.2}
        />
      </LoadingCard>
      
      <LoadingCard isLoading={metricsLoading} error={!!metricsError}>
        <IncidentSeverity data={metrics?.incidentsBySevertiy || { low: 0, medium: 0, high: 0 }} />
      </LoadingCard>
      
      <LoadingCard isLoading={metricsLoading} error={!!metricsError}>
        <AutomationGauge automationRate={metrics?.automationRate || 0} />
      </LoadingCard>

      {/* Row 2: Monitoring & Response */}
      <LoadingCard isLoading={metricsLoading} error={!!metricsError}>
        <AssetMonitor totalAssets={metrics?.monitoredAssets || 0} />
      </LoadingCard>
      
      <LoadingCard isLoading={metricsLoading} error={!!metricsError}>
        <ResponseTime 
          mttr={metrics?.mttr || 0}
          trend={metrics?.mttrTrend || 0}
        />
      </LoadingCard>
      
      <LoadingCard isLoading={metricsLoading} error={!!metricsError}>
        <IncidentSummary
          totalInvestigated={metrics?.totalInvestigated || 0}
          totalEscalated={metrics?.totalEscalated || 0}
          truePositives={metrics?.truePositives || 0}
        />
      </LoadingCard>

      {/* Row 3: Live Feed (Full Width) */}
      <div className="lg:col-span-2 xl:col-span-3">
        <LoadingCard isLoading={incidentsLoading} error={!!incidentsError}>
          <TriageFeed incidents={incidents || []} navigateToIncidents={() => setActiveView('incidents')} />
        </LoadingCard>
      </div>
    </div>
    </>
  )
}