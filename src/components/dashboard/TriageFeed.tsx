"use client";

import React from 'react';
import { FiAlertTriangle, FiClock, FiUser } from 'react-icons/fi';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Incident } from '@/types/types';

interface TriageFeedProps {
  incidents: Incident[];
  navigateToIncidents: () => void;
}

const TriageFeed = ({ incidents, navigateToIncidents }: TriageFeedProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-red-400';
      case 'investigating':
        return 'text-yellow-400';
      case 'resolved':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Sort incidents by severity and time
  const sortedIncidents = [...incidents].sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    const severityDiff = severityOrder[b.severity as keyof typeof severityOrder] - 
                        severityOrder[a.severity as keyof typeof severityOrder];
    
    if (severityDiff !== 0) return severityDiff;
    
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Card variant="cyber">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FiAlertTriangle className="w-5 h-5" />
          <span>Live Triage Feed</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto p-3">
          {sortedIncidents.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No active incidents
            </div>
          ) : (
            sortedIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-3 rounded-lg border transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                style={{
                  backgroundColor: `${getSeverityColor(incident.severity).includes('red') ? 'rgb(127 29 29 / 0.1)' :
                    getSeverityColor(incident.severity).includes('yellow') ? 'rgb(113 63 18 / 0.1)' :
                    'rgb(20 83 45 / 0.1)'}`
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className={`text-sm font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <FiClock className="w-3 h-3" />
                    <span>{formatTimeAgo(incident.created_at)}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-white mb-1 line-clamp-1">
                  {incident.title}
                </h4>
                
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {incident.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    {incident.source_ip && (
                      <span className="text-cyan-400">
                        IP: {incident.source_ip}
                      </span>
                    )}
                    {incident.affected_assets.length > 0 && (
                      <span className="text-purple-400">
                        Assets: {incident.affected_assets.length}
                      </span>
                    )}
                  </div>
                  
                  {incident.assigned_to && (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <FiUser className="w-3 h-3" />
                      <span>{incident.assigned_to}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        {sortedIncidents.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-700 text-center">
            <button onClick={navigateToIncidents} className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              View All Incidents ({sortedIncidents.length})
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TriageFeed;