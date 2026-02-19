import React from 'react';
import { Invoice } from '../../types/invoice';

interface InvoicePrintViewProps {
  invoice: Invoice;
}

/** Professional printable invoice for PDF download via browser print */
export const InvoicePrintView: React.FC<InvoicePrintViewProps> = ({ invoice }) => (
  <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans" id="invoice-print-content">
    {/* Header with Logo and Invoice Info */}
    <div className="border-b-4 border-gray-900 pb-6 mb-8">
      <div className="flex justify-between items-start mb-6">
        {/* Company Logo and Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">NEXARA</span>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">NEXARA Agency</h2>
            <p className="text-sm text-gray-600">Strategic Digital Agency</p>
          </div>
        </div>
        
        {/* Invoice Badge */}
        <div className="text-right">
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg inline-block">
            <p className="text-xs font-bold uppercase tracking-wider mb-1">Invoice</p>
            <p className="text-xl font-black">{invoice.invoiceNumber}</p>
          </div>
        </div>
      </div>
      
      {/* Company Contact Info */}
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
        <div>
          <p className="font-semibold text-gray-800">Address</p>
          <p>Dhaka, Bangladesh</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Contact</p>
          <p>+8801234567890</p>
          <p>info@nexara.com</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Website</p>
          <p>www.nexara.com</p>
        </div>
      </div>
    </div>

    {/* Bill To Section */}
    <div className="grid grid-cols-2 gap-12 mb-8">
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3">Bill To</p>
        <p className="font-bold text-lg text-gray-900 mb-1">{invoice.clientInfo.name}</p>
        <p className="text-sm text-gray-700 font-medium mb-1">{invoice.clientInfo.company}</p>
        <p className="text-sm text-gray-600 mb-1">{invoice.clientInfo.email}</p>
        <p className="text-sm text-gray-600 mb-1">{invoice.clientInfo.phone}</p>
        {invoice.clientInfo.address && (
          <p className="text-sm text-gray-600">{invoice.clientInfo.address}</p>
        )}
        {invoice.clientInfo.taxId && (
          <p className="text-xs text-gray-500 mt-2">Tax ID: {invoice.clientInfo.taxId}</p>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3">Invoice Details</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Issue Date:</span>
            <span className="text-sm font-medium text-gray-900">{new Date(invoice.issueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Due Date:</span>
            <span className="text-sm font-medium text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`text-sm font-bold uppercase px-2 py-1 rounded ${
              invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
              invoice.status === 'overdue' ? 'bg-red-100 text-red-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {invoice.status}
            </span>
          </div>
          {invoice.paidDate && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Paid Date:</span>
              <span className="text-sm font-medium text-gray-900">{new Date(invoice.paidDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Project Information */}
    {invoice.projectInfo && (
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
        <p className="text-xs font-bold text-blue-800 uppercase mb-2">Project Details</p>
        <p className="font-bold text-lg text-gray-900 mb-2">{invoice.projectInfo.name}</p>
        <p className="text-sm text-gray-700 mb-2">{invoice.projectInfo.description}</p>
        <div className="text-xs text-gray-600">
          Duration: {new Date(invoice.projectInfo.startDate).toLocaleDateString()} - 
          {invoice.projectInfo.endDate ? new Date(invoice.projectInfo.endDate).toLocaleDateString() : 'Ongoing'}
        </div>
      </div>
    )}

    {/* Invoice Items Table */}
    <div className="mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="text-left py-4 px-6 text-sm font-bold uppercase tracking-wider">Description</th>
            <th className="text-center py-4 px-4 text-sm font-bold uppercase tracking-wider w-20">Qty</th>
            <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wider w-32">Unit Price</th>
            <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wider w-32">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="py-4 px-6">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.description}</p>
                  <p className="text-xs text-gray-500 bg-gray-200 inline-block px-2 py-1 rounded">{item.serviceType}</p>
                  {item.taxRate && (
                    <p className="text-xs text-gray-500 mt-1">Tax Rate: {item.taxRate}%</p>
                  )}
                </div>
              </td>
              <td className="text-center py-4 px-4">
                <span className="font-medium text-gray-900">{item.quantity}</span>
              </td>
              <td className="text-right py-4 px-6">
                <span className="font-medium text-gray-900">{invoice.currency} {item.unitPrice.toLocaleString()}</span>
              </td>
              <td className="text-right py-4 px-6">
                <span className="font-bold text-gray-900">{invoice.currency} {item.total.toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Summary Section */}
    <div className="flex justify-end mb-8">
      <div className="w-full md:w-1/3">
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Payment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-2 border-b border-gray-700">
              <span className="text-gray-300">Subtotal:</span>
              <span className="font-medium">{invoice.currency} {invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-700">
              <span className="text-gray-300">Tax:</span>
              <span className="font-medium">{invoice.currency} {invoice.taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2">
              <span>Total Amount:</span>
              <span className="text-red-400">{invoice.currency} {invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Terms and Notes */}
    <div className="grid grid-cols-2 gap-8 mb-8">
      {invoice.terms && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">Payment Terms</p>
          <p className="text-sm text-gray-700 leading-relaxed">{invoice.terms}</p>
        </div>
      )}
      
      {invoice.notes && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">Notes</p>
          <p className="text-sm text-gray-700 leading-relaxed">{invoice.notes}</p>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="border-t-2 border-gray-300 pt-6 mt-8">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-1">Thank you for your business!</p>
          <p>For any questions regarding this invoice, please contact us at info@nexara.com</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p className="font-semibold">NEXARA Agency</p>
          <p>Dhaka, Bangladesh</p>
          <p>www.nexara.com</p>
        </div>
      </div>
    </div>

    {/* Payment Information */}
    {invoice.status !== 'paid' && (
      <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
        <p className="text-sm font-bold text-yellow-800 mb-2">Payment Information</p>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Bank:</strong> Bank Name Here</p>
          <p><strong>Account Name:</strong> NEXARA Agency</p>
          <p><strong>Account Number:</strong> XXXX-XXXX-XXXX</p>
          <p><strong>Routing Number:</strong> XXXXXX</p>
        </div>
      </div>
    )}
  </div>
);
