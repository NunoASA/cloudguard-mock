"use client";

import React from 'react';
import { FiClock, FiUser, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingCard } from '@/components/ui/LoadingCard';
import { useIncidents } from '@/hooks/useIncidents';
import { Incident } from '@/types/types';

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case 'high':
      return {
        icon: <FiAlertTriangle className="w-4 h-4 text-red-400" />,
        color: 'text-red-400 bg-red-900/20 border-red-500/20'
      };
    case 'medium':
      return {
        icon: <FiAlertTriangle className="w-4 h-4 text-orange-400" />,
        color: 'text-orange-400 bg-orange-900/20 border-orange-500/20'
      };
    case 'low':
      return {
        icon: <FiAlertTriangle className="w-4 h-4 text-yellow-400" />,
        color: 'text-yellow-400 bg-yellow-900/20 border-yellow-500/20'
      };
    default:
      return {
        icon: <FiAlertTriangle className="w-4 h-4 text-gray-400" />,
        color: 'text-gray-400 bg-gray-900/20 border-gray-500/20'
      };
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'text-green-400 bg-green-900/20 border-green-500/20';
    case 'investigating':
      return 'text-blue-400 bg-blue-900/20 border-blue-500/20';
    case 'open':
      return 'text-orange-400 bg-orange-900/20 border-orange-500/20';
    default:
      return 'text-gray-400 bg-gray-900/20 border-gray-500/20';
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  return (
    <Card className="border border-gray-700 hover:border-cyan-500/30 transition-colors">
      <CardContent className="md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getSeverityConfig(incident.severity).icon}
            <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
          </div>
          <div className="text-sm text-gray-400">
            <FiClock className="w-4 h-4 inline mr-1" />
            {formatTimeAgo(incident.created_at)}
          </div>
        </div>
        
        <p className="text-gray-300 mb-4">{incident.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityConfig(incident.severity).color}`}>
            {incident.severity.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(incident.status)}`}>
            {incident.status.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            {incident.assigned_to && (
              <div className="flex items-center space-x-1">
                <FiUser className="w-4 h-4" />
                <span>{incident.assigned_to}</span>
              </div>
            )}
            {incident.source_ip && (
              <div>
                <span className="text-gray-500">Source:</span> {incident.source_ip}
              </div>
            )}
          </div>
          {incident.response_time && (
            <div className="text-cyan-400">
              Response: {incident.response_time}m
            </div>
          )}
        </div>
        
        {incident.affected_assets.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Affected Assets:</div>
            <div className="flex flex-wrap gap-1">
              {incident.affected_assets.map((asset, index) => (
                <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                  {asset}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const IncidentsList = () => {
  const { data: incidents, isLoading, error, refetch } = useIncidents();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">Security Incidents</h1>
          <p className="text-gray-400">Monitor and manage security incidents in your environment</p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          <FiRefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <LoadingCard isLoading={isLoading} error={!!error}>
        <div className="grid gap-4">
          {incidents?.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
          {incidents?.length === 0 && (
            <Card className="border border-gray-700">
              <CardContent className="p-12 text-center">
                <FiAlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Incidents Found</h3>
                <p className="text-gray-400">All systems are running smoothly</p>
              </CardContent>
            </Card>
          )}
        </div>
      </LoadingCard>
    </div>
  );
};