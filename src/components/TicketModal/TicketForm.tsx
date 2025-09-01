import React from 'react';
import { FiX, FiAlertTriangle, FiUser, FiTag } from 'react-icons/fi';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPriorityColor } from '@/lib/utils';
import { TicketFormProps } from '@/types/tickets';

const TicketForm = ({ 
  formData, 
  onSubmit, 
  onInputChange, 
  onClose,
}: TicketFormProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-orange-500/30 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-xl font-bold text-orange-400 flex items-center space-x-2">
            <FiAlertTriangle className="w-5 h-5" />
            <span>Create Support Ticket</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-orange-400"
          >
            <FiX className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Ticket Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => onInputChange('title', e.target.value)}
                placeholder="Brief description of the issue"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => onInputChange('description', e.target.value)}
                placeholder="Detailed description of the issue, steps to reproduce, and any relevant information"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => onInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(formData.priority)}`}>
                  {formData.priority.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FiTag className="w-4 h-4" />
                <span>Category</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => onInputChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="security-incident">Security Incident</option>
                <option value="system-outage">System Outage</option>
                <option value="performance-issue">Performance Issue</option>
                <option value="access-request">Access Request</option>
                <option value="bug-report">Bug Report</option>
                <option value="feature-request">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Assigned To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>Assign To (Optional)</span>
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => onInputChange('assignedTo', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="">Auto-assign</option>
                <option value="john.doe">John Doe (SOC L1)</option>
                <option value="jane.smith">Jane Smith (SOC L2)</option>
                <option value="mike.johnson">Mike Johnson (SOC L3)</option>
                <option value="sarah.connor">Sarah Connor (Incident Response)</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                disabled={!formData.title || !formData.description}
              >
                Create Ticket
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketForm;