"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FiSearch, FiAlertCircle, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

interface IncidentSummaryProps {
  totalInvestigated: number;
  totalEscalated: number;
  truePositives: number;
  period?: string;
}

export default function IncidentSummary({ 
  totalInvestigated, 
  totalEscalated, 
  truePositives,
  period = '24h'
}: IncidentSummaryProps) {
  const escalationRate = totalInvestigated > 0 ? (totalEscalated / totalInvestigated) * 100 : 0;
  const truePositiveRate = totalInvestigated > 0 ? (truePositives / totalInvestigated) * 100 : 0;

  const summaryItems = [
    {
      label: 'Investigated',
      value: totalInvestigated,
      icon: FiSearch,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20',
      borderColor: 'border-cyan-500/30',
    },
    {
      label: 'Escalated',
      value: totalEscalated,
      icon: FiAlertCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-500/30',
      percentage: escalationRate,
    },
    {
      label: 'True Positives',
      value: truePositives,
      icon: FiCheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      percentage: truePositiveRate,
    },
  ];

  return (
    <Card variant="cyber">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Incident Summary</span>
          <span className="text-sm text-gray-400 font-normal">Last {period}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {summaryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${item.bgColor} ${item.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className={`text-2xl font-bold ${item.color}`}>
                        {item.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {item.percentage !== undefined && (
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${item.color}`}>
                        {item.percentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-400">of total</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Detection Accuracy</span>
            <div className="flex items-center space-x-1">
              <FiTrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">
                {truePositiveRate.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-300"
              style={{ width: `${truePositiveRate}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>Target: &gt;85%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-400">
              {totalInvestigated - totalEscalated}
            </div>
            <div className="text-gray-400">Auto-Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-400">
              {Math.round(totalInvestigated / 24)}
            </div>
            <div className="text-gray-400">Avg/Hour</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}