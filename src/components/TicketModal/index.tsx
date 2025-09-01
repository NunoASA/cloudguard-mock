
"use client";

import React, { useState, useCallback } from 'react';
import { TicketForm } from './TicketForm';
import { LoadingState } from './LoadingState';
import { SuccessModal } from './SuccessModal';
import { TicketData, TicketModalProps } from '@/types/tickets';

const defaultValues: TicketData = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'security-incident',
  assignedTo: '',
};

export const TicketModal = ({ showTicketModal, onClose }: TicketModalProps) => {
  const [formData, setFormData] = useState<TicketData>(defaultValues);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<TicketData | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmittedTicket(formData);
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  }, [formData]);

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
    setSubmittedTicket(null);
    setFormData(defaultValues);
    onClose();
  }, [onClose]);

  const handleInputChange = useCallback((field: keyof TicketData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  if (!showTicketModal) {
    return null;
  }

  if (showSuccess && submittedTicket) {
    return (
      <SuccessModal
        submittedTicket={submittedTicket}
        onClose={handleCloseSuccess}
      />
    );
  }

  if (isSubmitting) {
    return <LoadingState />;
  }

  return (
    <TicketForm
      formData={formData}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
      onClose={handleCloseSuccess}
    />
  );
};