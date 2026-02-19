import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  CreditCard, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Mail,
  Phone,
  Building,
  MapPin,
  Eye
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Invoice } from '../../types/invoice';
import Layout from '../../components/Layout';

// Mock data - replace with actual API calls
const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    orderId: 'ORD-001',
    clientId: 'client-1',
    clientInfo: {
      name: 'John Doe',
      email: 'john@acme.com',
      phone: '+8801234567890',
      company: 'Acme Corporation',
      address: '123 Business St, Dhaka, Bangladesh'
    },
    projectInfo: {
      name: 'Website Redesign',
      description: 'Complete website redesign and development',
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    items: [
      {
        id: '1',
        description: 'Web Design Services',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
        serviceType: 'Design',
        taxRate: 15
      },
      {
        id: '2',
        description: 'Development Services',
        quantity: 100,
        unitPrice: 800,
        total: 80000,
        serviceType: 'Development',
        taxRate: 15
      }
    ],
    subtotal: 130000,
    taxAmount: 19500,
    totalAmount: 149500,
    currency: 'BDT',
    status: 'sent',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    createdBy: 'admin-1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    sharedWith: ['emp-1'],
    paymentHistory: []
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    clientId: 'client-2',
    clientInfo: {
      name: 'Jane Smith',
      email: 'jane@techstartup.com',
      phone: '+8801987654321',
      company: 'Tech Startup Ltd'
    },
    items: [
      {
        id: '3',
        description: 'SEO Services',
        quantity: 1,
        unitPrice: 30000,
        total: 30000,
        serviceType: 'Marketing',
        taxRate: 15
      }
    ],
    subtotal: 30000,
    taxAmount: 4500,
    totalAmount: 34500,
    currency: 'BDT',
    status: 'paid',
    issueDate: '2024-01-10',
    dueDate: '2024-02-09',
    paidDate: '2024-02-08',
    paymentMethod: 'Credit Card',
    createdBy: 'admin-1',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-08T15:30:00Z',
    sharedWith: ['emp-1']
  }
];

const ClientInvoicePortal: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.projectInfo?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchTerm, statusFilter]);

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'viewed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'draft': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} />;
      case 'sent': return <Mail size={16} />;
      case 'viewed': return <Eye size={16} />;
      case 'overdue': return <AlertCircle size={16} />;
      case 'draft': return <FileText size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>Invoice ${invoice.invoiceNumber}</title><style>
        body { font-family: system-ui, sans-serif; margin: 0; padding: 32px; background: white; color: black; }
        .invoice-container { max-width: 800px; margin: 0 auto; }
        .header { border-bottom: 4px solid #111827; padding-bottom: 24px; margin-bottom: 32px; }
        .logo-section { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .logo { display: flex; align-items: center; gap: 16px; }
        .logo-box { width: 64px; height: 64px; background: #111827; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .logo-text { color: white; font-weight: bold; font-size: 20px; }
        .company-info h2 { margin: 0 0 4px 0; font-size: 24px; font-weight: 900; color: #111827; }
        .company-info p { margin: 0; font-size: 14px; color: #6b7280; }
        .invoice-badge { background: #dc2626; color: white; padding: 12px 24px; border-radius: 8px; display: inline-block; text-align: right; }
        .invoice-badge .label { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .invoice-badge .number { font-size: 20px; font-weight: 900; }
        .contact-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; font-size: 14px; color: #6b7280; }
        .contact-info div p:first-child { font-weight: 600; color: #1f2937; margin-bottom: 4px; }
        .sections { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 32px; }
        .section-box { background: #f9fafb; padding: 24px; border-radius: 8px; }
        .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-bottom: 12px; }
        .client-name { font-weight: bold; font-size: 18px; color: #111827; margin-bottom: 4px; }
        .client-company { font-size: 14px; color: #374151; font-weight: 500; margin-bottom: 4px; }
        .client-details { font-size: 14px; color: #6b7280; margin-bottom: 4px; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .detail-label { font-size: 14px; color: #6b7280; }
        .detail-value { font-size: 14px; font-weight: 500; color: #111827; }
        .status-badge { font-size: 14px; font-weight: bold; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; }
        .status-paid { background: #dcfce7; color: #166534; }
        .status-overdue { background: #fee2e2; color: #dc2626; }
        .status-sent { background: #dbeafe; color: #1e40af; }
        .project-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 24px; margin-bottom: 32px; border-radius: 0 8px 8px 0; }
        .project-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #1e40af; margin-bottom: 8px; }
        .project-name { font-weight: bold; font-size: 18px; color: #111827; margin-bottom: 8px; }
        .project-desc { font-size: 14px; color: #374151; margin-bottom: 8px; }
        .project-duration { font-size: 12px; color: #6b7280; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
        th { background: #111827; color: white; padding: 16px 24px; text-align: left; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; }
        th:nth-child(2) { text-align: center; width: 80px; }
        th:nth-child(3), th:nth-child(4) { text-align: right; width: 128px; }
        td { padding: 16px 24px; border-bottom: 1px solid #e5e7eb; }
        td:nth-child(2) { text-align: center; }
        td:nth-child(3), td:nth-child(4) { text-align: right; }
        tr:nth-child(even) { background: #f9fafb; }
        .service-type { font-size: 12px; color: #6b7280; background: #e5e7eb; padding: 2px 8px; border-radius: 4px; display: inline-block; }
        .summary { display: flex; justify-content: flex-end; margin-bottom: 32px; }
        .summary-box { width: 100%; max-width: 33%; background: #111827; color: white; padding: 24px; border-radius: 8px; }
        .summary-title { font-size: 18px; font-weight: bold; margin-bottom: 16px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; }
        .summary-row:not(:last-child) { border-bottom: 1px solid #374151; }
        .summary-total { font-size: 20px; font-weight: bold; }
        .summary-total .amount { color: #f87171; }
        .footer { border-top: 2px solid #e5e7eb; padding-top: 24px; margin-top: 32px; display: flex; justify-content: space-between; align-items: center; }
        .footer-left { font-size: 14px; color: #6b7280; }
        .footer-left p:first-child { font-weight: 600; margin-bottom: 4px; }
        .footer-right { text-align: right; font-size: 14px; color: #6b7280; }
        .footer-right p:first-child { font-weight: 600; }
        .payment-info { background: #fefce8; border-left: 4px solid #facc15; padding: 24px; margin-top: 32px; border-radius: 0 8px 8px 0; }
        .payment-title { font-size: 14px; font-weight: bold; color: #a16207; margin-bottom: 8px; }
        .payment-details { font-size: 14px; color: #374151; }
        .payment-details p { margin-bottom: 4px; }
        @media print { body { padding: 16px; } }
      </style></head><body>
      <div class="invoice-container">
        <div class="header">
          <div class="logo-section">
            <div class="logo">
              <div class="logo-box"><span class="logo-text">NEXARA</span></div>
              <div class="company-info">
                <h2>NEXARA Agency</h2>
                <p>Strategic Digital Agency</p>
              </div>
            </div>
            <div class="invoice-badge">
              <div class="label">Invoice</div>
              <div class="number">${invoice.invoiceNumber}</div>
            </div>
          </div>
          <div class="contact-info">
            <div>
              <p>Address</p>
              <p>Dhaka, Bangladesh</p>
            </div>
            <div>
              <p>Contact</p>
              <p>+8801234567890</p>
              <p>info@nexara.com</p>
            </div>
            <div>
              <p>Website</p>
              <p>www.nexara.com</p>
            </div>
          </div>
        </div>

        <div class="sections">
          <div class="section-box">
            <div class="section-title">Bill To</div>
            <div class="client-name">${invoice.clientInfo.name}</div>
            <div class="client-company">${invoice.clientInfo.company}</div>
            <div class="client-details">${invoice.clientInfo.email}</div>
            <div class="client-details">${invoice.clientInfo.phone}</div>
            ${invoice.clientInfo.address ? `<div class="client-details">${invoice.clientInfo.address}</div>` : ''}
            ${invoice.clientInfo.taxId ? `<div class="client-details">Tax ID: ${invoice.clientInfo.taxId}</div>` : ''}
          </div>
          
          <div class="section-box">
            <div class="section-title">Invoice Details</div>
            <div class="detail-row">
              <span class="detail-label">Issue Date:</span>
              <span class="detail-value">${new Date(invoice.issueDate).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Due Date:</span>
              <span class="detail-value">${new Date(invoice.dueDate).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="status-badge status-${invoice.status}">${invoice.status}</span>
            </div>
            ${invoice.paidDate ? `
            <div class="detail-row">
              <span class="detail-label">Paid Date:</span>
              <span class="detail-value">${new Date(invoice.paidDate).toLocaleDateString()}</span>
            </div>` : ''}
          </div>
        </div>

        ${invoice.projectInfo ? `
        <div class="project-box">
          <div class="project-title">Project Details</div>
          <div class="project-name">${invoice.projectInfo.name}</div>
          <div class="project-desc">${invoice.projectInfo.description}</div>
          <div class="project-duration">
            Duration: ${new Date(invoice.projectInfo.startDate).toLocaleDateString()} - 
            ${invoice.projectInfo.endDate ? new Date(invoice.projectInfo.endDate).toLocaleDateString() : 'Ongoing'}
          </div>
        </div>` : ''}

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map((item, index) => `
              <tr>
                <td>
                  <div style="font-weight: 600; color: #111827; margin-bottom: 4px;">${item.description}</div>
                  <span class="service-type">${item.serviceType}</span>
                  ${item.taxRate ? `<div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Tax Rate: ${item.taxRate}%</div>` : ''}
                </td>
                <td>${item.quantity}</td>
                <td>${invoice.currency} ${item.unitPrice.toLocaleString()}</td>
                <td style="font-weight: 600;">${invoice.currency} ${item.total.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-box">
            <div class="summary-title">Payment Summary</div>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${invoice.currency} ${invoice.subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <span>${invoice.currency} ${invoice.taxAmount.toLocaleString()}</span>
            </div>
            <div class="summary-row summary-total">
              <span>Total Amount:</span>
              <span class="amount">${invoice.currency} ${invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        ${(invoice.terms || invoice.notes) ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 32px;">
          ${invoice.terms ? `
          <div class="section-box">
            <div class="section-title">Payment Terms</div>
            <div style="font-size: 14px; color: #374151; line-height: 1.5;">${invoice.terms}</div>
          </div>` : ''}
          ${invoice.notes ? `
          <div class="section-box">
            <div class="section-title">Notes</div>
            <div style="font-size: 14px; color: #374151; line-height: 1.5;">${invoice.notes}</div>
          </div>` : ''}
        </div>` : ''}

        <div class="footer">
          <div class="footer-left">
            <p>Thank you for your business!</p>
            <p>For any questions regarding this invoice, please contact us at info@nexara.com</p>
          </div>
          <div class="footer-right">
            <p>NEXARA Agency</p>
            <p>Dhaka, Bangladesh</p>
            <p>www.nexara.com</p>
          </div>
        </div>

        ${invoice.status !== 'paid' ? `
        <div class="payment-info">
          <div class="payment-title">Payment Information</div>
          <div class="payment-details">
            <p><strong>Bank:</strong> Bank Name Here</p>
            <p><strong>Account Name:</strong> NEXARA Agency</p>
            <p><strong>Account Number:</strong> XXXX-XXXX-XXXX</p>
            <p><strong>Routing Number:</strong> XXXXXX</p>
          </div>
        </div>` : ''}
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    if (selectedInvoice) {
      console.log('Processing payment for invoice:', selectedInvoice.id, 'Method:', paymentMethod);
      // Update invoice status to paid
      setInvoices(prev => prev.map(inv => 
        inv.id === selectedInvoice.id 
          ? { 
              ...inv, 
              status: 'paid', 
              paidDate: new Date().toISOString().split('T')[0],
              paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Bank Transfer'
            }
          : inv
      ));
      setShowPaymentModal(false);
      setSelectedInvoice(null);
    }
  };

  if (selectedInvoice) {
    return (
      <Layout>
      <div className="min-h-screen bg-dark p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setSelectedInvoice(null)}
                className="flex items-center gap-2"
              >
                ← Back to Invoices
              </Button>
              <div>
                <h1 className="text-3xl font-black text-white">Invoice Details</h1>
                <p className="text-gray-400">{selectedInvoice.invoiceNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleDownloadInvoice(selectedInvoice)}
                className="flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </Button>
              {selectedInvoice.status === 'sent' && (
                <Button
                  variant="primary"
                  onClick={() => handlePayInvoice(selectedInvoice)}
                  className="flex items-center gap-2"
                >
                  <CreditCard size={18} />
                  Pay Now
                </Button>
              )}
            </div>
          </motion.div>

          {/* Invoice Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-lighter border border-white/10 rounded-3xl p-8"
          >
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/10">
              <div>
                <h2 className="text-4xl font-black text-primary mb-2">INVOICE</h2>
                <div className="space-y-1 text-gray-400">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Number: {selectedInvoice.invoiceNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Date: {new Date(selectedInvoice.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Due: {new Date(selectedInvoice.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(selectedInvoice.status)}`}>
                  {getStatusIcon(selectedInvoice.status)}
                  {selectedInvoice.status.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building size={20} />
                  Project Details
                </h3>
                {selectedInvoice.projectInfo && (
                  <div className="space-y-2 text-gray-300">
                    <div className="text-white font-semibold">{selectedInvoice.projectInfo.name}</div>
                    <div className="text-sm">{selectedInvoice.projectInfo.description}</div>
                    <div className="text-sm">
                      Duration: {new Date(selectedInvoice.projectInfo.startDate).toLocaleDateString()} - 
                      {selectedInvoice.projectInfo.endDate ? new Date(selectedInvoice.projectInfo.endDate).toLocaleDateString() : 'Ongoing'}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Company Info</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="text-white font-semibold">NEXARA Agency</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} />
                    info@nexara.com
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} />
                    +8801234567890
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} />
                    Dhaka, Bangladesh
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Invoice Items</h3>
              <div className="bg-dark border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-black text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="text-center p-4 text-sm font-black text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="text-right p-4 text-sm font-black text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="text-right p-4 text-sm font-black text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item) => (
                      <tr key={item.id} className="border-b border-white/5">
                        <td className="p-4">
                          <div className="text-white">{item.description}</div>
                          <div className="text-xs text-gray-400">{item.serviceType}</div>
                        </td>
                        <td className="p-4 text-center text-white">{item.quantity}</td>
                        <td className="p-4 text-right text-white">BDT {item.unitPrice.toLocaleString()}</td>
                        <td className="p-4 text-right text-primary font-bold">BDT {item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="bg-dark border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Payment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal:</span>
                      <span>BDT {selectedInvoice.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax:</span>
                      <span>BDT {selectedInvoice.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-black text-white pt-3 border-t border-white/10">
                      <span>Total:</span>
                      <span className="text-primary">BDT {selectedInvoice.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {selectedInvoice.paidDate && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <CheckCircle size={16} />
                        <span className="font-medium">Paid on {new Date(selectedInvoice.paidDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm text-gray-400">Method: {selectedInvoice.paymentMethod}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedInvoice.notes && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Notes</h3>
                <p className="text-gray-300">{selectedInvoice.notes}</p>
              </div>
            )}

            {/* Terms */}
            {selectedInvoice.terms && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Payment Terms</h3>
                <p className="text-gray-300">{selectedInvoice.terms}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to="/client/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                ← Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">My Invoices</h1>
              <p className="text-gray-400">View and pay your invoices online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-dark-lighter border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-dark-lighter border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="sent">Unpaid</option>
              <option value="viewed">Viewed</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            { 
              label: 'Total Invoices', 
              value: invoices.length.toString(), 
              icon: FileText, 
              color: 'text-primary'
            },
            { 
              label: 'Unpaid', 
              value: invoices.filter(i => i.status === 'sent' || i.status === 'viewed').length.toString(), 
              icon: Clock, 
              color: 'text-amber-500'
            },
            { 
              label: 'Paid', 
              value: invoices.filter(i => i.status === 'paid').length.toString(), 
              icon: CheckCircle, 
              color: 'text-emerald-500'
            },
            { 
              label: 'Total Amount', 
              value: `BDT ${invoices.filter(i => i.status !== 'draft').reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString()}`, 
              icon: DollarSign, 
              color: 'text-blue-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Invoices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredInvoices.map((invoice) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-lighter border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => handleViewInvoice(invoice)}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black text-white mb-1">{invoice.invoiceNumber}</h3>
                  <p className="text-sm text-gray-400">{new Date(invoice.issueDate).toLocaleDateString()}</p>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(invoice.status)}`}>
                  {getStatusIcon(invoice.status)}
                  {invoice.status}
                </div>
              </div>

              {/* Project Info */}
              <div className="mb-4">
                {invoice.projectInfo && (
                  <div>
                    <div className="text-white font-medium">{invoice.projectInfo.name}</div>
                    <div className="text-sm text-gray-400">{invoice.projectInfo.description}</div>
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className="mb-4">
                <div className="text-2xl font-black text-primary">BDT {invoice.totalAmount.toLocaleString()}</div>
                {invoice.dueDate && (
                  <div className="text-xs text-gray-400">
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadInvoice(invoice);
                  }}
                  className="flex-1"
                >
                  <Download size={16} />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewInvoice(invoice);
                  }}
                  className="flex-1"
                >
                  <Eye size={16} />
                </Button>
                {invoice.status === 'sent' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayInvoice(invoice);
                    }}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <CreditCard size={16} />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 text-lg">No invoices found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-lighter border border-white/10 rounded-3xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-black text-white mb-6">Complete Payment</h2>
              
              <div className="bg-dark border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Invoice:</span>
                  <span className="text-white font-medium">{selectedInvoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-2xl font-black text-primary">BDT {selectedInvoice.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Due Date:</span>
                  <span className="text-white">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Payment Method</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <CreditCard size={20} />
                    <div>
                      <div className="text-white font-medium">Credit/Debit Card</div>
                      <div className="text-xs text-gray-400">Pay securely with your card</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <Building size={20} />
                    <div>
                      <div className="text-white font-medium">Bank Transfer</div>
                      <div className="text-xs text-gray-400">Direct bank transfer</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={processPayment}
                  className="flex-1"
                >
                  Pay BDT {selectedInvoice.totalAmount.toLocaleString()}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default ClientInvoicePortal;
