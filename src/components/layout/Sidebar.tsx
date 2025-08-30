"use client";

import React from 'react';
import { 
  FiHome, 
  FiAlertTriangle, 
  FiShield, 
  FiBarChart, 
  FiUsers, 
  FiSettings,
  FiDatabase,
  FiActivity
} from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'incidents', label: 'Incidents', icon: FiAlertTriangle },
  { id: 'threats', label: 'Threat Intel', icon: FiShield },
  { id: 'analytics', label: 'Analytics', icon: FiBarChart },
  { id: 'assets', label: 'Asset Monitor', icon: FiDatabase },
  { id: 'activity', label: 'Activity Log', icon: FiActivity },
  { id: 'team', label: 'Team', icon: FiUsers },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900/95 border-r border-cyan-500/20 backdrop-blur-sm h-full">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200',
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 cyber-glow'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">System Status</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}