"use client";

import React, { useState, useMemo, useCallback } from 'react';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { TicketModal } from '@/components/dashboard/TicketModal';
import { Grid } from '@/components/dashboard/Grid';
import { IncidentsList } from '@/components/incidents/IncidentsList';

import { useUser } from '@/hooks/useUser';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('Last 24 hours');
  const [showTicketModal, setShowTicketModal] = useState(false);
  
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  const handleRaiseTicket = useCallback(() => {
    setShowTicketModal(true);
    setTimeout(() => {
      setShowTicketModal(false);
      alert('Ticket creation feature would be implemented here');
    }, 1000);
  }, []);

  const handleToggleTimeRange = useCallback(() => {
    const ranges = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];
    const currentIndex = ranges.indexOf(timeRange);
    setTimeRange(ranges[(currentIndex + 1) % ranges.length]);
  }, [timeRange]);

  const view = useMemo(() => {
    switch (activeView) {
      case 'dashboard':
        return (
          <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6 overflow-y-auto overflow-x-hidden scrollable-content">
            <Grid setActiveView={setActiveView}/>

            <TicketModal showTicketModal={showTicketModal} />
          </main>
        )
      
      case 'incidents':
        return (
          <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6 overflow-y-auto overflow-x-hidden scrollable-content">
            <IncidentsList />
          </main>
        )
    
      default:
        return (
          <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6 overflow-y-auto overflow-x-hidden scrollable-content">
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
        )
    }
  }, [activeView, showTicketModal])
  
  if (userLoading) {
    return (
      <div className="h-screen h-dvh max-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-cyan-400 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="h-screen h-dvh max-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Failed to load user data</p>
          <Button onClick={() => window.location.reload()} className="bg-cyan-600 hover:bg-cyan-700">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen h-dvh max-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-dvh max-h-screen bg-gray-900 flex flex-col lg:flex-row overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col h-full max-h-full">
        <Header
          user={user}
          onRaiseTicket={handleRaiseTicket}
          onToggleTimeRange={handleToggleTimeRange}
          timeRange={timeRange}
        />
        {view}
      </div>
    </div>
  );
}