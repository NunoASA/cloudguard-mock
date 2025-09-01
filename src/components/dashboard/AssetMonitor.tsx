"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FiServer, FiMonitor, FiSmartphone, FiHardDrive } from 'react-icons/fi';

interface AssetMonitorProps {
  totalAssets: number;
  assetBreakdown?: {
    servers: number;
    workstations: number;
    mobile: number;
    network: number;
  };
}

export default function AssetMonitor({ totalAssets, assetBreakdown }: AssetMonitorProps) {
  const defaultBreakdown = {
    servers: Math.floor(totalAssets * 0.3),
    workstations: Math.floor(totalAssets * 0.45),
    mobile: Math.floor(totalAssets * 0.15),
    network: Math.floor(totalAssets * 0.1),
  };

  const breakdown = assetBreakdown || defaultBreakdown;

  const assetTypes = [
    { name: 'Servers', count: breakdown.servers, icon: FiServer, color: 'text-blue-400' },
    { name: 'Workstations', count: breakdown.workstations, icon: FiMonitor, color: 'text-green-400' },
    { name: 'Mobile', count: breakdown.mobile, icon: FiSmartphone, color: 'text-purple-400' },
    { name: 'Network', count: breakdown.network, icon: FiHardDrive, color: 'text-orange-400' },
  ];

  return (
    <Card variant="success">
      <CardHeader>
        <CardTitle>Monitored Assets</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center h-[90%]">
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-green-400 neon-text">
            {totalAssets.toLocaleString()}
          </div>
          <div className="text-lg text-gray-400">Total Assets</div>
        </div>

        <div className="space-y-4">
          {assetTypes.map((asset) => {
            const Icon = asset.icon;
            const percentage = (asset.count / totalAssets) * 100;
            
            return (
              <div key={asset.name} className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${asset.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{asset.name}</span>
                    <span className="text-sm font-semibold text-white">{asset.count}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${asset.color.replace('text-', 'from-')} to-transparent`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-400">Monitoring Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}