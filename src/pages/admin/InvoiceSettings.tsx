import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Send, 
  Settings,
  Bell,
  RefreshCw,
  Plus,
  Edit
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { InvoiceSettings, Invoice } from '../../types/invoice';

// Mock data - replace with actual API calls
const mockSettings: InvoiceSettings = {
  autoGenerate: true,
  generateOnOrderStatus: ['completed', 'approved'],
  dueDays: 30,
  autoSend: true,
  reminderDays: [7, 3, 1],
  templateId: 'template-1',
  prefix: 'INV',
  startingNumber: 1001,
  currency: 'BDT',
  taxSettings: {
    enabled: true,
    rate: 15,
    name: 'VAT'
  }
};

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    clientId: 'client-1',
    clientInfo: {
      name: 'Acme Corporation',
      email: 'billing@acme.com',
      phone: '+8801234567890',
      company: 'Acme Corporation'
    },
    items: [
      {
        id: '1',
        description: 'Web Development',
        quantity: 1,
        unitPrice: 100000,
        total: 100000,
        serviceType: 'Development',
        taxRate: 15
      }
    ],
    subtotal: 100000,
    taxAmount: 15000,
    totalAmount: 115000,
    currency: 'BDT',
    status: 'sent',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    createdBy: 'admin-1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    sharedWith: ['emp-1', 'emp-2']
  }
];

const InvoiceSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<InvoiceSettings>(mockSettings);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [activeTab, setActiveTab] = useState<'general' | 'automation' | 'templates' | 'notifications'>('general');
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // API call to save settings
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) return;
    
    setIsSendingTest(true);
    try {
      // API call to send test email
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Test email sent successfully!');
      setTestEmail('');
    } catch (error) {
      alert('Failed to send test email');
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleGenerateSampleInvoice = () => {
    console.log('Generating sample invoice');
    // API call to generate sample invoice
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
            <h1 className="text-4xl font-black text-white mb-2">Invoice Settings</h1>
            <p className="text-gray-400">Configure automatic invoice generation and management</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleGenerateSampleInvoice}
              className="flex items-center gap-2"
            >
              <FileText size={18} />
              Generate Test Invoice
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveSettings}
              className="flex items-center gap-2"
            >
              <Settings size={18} />
              Save Settings
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'automation', label: 'Automation', icon: RefreshCw },
            { id: 'templates', label: 'Templates', icon: FileText },
            { id: 'notifications', label: 'Notifications', icon: Bell }
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

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Basic Settings */}
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Invoice Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Invoice Prefix</label>
                    <input
                      type="text"
                      value={settings.prefix}
                      onChange={(e) => setSettings(prev => ({ ...prev, prefix: e.target.value }))}
                      className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Starting Number</label>
                    <input
                      type="number"
                      value={settings.startingNumber}
                      onChange={(e) => setSettings(prev => ({ ...prev, startingNumber: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Default Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    >
                      <option value="BDT">BDT - Bangladeshi Taka</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Default Due Days</label>
                    <input
                      type="number"
                      value={settings.dueDays}
                      onChange={(e) => setSettings(prev => ({ ...prev, dueDays: parseInt(e.target.value) || 30 }))}
                      className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Settings */}
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Tax Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="enableTax"
                      checked={settings.taxSettings.enabled}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        taxSettings: { ...prev.taxSettings, enabled: e.target.checked }
                      }))}
                      className="rounded border-white/20 bg-dark text-primary w-5 h-5"
                    />
                    <label htmlFor="enableTax" className="text-gray-300 font-medium">
                      Enable Tax Calculation
                    </label>
                  </div>

                  {settings.taxSettings.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Tax Name</label>
                        <input
                          type="text"
                          value={settings.taxSettings.name}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            taxSettings: { ...prev.taxSettings, name: e.target.value }
                          }))}
                          className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Tax Rate (%)</label>
                        <input
                          type="number"
                          value={settings.taxSettings.rate}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            taxSettings: { ...prev.taxSettings, rate: parseFloat(e.target.value) || 0 }
                          }))}
                          className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'automation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Automation Settings */}
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Automation Rules</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="autoGenerate"
                      checked={settings.autoGenerate}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoGenerate: e.target.checked }))}
                      className="rounded border-white/20 bg-dark text-primary w-5 h-5"
                    />
                    <label htmlFor="autoGenerate" className="text-gray-300 font-medium">
                      Automatically generate invoices
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="autoSend"
                      checked={settings.autoSend}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoSend: e.target.checked }))}
                      className="rounded border-white/20 bg-dark text-primary w-5 h-5"
                    />
                    <label htmlFor="autoSend" className="text-gray-300 font-medium">
                      Automatically send invoices to clients
                    </label>
                  </div>

                  {settings.autoGenerate && (
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                        Generate when order status is:
                      </label>
                      <div className="space-y-3">
                        {['pending', 'completed', 'approved', 'delivered'].map((status) => (
                          <label key={status} className="flex items-center gap-3 text-gray-300">
                            <input
                              type="checkbox"
                              checked={settings.generateOnOrderStatus.includes(status)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSettings(prev => ({
                                    ...prev,
                                    generateOnOrderStatus: [...prev.generateOnOrderStatus, status]
                                  }));
                                } else {
                                  setSettings(prev => ({
                                    ...prev,
                                    generateOnOrderStatus: prev.generateOnOrderStatus.filter(s => s !== status)
                                  }));
                                }
                              }}
                              className="rounded border-white/20 bg-dark text-primary w-5 h-5"
                            />
                            <span className="capitalize">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Auto-Generated Invoices */}
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Auto-Generated Invoices</h2>
                <div className="space-y-4">
                  {invoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-dark border border-white/10 rounded-xl">
                      <div>
                        <div className="text-white font-medium">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-gray-400">{new Date(invoice.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary font-bold">BDT {invoice.totalAmount.toLocaleString()}</div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          invoice.status === 'sent' ? 'bg-blue-500/10 text-blue-500' :
                          invoice.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {invoice.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Invoice Templates</h2>
                  <Button className="flex items-center gap-2">
                    <Plus size={18} />
                    Create Template
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      id: 'template-1',
                      name: 'Standard Service Invoice',
                      description: 'Default template for service-based invoices',
                      items: 5,
                      lastUsed: '2024-01-15'
                    },
                    {
                      id: 'template-2',
                      name: 'Project-Based Invoice',
                      description: 'Template for fixed-price projects',
                      items: 8,
                      lastUsed: '2024-01-10'
                    }
                  ].map((template) => (
                    <div key={template.id} className="bg-dark border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
                          <p className="text-sm text-gray-400">{template.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit size={16} />
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{template.items} items</span>
                        <span>Last used: {template.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Email Settings */}
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Email Notifications</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                      Payment Reminder Days
                    </label>
                    <div className="space-y-3">
                      {[7, 3, 1].map((days) => (
                        <label key={days} className="flex items-center gap-3 text-gray-300">
                          <input
                            type="checkbox"
                            checked={settings.reminderDays.includes(days)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSettings(prev => ({
                                  ...prev,
                                  reminderDays: [...prev.reminderDays, days]
                                }));
                              } else {
                                setSettings(prev => ({
                                  ...prev,
                                  reminderDays: prev.reminderDays.filter(d => d !== days)
                                }));
                              }
                            }}
                            className="rounded border-white/20 bg-dark text-primary w-5 h-5"
                          />
                          <span>{days} days before due date</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                      Test Email Configuration
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="email"
                        placeholder="Enter test email address"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        className="flex-1 bg-dark border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      />
                      <Button
                        onClick={handleSendTestEmail}
                        disabled={!testEmail || isSendingTest}
                        className="flex items-center gap-2"
                      >
                        {isSendingTest ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Send size={18} />
                        )}
                        {isSendingTest ? 'Sending...' : 'Send Test'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification History */}
              <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Notifications</h2>
                <div className="space-y-3">
                  {[
                    {
                      type: 'invoice_sent',
                      message: 'Invoice INV-2024-001 sent to Acme Corporation',
                      time: '2 hours ago',
                      status: 'success'
                    },
                    {
                      type: 'payment_reminder',
                      message: 'Payment reminder sent for INV-2024-002',
                      time: '1 day ago',
                      status: 'success'
                    },
                    {
                      type: 'invoice_paid',
                      message: 'Payment received for INV-2024-003',
                      time: '2 days ago',
                      status: 'success'
                    }
                  ].map((notification) => (
                    <div key={notification.type} className="flex items-center gap-4 p-4 bg-dark border border-white/10 rounded-xl">
                      <div className={`w-3 h-3 rounded-full ${
                        notification.status === 'success' ? 'bg-emerald-500' :
                        notification.status === 'error' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-white text-sm">{notification.message}</div>
                        <div className="text-xs text-gray-400">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceSettingsPage;
