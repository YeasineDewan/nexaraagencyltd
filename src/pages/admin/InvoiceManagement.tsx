import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  DollarSign,
  Share2,
  Copy,
  Mail,
  ArrowLeft,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Invoice, InvoiceFilter, InvoiceStats } from '../../types/invoice';
import CreateInvoiceModal from '../../components/admin/CreateInvoiceModal';
import { InvoicePrintView } from '../../components/admin/InvoicePrintView';
import Layout from '../../components/Layout';

// Mock data - replace with actual API calls
const mockInvoicesData: Invoice[] = [
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
      { id: '1', description: 'Web Design Services', quantity: 1, unitPrice: 50000, total: 50000, serviceType: 'Design', taxRate: 15 },
      { id: '2', description: 'Development Services', quantity: 100, unitPrice: 800, total: 80000, serviceType: 'Development', taxRate: 15 }
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
      { id: 'pay-1', invoiceId: '1', amount: 74750, paymentDate: '2024-01-20', paymentMethod: 'Bank Transfer', transactionId: 'TXN-123456', status: 'completed' }
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
      { id: '3', description: 'SEO Services', quantity: 1, unitPrice: 30000, total: 30000, serviceType: 'Marketing', taxRate: 15 }
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
  thisMonth: { count: 8, amount: 950000 },
  lastMonth: { count: 6, amount: 720000 }
};

const InvoiceManagement: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoicesData);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoicesData);
  const [stats, setStats] = useState<InvoiceStats>(mockStats);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [filter, setFilter] = useState<InvoiceFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [shareInvoice, setShareInvoice] = useState<Invoice | null>(null);
  const [deleteInvoice, setDeleteInvoice] = useState<Invoice | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  useEffect(() => {
    let filtered = invoices;
    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientInfo.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter(inv => filter.status!.includes(inv.status));
    }
    if (filter.clientId) {
      filtered = filtered.filter(inv => inv.clientId === filter.clientId);
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

  const handleDownloadInvoice = (invoice: Invoice) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNumber}</title>
          <style>
            body { margin: 0; font-family: system-ui, sans-serif; background: white; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `);
    const div = printWindow.document.createElement('div');
    div.innerHTML = `<div class="bg-white text-black p-12 max-w-4xl mx-auto font-sans">
      <div class="border-b-2 border-gray-300 pb-6 mb-8">
        <h1 class="text-3xl font-black" style="color:#cc0000">INVOICE</h1>
        <p class="text-sm text-gray-500">${invoice.invoiceNumber}</p>
      </div>
      <div class="grid grid-cols-2 gap-12 mb-12" style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:3rem">
        <div>
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">From</p>
          <p class="font-bold text-lg">NEXARA Agency</p>
          <p class="text-sm text-gray-600">Dhaka, Bangladesh</p>
        </div>
        <div style="text-align:right">
          <p class="text-xs font-bold text-gray-500 uppercase mb-2">Bill To</p>
          <p class="font-bold text-lg">${invoice.clientInfo.name}</p>
          <p class="text-sm text-gray-600">${invoice.clientInfo.company}</p>
          <p class="text-sm text-gray-600">${invoice.clientInfo.email}</p>
        </div>
      </div>
      <p class="text-xs text-gray-500 mb-8">Issue: ${new Date(invoice.issueDate).toLocaleDateString()} · Due: ${new Date(invoice.dueDate).toLocaleDateString()}</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:2rem">
        <thead>
          <tr style="border-bottom:2px solid #e5e7eb">
            <th style="text-align:left;padding:12px;font-size:11px;font-weight:700;color:#6b7280">Description</th>
            <th style="text-align:center;padding:12px;width:80px;font-size:11px;font-weight:700;color:#6b7280">Qty</th>
            <th style="text-align:right;padding:12px;width:100px;font-size:11px;font-weight:700;color:#6b7280">Rate</th>
            <th style="text-align:right;padding:12px;width:100px;font-size:11px;font-weight:700;color:#6b7280">Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:16px"><p class="font-medium">${item.description}</p><p class="text-xs text-gray-500">${item.serviceType}</p></td>
              <td style="text-align:center;padding:16px">${item.quantity}</td>
              <td style="text-align:right;padding:16px">${invoice.currency} ${item.unitPrice.toLocaleString()}</td>
              <td style="text-align:right;padding:16px;font-weight:600">${invoice.currency} ${item.total.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="text-align:right;max-width:300px;margin-left:auto">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="text-gray-600">Subtotal</span><span>${invoice.currency} ${invoice.subtotal.toLocaleString()}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="text-gray-600">Tax</span><span>${invoice.currency} ${invoice.taxAmount.toLocaleString()}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:700;padding-top:8px;border-top:2px solid #e5e7eb">
          <span>Total</span><span style="color:#cc0000">${invoice.currency} ${invoice.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>`;
    printWindow.document.body.appendChild(div);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleShareCopyLink = (invoice: Invoice) => {
    const url = `${window.location.origin}/client/invoices?view=${invoice.id}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    const email = shareEmail || invoice.clientInfo.email;
    window.location.href = `mailto:${email}?subject=Invoice ${invoice.invoiceNumber}&body=Please find your invoice attached. View online: ${window.location.origin}/client/invoices?view=${invoice.id}`;
    setShareInvoice(null);
  };

  const handleSaveInvoice = (updated: Partial<Invoice>) => {
    if (editingInvoice) {
      setInvoices(prev => prev.map(inv => 
        inv.id === editingInvoice.id ? { ...inv, ...updated } as Invoice : inv
      ));
      setEditingInvoice(null);
    } else {
      const newInv: Invoice = {
        ...updated,
        id: `inv-${Date.now()}`,
        invoiceNumber: updated.invoiceNumber || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        issueDate: updated.issueDate || new Date().toISOString().split('T')[0],
        dueDate: updated.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: (updated.status as Invoice['status']) || 'draft',
        clientInfo: updated.clientInfo!,
        items: updated.items!,
        subtotal: updated.subtotal!,
        taxAmount: updated.taxAmount!,
        totalAmount: updated.totalAmount!,
        currency: updated.currency || 'BDT',
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sharedWith: updated.sharedWith || []
      } as Invoice;
      setInvoices(prev => [newInv, ...prev]);
    }
    setShowCreateModal(false);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoice.id));
    setDeleteInvoice(null);
  };

  const handleBulkDownload = () => {
    selectedInvoices.forEach(id => {
      const inv = invoices.find(i => i.id === id);
      if (inv) handleDownloadInvoice(inv);
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <div>
                <h1 className="text-4xl font-black text-white mb-2">Invoice Management</h1>
                <p className="text-gray-400">Manage invoices, payments, and client billing</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedInvoices.length > 0 && (
                <Button variant="outline" onClick={handleBulkDownload} className="flex items-center gap-2">
                  <Download size={18} />
                  Download Selected ({selectedInvoices.length})
                </Button>
              )}
              <Button variant="outline" onClick={() => { setFilter({}); setSearchTerm(''); }} className="flex items-center gap-2">
                <Filter size={18} />
                Reset Filters
              </Button>
              <Button variant="primary" onClick={() => { setEditingInvoice(null); setShowCreateModal(true); }} className="flex items-center gap-2">
                <Plus size={18} />
                Create Invoice
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[
              { label: 'Total Invoices', value: stats.totalInvoices.toString(), icon: FileText, color: 'text-primary', change: '+12%' },
              { label: 'Total Revenue', value: `BDT ${stats.totalAmount.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', change: '+23%' },
              { label: 'Pending Amount', value: `BDT ${stats.pendingAmount.toLocaleString()}`, icon: Clock, color: 'text-amber-500', change: '+5%' },
              { label: 'Overdue Amount', value: `BDT ${stats.overdueAmount.toLocaleString()}`, icon: AlertCircle, color: 'text-red-500', change: '-8%' }
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}><stat.icon size={20} /></div>
                  <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
                </div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-lighter border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['draft', 'sent', 'paid', 'overdue'] as const).map((status) => (
                <button key={status}
                  onClick={() => {
                    const current = filter.status || [];
                    setFilter({ ...filter, status: current.includes(status) ? current.filter(s => s !== status) : [...current, status] });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                    filter.status?.includes(status) ? 'bg-primary text-white' : 'bg-dark-lighter text-gray-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-dark-lighter border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4">
                      <input type="checkbox" checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0} onChange={handleSelectAll} className="rounded border-white/20 bg-dark text-primary" />
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
                  {filteredInvoices.map((invoice, i) => (
                    <motion.tr key={invoice.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <input type="checkbox" checked={selectedInvoices.includes(invoice.id)} onChange={() => {
                          setSelectedInvoices(prev => prev.includes(invoice.id) ? prev.filter(id => id !== invoice.id) : [...prev, invoice.id]);
                        }} className="rounded border-white/20 bg-dark text-primary" />
                      </td>
                      <td className="p-4">
                        <div className="text-white font-semibold">{invoice.invoiceNumber}</div>
                        <div className="text-xs text-gray-500">{new Date(invoice.issueDate).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{invoice.clientInfo.name}</div>
                        <div className="text-xs text-gray-500">{invoice.clientInfo.company}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-semibold">BDT {invoice.totalAmount.toLocaleString()}</div>
                        {invoice.paidDate && <div className="text-xs text-emerald-500">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</div>}
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)} {invoice.status}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white">{new Date(invoice.dueDate).toLocaleDateString()}</div>
                        {invoice.status === 'overdue' && <div className="text-xs text-red-500">Overdue</div>}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button onClick={() => handleDownloadInvoice(invoice)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" title="Download PDF"><Download size={16} /></button>
                          <button onClick={() => setShareInvoice(invoice)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" title="Share"><Share2 size={16} /></button>
                          <button onClick={() => { setEditingInvoice(invoice); setShowCreateModal(true); }} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" title="Edit"><Edit size={16} /></button>
                          <button onClick={() => setDeleteInvoice(invoice)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500" title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <CreateInvoiceModal
          isOpen={showCreateModal}
          onClose={() => { setShowCreateModal(false); setEditingInvoice(null); }}
          onSave={handleSaveInvoice}
          initialInvoice={editingInvoice || undefined}
          mode={editingInvoice ? 'edit' : 'create'}
        />
      )}

      {/* Share Modal */}
      {shareInvoice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-lighter border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Share2 size={24} /> Share Invoice</h3>
              <button onClick={() => setShareInvoice(null)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><X size={20} /></button>
            </div>
            <p className="text-gray-400 text-sm mb-4">{shareInvoice.invoiceNumber} · {shareInvoice.clientInfo.name}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Email address</label>
                <input type="email" value={shareEmail || shareInvoice.clientInfo.email} onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="client@example.com" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => handleShareCopyLink(shareInvoice)}>
                  {shareCopied ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Link</>}
                </Button>
                <Button variant="primary" className="flex-1" onClick={() => handleSendInvoice(shareInvoice)}>
                  <Mail size={18} /> Send Email
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteInvoice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-lighter border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center"><Trash2 className="text-red-500" size={24} /></div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Invoice?</h3>
                <p className="text-gray-500 text-sm">This cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">{deleteInvoice.invoiceNumber} · {deleteInvoice.clientInfo.name}</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteInvoice(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={() => handleDeleteInvoice(deleteInvoice)}>Delete</Button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default InvoiceManagement;
