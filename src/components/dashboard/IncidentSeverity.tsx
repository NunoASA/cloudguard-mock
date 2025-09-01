"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface IncidentSeverityProps {
  data: {
    low: number;
    medium: number;
    high: number;
  };
}

const IncidentSeverity = ({ data }: IncidentSeverityProps) => {
  const chartData = [
    { name: 'Low', value: data.low, fill: '#10B981' },
    { name: 'Medium', value: data.medium, fill: '#F59E0B' },
    { name: 'High', value: data.high, fill: '#EF4444' },
  ];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: [{ value: string }], label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-cyan-400 font-semibold">{`${label} Severity`}</p>
          <p className="text-white">
            <span className="text-gray-400">Incidents: </span>
            <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card variant="cyber">
      <CardHeader>
        <CardTitle>Incident Severity Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center h-[90%]">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{data.low}</div>
            <div className="text-sm text-gray-400">Low</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{data.medium}</div>
            <div className="text-sm text-gray-400">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{data.high}</div>
            <div className="text-sm text-gray-400">High</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentSeverity;