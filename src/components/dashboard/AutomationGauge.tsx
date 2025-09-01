"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AutomationGaugeProps {
  automationRate: number;
}

const AutomationGauge = ({ automationRate }: AutomationGaugeProps) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (automationRate / 100) * circumference;

  return (
    <Card variant="cyber">
      <CardHeader>
        <CardTitle>Automation Rate</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center h-[90%]">
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform rotate-180"
            >
              <circle
                stroke="#374151"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                style={{ strokeDashoffset: circumference / 2 }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#00BFFF"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                style={{ strokeDashoffset: strokeDashoffset + circumference / 2 }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">
                  {automationRate}%
                </div>
                <div className="text-sm text-gray-400">Automated</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-cyan-400">
              {automationRate}%
            </div>
            <div className="text-sm text-gray-400">Automated</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-400">
              {100 - automationRate}%
            </div>
            <div className="text-sm text-gray-400">Manual</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationGauge;