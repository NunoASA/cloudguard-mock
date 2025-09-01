export interface TicketData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  assignedTo: string;
}

export interface TicketModalProps {
  showTicketModal: boolean;
  onClose: () => void;
}

export interface TicketFormProps {
  formData: TicketData;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: keyof TicketData, value: string) => void;
  onClose: () => void;
}

export interface SuccessModalProps {
  submittedTicket: TicketData;
  onClose: () => void;
}