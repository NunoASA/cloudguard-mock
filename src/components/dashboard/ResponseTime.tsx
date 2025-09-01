"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FiClock, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface ResponseTimeProps {
  mttr: number; // in minutes
  trend: number; // percentage change
}

const ResponseTime = ({ mttr, trend }: ResponseTimeProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const getTrendColor = () => {
    return trend < 0 ? 'text-green-400' : trend > 0 ? 'text-red-400' : 'text-gray-400';
  };

  const getTrendIcon = () => {
    if (trend < 0) return <FiTrendingDown className="w-4 h-4 text-green-400" />;
    if (trend > 0) return <FiTrendingUp className="w-4 h-4 text-red-400" />;
    return null;
  };

  const getMTTRStatus = () => {
    if (mttr <= 30) return { status: 'Excellent', color: 'text-green-400' };
    if (mttr <= 60) return { status: 'Good', color: 'text-yellow-400' };
    if (mttr <= 120) return { status: 'Average', color: 'text-orange-400' };
    return { status: 'Needs Improvement', color: 'text-red-400' };
  };

  const status = getMTTRStatus();

  return (
    <Card variant={mttr <= 60 ? 'success' : mttr <= 120 ? 'default' : 'critical'}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FiClock className="w-5 h-5" />
          <span>Mean Time to Respond</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center h-[90%]">
        <div className="text-center mb-4">
          <div className={`text-4xl font-bold ${status.color} neon-text`}>
            {formatTime(mttr)}
          </div>
          <div className="text-lg text-gray-400">MTTR</div>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          {getTrendIcon()}
          <span className={`font-semibold ${getTrendColor()}`}>
            {trend === 0 ? 'No change' : `${Math.abs(trend)}% ${trend < 0 ? 'improvement' : 'slower'}`}
          </span>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Performance Status</span>
            <span className={`font-semibold ${status.color}`}>{status.status}</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                mttr <= 30 ? 'bg-green-400' :
                mttr <= 60 ? 'bg-yellow-400' :
                mttr <= 120 ? 'bg-orange-400' : 'bg-red-400'
              }`}
              style={{ 
                width: `${Math.min(100, (240 - mttr) / 240 * 100)}%` 
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0m</span>
            <span>Target: &lt;30m</span>
            <span>240m</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-cyan-400">
              {Math.max(0, 30 - mttr)}m
            </div>
            <div className="text-gray-400">Below Target</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-400">
              24h
            </div>
            <div className="text-gray-400">Tracking Period</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseTime;