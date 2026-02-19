import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Send, 
  Eye, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Mail,
  Phone,
  Building,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Invoice } from '../../types/invoice';

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
      }
    ],
    subtotal: 50000,
    taxAmount: 7500,
    totalAmount: 57500,
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
        id: '2',
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

const EmployeeInvoiceAccess: React.FC = () => {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientInfo.company.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'sent': return <Send size={16} />;
      case 'viewed': return <Eye size={16} />;
      case 'overdue': return <AlertCircle size={16} />;
      case 'draft': return <FileText size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleSendReminder = (invoiceId: string) => {
    console.log('Sending reminder for invoice:', invoiceId);
  };

  if (selectedInvoice) {
    return (
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
                ← Back to List
              </Button>
              <div>
                <h1 className="text-3xl font-black text-white">Invoice Details</h1>
                <p className="text-gray-400">{selectedInvoice.invoiceNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleDownloadInvoice(selectedInvoice.id)}
                className="flex items-center gap-2"
              >
                <Download size={18} />
                Download
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSendReminder(selectedInvoice.id)}
                className="flex items-center gap-2"
              >
                <Mail size={18} />
                Send Reminder
              </Button>
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

            {/* Client & Company Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building size={20} />
                  Bill To
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="text-white font-semibold">{selectedInvoice.clientInfo.name}</div>
                  <div className="text-sm">{selectedInvoice.clientInfo.company}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} />
                    {selectedInvoice.clientInfo.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} />
                    {selectedInvoice.clientInfo.phone}
                  </div>
                  {selectedInvoice.clientInfo.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} />
                      {selectedInvoice.clientInfo.address}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                {selectedInvoice.projectInfo && (
                  <div className="space-y-2 text-gray-300">
                    <div className="text-white font-medium">{selectedInvoice.projectInfo.name}</div>
                    <div className="text-sm">{selectedInvoice.projectInfo.description}</div>
                    <div className="text-sm">
                      Duration: {new Date(selectedInvoice.projectInfo.startDate).toLocaleDateString()} - 
                      {selectedInvoice.projectInfo.endDate ? new Date(selectedInvoice.projectInfo.endDate).toLocaleDateString() : 'Ongoing'}
                    </div>
                  </div>
                )}
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
    );
  }

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Invoice Access</h1>
            <p className="text-gray-400">View and manage invoices shared with you</p>
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
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
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
              label: 'Pending Payment', 
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
              label: 'Overdue', 
              value: invoices.filter(i => i.status === 'overdue').length.toString(), 
              icon: AlertCircle, 
              color: 'text-red-500'
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

              {/* Client Info */}
              <div className="mb-4">
                <div className="text-white font-medium">{invoice.clientInfo.name}</div>
                <div className="text-sm text-gray-400">{invoice.clientInfo.company}</div>
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
                    handleDownloadInvoice(invoice.id);
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
      </div>
    </div>
  );
};

export default EmployeeInvoiceAccess;
