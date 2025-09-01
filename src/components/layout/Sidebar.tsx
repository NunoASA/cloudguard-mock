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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-900/95 border-r border-cyan-500/20 backdrop-blur-sm h-full flex-col">
        <nav className="p-4 space-y-2 flex-1">
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

        <div className="p-4">
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

      {/* Mobile/Tablet Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/98 border-t border-cyan-500/20 backdrop-blur-md z-[9999] shadow-lg shadow-cyan-500/10">
        <div className="flex items-center justify-around px-1 py-3 safe-area-inset-bottom">
          {sidebarItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'flex flex-col items-center space-y-1 px-1 py-1 rounded-lg transition-all duration-200 min-w-0 flex-1 min-h-[56px] active:scale-95',
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/60 active:bg-gray-700/60'
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate w-full text-center leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}