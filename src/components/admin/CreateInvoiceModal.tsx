import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus,
  Save,
  Building,
  X,
  Edit,
  DollarSign,
  Trash2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Invoice, InvoiceItem, InvoiceTemplate } from '../../types/invoice';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Partial<Invoice>) => void;
}

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'items' | 'settings'>('basic');
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'BDT',
    status: 'draft',
    items: [],
    subtotal: 0,
    taxAmount: 0,
    totalAmount: 0,
    terms: 'Payment due within 30 days. Late payments subject to fees.',
    notes: 'Thank you for your business!',
    sharedWith: []
  });

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    description: '',
    quantity: 1,
    unitPrice: 0,
    serviceType: 'Service',
    taxRate: 15
  });

  // Mock clients data
  const mockClients = [
    { id: 'client-1', name: 'Acme Corporation', email: 'billing@acme.com', company: 'Acme Corporation' },
    { id: 'client-2', name: 'Tech Startup Ltd', email: 'finance@techstartup.com', company: 'Tech Startup Ltd' },
    { id: 'client-3', name: 'Digital Agency', email: 'accounts@digitalagency.com', company: 'Digital Agency' }
  ];

  // Mock templates
  const mockTemplates: InvoiceTemplate[] = [
    {
      id: 'template-1',
      name: 'Web Development',
      description: 'Standard web development invoice template',
      defaultItems: [
        { description: 'Frontend Development', quantity: 1, unitPrice: 50000, serviceType: 'Development', taxRate: 15 },
        { description: 'Backend Development', quantity: 1, unitPrice: 75000, serviceType: 'Development', taxRate: 15 }
      ],
      defaultTerms: 'Payment due within 30 days',
      defaultNotes: 'Thank you for your business!',
      taxSettings: { enabled: true, rate: 15, name: 'VAT' },
      currency: 'BDT',
      companyInfo: {
        name: 'NEXARA Agency',
        address: 'Dhaka, Bangladesh',
        phone: '+8801234567890',
        email: 'info@nexara.com',
        website: 'www.nexara.com',
        taxId: 'TX-NEXARA-001'
      }
    }
  ];

  useEffect(() => {
    if (selectedClient) {
      const client = mockClients.find(c => c.id === selectedClient);
      if (client) {
        setFormData(prev => ({
          ...prev,
          clientId: client.id,
          clientInfo: {
            name: client.name,
            email: client.email,
            phone: '',
            company: client.company,
            address: ''
          }
        }));
      }
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedTemplate) {
      const template = mockTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        const items = template.defaultItems.map((item, index) => ({
          ...item,
          id: `item-${index}`,
          total: item.quantity * item.unitPrice
        }));
        const subtotal = items.reduce((sum, item) => sum + item.total, 0);
        const taxAmount = template.taxSettings.enabled ? subtotal * (template.taxSettings.rate / 100) : 0;
        
        setFormData(prev => ({
          ...prev,
          items,
          subtotal,
          taxAmount,
          totalAmount: subtotal + taxAmount,
          terms: template.defaultTerms,
          notes: template.defaultNotes,
          currency: template.currency
        }));
      }
    }
  }, [selectedTemplate]);

  const addItem = () => {
    if (newItem.description && newItem.unitPrice! > 0) {
      const item: InvoiceItem = {
        id: `item-${Date.now()}`,
        description: newItem.description!,
        quantity: newItem.quantity!,
        unitPrice: newItem.unitPrice!,
        total: newItem.quantity! * newItem.unitPrice!,
        serviceType: newItem.serviceType!,
        taxRate: newItem.taxRate
      };
      
      const updatedItems = [...(formData.items || []), item];
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const taxAmount = subtotal * 0.15; // 15% tax
      
      setFormData(prev => ({
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        totalAmount: subtotal + taxAmount
      }));
      
      setNewItem({
        description: '',
        quantity: 1,
        unitPrice: 0,
        serviceType: 'Service',
        taxRate: 15
      });
    }
  };

  const removeItem = (itemId: string) => {
    const updatedItems = formData.items?.filter(item => item.id !== itemId) || [];
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * 0.15;
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      taxAmount,
      totalAmount: subtotal + taxAmount
    }));
  };

  const handleSave = () => {
    if (formData.clientId && formData.items && formData.items.length > 0) {
      onSave({
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current-user'
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-lighter border border-white/10 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Create New Invoice</h2>
            <p className="text-gray-400">Generate professional invoices for your clients</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {[
            { id: 'basic', label: 'Basic Info', icon: FileText },
            { id: 'items', label: 'Line Items', icon: DollarSign },
            { id: 'settings', label: 'Settings', icon: Edit }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'basic' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Client Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Select Client</label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Choose a client...</option>
                    {mockClients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.company} - {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Choose template...</option>
                    {mockTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Invoice Number</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Client Info */}
              {formData.clientInfo && (
                <div className="bg-dark border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Building size={20} />
                    Client Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Client Name</label>
                      <input
                        type="text"
                        value={formData.clientInfo.name}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          clientInfo: { ...prev.clientInfo!, name: e.target.value }
                        }))}
                        className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Company</label>
                      <input
                        type="text"
                        value={formData.clientInfo.company}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          clientInfo: { ...prev.clientInfo!, company: e.target.value }
                        }))}
                        className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        value={formData.clientInfo.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          clientInfo: { ...prev.clientInfo!, email: e.target.value }
                        }))}
                        className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Phone</label>
                      <input
                        type="tel"
                        value={formData.clientInfo.phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          clientInfo: { ...prev.clientInfo!, phone: e.target.value }
                        }))}
                        className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'items' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Add Item Form */}
              <div className="bg-dark border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Add Line Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Description</label>
                    <input
                      type="text"
                      placeholder="Service or product description"
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Unit Price</label>
                    <input
                      type="number"
                      min="0"
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      onClick={addItem}
                      className="w-full h-12"
                      disabled={!newItem.description || newItem.unitPrice! <= 0}
                    >
                      <Plus size={18} />
                      Add Item
                    </Button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-dark border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Invoice Items</h3>
                {formData.items && formData.items.length > 0 ? (
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-dark-lighter rounded-xl border border-white/10"
                      >
                        <div className="flex-1">
                          <div className="text-white font-medium">{item.description}</div>
                          <div className="text-sm text-gray-400">{item.serviceType}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Qty</div>
                          <div className="text-white font-medium">{item.quantity}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Price</div>
                          <div className="text-white font-medium">BDT {item.unitPrice.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Total</div>
                          <div className="text-primary font-bold">BDT {item.total.toLocaleString()}</div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No items added yet. Add your first line item to get started.</p>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-dark border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Invoice Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>BDT {formData.subtotal?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (15%):</span>
                    <span>BDT {formData.taxAmount?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-white pt-3 border-t border-white/10">
                    <span>Total:</span>
                    <span className="text-primary">BDT {formData.totalAmount?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Payment Terms</label>
                  <textarea
                    value={formData.terms}
                    onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
                    rows={4}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Share with Employees</label>
                <div className="bg-dark border border-white/10 rounded-2xl p-4">
                  <p className="text-gray-400 mb-3">Select employees who should have access to this invoice:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4'].map((employee, index) => (
                      <label key={index} className="flex items-center gap-3 text-gray-300">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-dark text-primary"
                        />
                        <span className="text-sm">{employee}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-8 border-t border-white/10">
          <div className="text-gray-400">
            <span className="text-sm">Invoice will be created as </span>
            <span className="text-primary font-bold">DRAFT</span>
            <span className="text-sm">. You can send it to client when ready.</span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.clientId || !formData.items || formData.items.length === 0}
              className="flex items-center gap-2"
            >
              <Save size={18} />
              Create Invoice
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateInvoiceModal;
