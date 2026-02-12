import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Send, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Invoice, InvoiceFilter, InvoiceStats } from '../../types/invoice';
import CreateInvoiceModal from '../../components/admin/CreateInvoiceModal';

// Mock data - replace with actual API calls
const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    orderId: 'ORD-001',
    clientId: 'client-1',
    clientInfo: {
      name: 'Acme Corporation',
      email: 'billing@acme.com',
      phone: '+8801234567890',
      company: 'Acme Corporation',
      address: '123 Business St, Dhaka, Bangladesh',
      taxId: 'TX-123456'
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
    sharedWith: ['emp-1', 'emp-2'],
    paymentHistory: [
      {
        id: 'pay-1',
        invoiceId: '1',
        amount: 74750,
        paymentDate: '2024-01-20',
        paymentMethod: 'Bank Transfer',
        transactionId: 'TXN-123456',
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    clientId: 'client-2',
    clientInfo: {
      name: 'Tech Startup Ltd',
      email: 'finance@techstartup.com',
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

const mockStats: InvoiceStats = {
  totalInvoices: 24,
  totalAmount: 2847500,
  paidAmount: 1895000,
  pendingAmount: 652500,
  overdueAmount: 300000,
  averageInvoiceValue: 118646,
  thisMonth: {
    count: 8,
    amount: 950000
  },
  lastMonth: {
    count: 6,
    amount: 720000
  }
};

const InvoiceManagement: React.FC = () => {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);
  const [stats] = useState<InvoiceStats>(mockStats);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [filter, setFilter] = useState<InvoiceFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Apply filters and search
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientInfo.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter(invoice => filter.status!.includes(invoice.status));
    }

    if (filter.clientId) {
      filtered = filtered.filter(invoice => invoice.clientId === filter.clientId);
    }

    setFilteredInvoices(filtered);
  }, [invoices, filter, searchTerm]);

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

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    }
  };

  const handleSendInvoice = (invoiceId: string) => {
    // API call to send invoice to client
    console.log('Sending invoice:', invoiceId);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // API call to download PDF
    console.log('Downloading invoice:', invoiceId);
  };

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
            <h1 className="text-4xl font-black text-white mb-2">Invoice Management</h1>
            <p className="text-gray-400">Manage invoices, payments, and client billing</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => console.log('Filter clicked')}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              Filters
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Create Invoice
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Invoices', 
              value: stats.totalInvoices.toString(), 
              icon: FileText, 
              color: 'text-primary',
              change: '+12%'
            },
            { 
              label: 'Total Revenue', 
              value: `BDT ${stats.totalAmount.toLocaleString()}`, 
              icon: DollarSign, 
              color: 'text-emerald-500',
              change: '+23%'
            },
            { 
              label: 'Pending Amount', 
              value: `BDT ${stats.pendingAmount.toLocaleString()}`, 
              icon: Clock, 
              color: 'text-amber-500',
              change: '+5%'
            },
            { 
              label: 'Overdue Amount', 
              value: `BDT ${stats.overdueAmount.toLocaleString()}`, 
              icon: AlertCircle, 
              color: 'text-red-500',
              change: '-8%'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-xs font-bold ${stat.color.startsWith('text-') ? stat.color : 'text-emerald-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search invoices by number, client, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-lighter border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['draft', 'sent', 'paid', 'overdue'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  const currentStatuses = filter.status || [];
                  if (currentStatuses.includes(status as Invoice['status'])) {
                    setFilter({ ...filter, status: currentStatuses.filter(s => s !== status) });
                  } else {
                    setFilter({ ...filter, status: [...currentStatuses, status as Invoice['status']] });
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  filter.status?.includes(status as Invoice['status'])
                    ? 'bg-primary text-white'
                    : 'bg-dark-lighter text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-lighter border border-white/10 rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-white/20 bg-dark text-primary"
                    />
                  </th>
                  <th className="text-left p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="text-left p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="text-left p-4 text-xs font-black text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => {
                          if (selectedInvoices.includes(invoice.id)) {
                            setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                          } else {
                            setSelectedInvoices([...selectedInvoices, invoice.id]);
                          }
                        }}
                        className="rounded border-white/20 bg-dark text-primary"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-white font-semibold">{invoice.invoiceNumber}</div>
                        <div className="text-xs text-gray-500">{new Date(invoice.issueDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">{invoice.clientInfo.name}</div>
                        <div className="text-xs text-gray-500">{invoice.clientInfo.company}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-semibold">BDT {invoice.totalAmount.toLocaleString()}</div>
                      {invoice.paidDate && (
                        <div className="text-xs text-emerald-500">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{new Date(invoice.dueDate).toLocaleDateString()}</div>
                      {invoice.status === 'overdue' && (
                        <div className="text-xs text-red-500">Overdue</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleSendInvoice(invoice.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Send"
                        >
                          <Send size={16} />
                        </button>
                        <button
                          onClick={() => {/* Edit functionality */}}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {/* Delete functionality */}}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Create Invoice Modal */}
        {showCreateModal && (
          <CreateInvoiceModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSave={(invoice) => console.log('Invoice saved:', invoice)}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceManagement;
