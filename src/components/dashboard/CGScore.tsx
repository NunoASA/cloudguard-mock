"use client";

import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Metrics } from '@/types/types';

interface CGScoreProps {
  score: number;
  trend: Metrics["cgTrend"];
  trendValue: number;
}

export default function CGScore({ score, trend, trendValue }: CGScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <FiTrendingUp className="w-6 h-6 text-green-400" />;
      case 'down':
        return <FiTrendingDown className="w-6 h-6 text-red-400" />;
      default:
        return <FiMinus className="w-6 h-6 text-gray-400" />;
    }
  };

  const getScoreVariant = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'default';
    return 'critical';
  };

  return (
    <Card variant={getScoreVariant(score)} glow={score < 60}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Cyber Governance Score
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(score / 100) * 314} 314`}
                    className={getScoreColor(score)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </div>
                    <div className="text-sm text-gray-400">Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-gray-400">Trend:</span>
            <span className={trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}>
              {trend === 'stable' ? '±' : trend === 'up' ? '+' : ''}{trendValue}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}