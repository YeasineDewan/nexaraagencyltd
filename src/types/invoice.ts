// Invoice System Types and Interfaces
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  serviceType: string;
  taxRate?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  clientId: string;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
    address?: string;
    taxId?: string;
  };
  projectInfo?: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  notes?: string;
  terms?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sharedWith: string[]; // Employee IDs who have access
  attachments?: string[];
  paymentHistory?: PaymentRecord[];
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  notes?: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  defaultItems: Omit<InvoiceItem, 'id' | 'total'>[];
  defaultTerms: string;
  defaultNotes: string;
  taxSettings: {
    enabled: boolean;
    rate: number;
    name: string;
  };
  currency: string;
  logo?: string;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    taxId: string;
  };
}

export interface InvoiceSettings {
  autoGenerate: boolean;
  generateOnOrderStatus: string[];
  dueDays: number;
  autoSend: boolean;
  reminderDays: number[];
  templateId: string;
  prefix: string;
  startingNumber: number;
  currency: string;
  taxSettings: {
    enabled: boolean;
    rate: number;
    name: string;
  };
}

export interface InvoiceFilter {
  status?: Invoice['status'][];
  clientId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface InvoiceStats {
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  averageInvoiceValue: number;
  thisMonth: {
    count: number;
    amount: number;
  };
  lastMonth: {
    count: number;
    amount: number;
  };
}
