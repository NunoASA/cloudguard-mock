import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/20';
    case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-500/20';
    case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/20';
    case 'low': return 'text-green-400 bg-green-900/20 border-green-500/20';
    default: return 'text-gray-400 bg-gray-900/20 border-gray-500/20';
  }
};
