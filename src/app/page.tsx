"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CGScore from '@/components/dashboard/CGScore';
import IncidentSeverity from '@/components/dashboard/IncidentSeverity';
import AutomationGauge from '@/components/dashboard/AutomationGauge';
import AssetMonitor from '@/components/dashboard/AssetMonitor';
import TriageFeed from '@/components/dashboard/TriageFeed';
import ResponseTime from '@/components/dashboard/ResponseTime';
import IncidentSummary from '@/components/dashboard/IncidentSummary';
import { Button } from '@/components/ui/button';
import { FiRefreshCw } from 'react-icons/fi';

import { user, incidents, metrics } from '@/lib/mockData';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('Last 24 hours');
  const [showTicketModal, setShowTicketModal] = useState(false);

  const handleRaiseTicket = () => {
    setShowTicketModal(true);
    // In a real app, this would open a ticket creation modal
    setTimeout(() => {
      setShowTicketModal(false);
      alert('Ticket creation feature would be implemented here');
    }, 1000);
  };

  const handleToggleTimeRange = () => {
    const ranges = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];
    const currentIndex = ranges.indexOf(timeRange);
    setTimeRange(ranges[(currentIndex + 1) % ranges.length]);
  };

  if (activeView !== 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-900 flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1">
          <Header
            user={user}
            onRaiseTicket={handleRaiseTicket}
            onToggleTimeRange={handleToggleTimeRange}
            timeRange={timeRange}
          />
          <main className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl font-bold text-cyan-400 neon-text mb-4">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </div>
              <p className="text-gray-400 text-lg">
                This section is under development. Navigate to Dashboard to see the SOC interface.
              </p>
              <Button
                onClick={() => setActiveView('dashboard')}
                className="mt-6 bg-cyan-600 hover:bg-cyan-700"
              >
                Return to Dashboard
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1">
        <Header
          user={user}
          onRaiseTicket={handleRaiseTicket}
          onToggleTimeRange={handleToggleTimeRange}
          timeRange={timeRange}
        />
        
        <main className="p-6">
          {/* {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-400">
              Error: {error}
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          )} */}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Row 1: Core Metrics */}
            <CGScore
              score={metrics.cgScore}
              trend={metrics.cgTrend}
              trendValue={5.2}
            />
            
            <IncidentSeverity data={metrics.incidentsBySevertiy} />
            
            <AutomationGauge automationRate={metrics.automationRate} />

            {/* Row 2: Monitoring & Response */}
            <AssetMonitor totalAssets={metrics.monitoredAssets} />
            
            <ResponseTime 
              mttr={metrics.mttr}
              trend={metrics.mttrTrend}
            />
            
            <IncidentSummary
              totalInvestigated={metrics.totalInvestigated}
              totalEscalated={metrics.totalEscalated}
              truePositives={metrics.truePositives}
            />

            {/* Row 3: Live Feed (Full Width) */}
            <div className="lg:col-span-2 xl:col-span-3">
              <TriageFeed incidents={incidents} navigateToIncidents={() => setActiveView('incidents')} />
            </div>
          </div>

          {/* Loading Indicator */}
          {/* {loading && (
            <div className="fixed bottom-4 right-4">
              <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-4 cyber-glow">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                  <span className="text-cyan-400">Updating data...</span>
                </div>
              </div>
            </div>
          )} */}

          {/* Ticket Modal Indicator */}
          {showTicketModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 border border-orange-500/50 rounded-lg p-6 cyber-glow-orange">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-orange-400 font-semibold">Creating Ticket...</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}