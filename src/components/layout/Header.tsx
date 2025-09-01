"use client";

import React from 'react';
import { FiUser, FiBell, FiSettings, FiShield, FiClock } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { User } from '@/types/types';

interface HeaderProps {
  user?: User;
  onRaiseTicket: () => void;
  onToggleTimeRange: () => void;
  timeRange: string;
}

export default function Header({ user, onRaiseTicket, onToggleTimeRange, timeRange }: HeaderProps) {
  return (
    <header className="bg-gray-900/95 border-b border-cyan-500/20 backdrop-blur-sm h-16 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FiShield className="text-cyan-400 w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold neon-text">SOC Dashboard</h1>
            <p className="text-xs text-gray-400">Security Operations Center</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleTimeRange}
          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          <FiClock className="w-4 h-4 mr-2" />
          {timeRange}
        </Button>

        <Button
          onClick={onRaiseTicket}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Raise Ticket
        </Button>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
            <FiBell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
            <FiSettings className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-800/50 border border-gray-700">
            <FiUser className="w-4 h-4 text-cyan-400" />
            <div className="text-sm">
              <p className="text-white">{user?.name || 'SOC Analyst'}</p>
              <p className="text-xs text-gray-400">{user?.role || 'Administrator'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}