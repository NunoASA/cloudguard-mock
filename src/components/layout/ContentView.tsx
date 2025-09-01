"use client";

import React from 'react';

import { Button } from '@/components/ui/button';
import { Grid } from '@/components/dashboard/Grid';
import { IncidentsList } from '@/components/incidents/IncidentsList';

interface ContentViewProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const ContentView = ({
  activeView,
  setActiveView,
}: ContentViewProps) => {
  switch (activeView) {
    case 'dashboard':
      return (
        <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6 overflow-y-auto overflow-x-hidden scrollable-content">
          <Grid setActiveView={setActiveView}/>
        </main>
      );
    
    case 'incidents':
      return (
        <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6 overflow-y-auto overflow-x-hidden scrollable-content">
          <IncidentsList />
        </main>
      );

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
      );
  }
};