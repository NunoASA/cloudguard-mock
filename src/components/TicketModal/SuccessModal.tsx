import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SuccessModalProps } from '@/types/tickets';
import { getPriorityColor } from '@/lib/utils';

export const SuccessModal = ({ submittedTicket, onClose }: SuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-gray-800 border-green-500/30">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
              <FiCheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-400">
            Ticket Created Successfully!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-700/50 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Ticket Summary</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-400">Title:</span>
                <p className="text-white font-medium">{submittedTicket.title}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Priority:</span>
                <span className={`ml-2 px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(submittedTicket.priority)}`}>
                  {submittedTicket.priority.toUpperCase()}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Category:</span>
                <p className="text-white">{submittedTicket.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              </div>
              
              {submittedTicket.assignedTo && (
                <div>
                  <span className="text-sm text-gray-400">Assigned to:</span>
                  <p className="text-white">{submittedTicket.assignedTo}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm text-gray-400">Ticket ID:</span>
                <p className="text-cyan-400 font-mono">TKT-{Date.now().toString().slice(-6)}</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            Your ticket has been submitted and assigned to the appropriate team.
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};