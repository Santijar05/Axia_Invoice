'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createSaleInvoice, createPayment } from '@/lib/api-sales';
import { SaleItem, SaleItemForAPI } from '@/types/Api';
import { ClientDAO } from '@/types/Api';
import ClientSelector from './ClientSelector';
import { Switch } from '@headlessui/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceModalProps {
  subtotal: number;
  taxTotal: number;
  total: number;
  items: SaleItem[];
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InvoiceModal({
  subtotal,
  taxTotal,
  total,
  items,
  onSuccess,
  onCancel
}: InvoiceModalProps) {
  const { user } = useAuth();
  const [selectedClient, setSelectedClient] = useState<ClientDAO | null>(null);
  const [isElectronicBill, setIsElectronicBill] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  };

  const generatePDF = () => {
    if (!selectedClient) return;
    
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Factura de Venta", 20, 20);

    doc.setFontSize(10);
    doc.text(user?.name || "Nombre Empresa", 20, 30);
    doc.text(`NIT: ${user?.tenantId || 'XXX.XXX.XXX-X'}`, 20, 35);
    doc.text("Dirección: Calle X #X-XX", 20, 40);
    doc.text("Teléfono: XXX-XXX-XXX", 20, 45);

    doc.text("Cliente:", 20, 50);
    doc.text(
      `${selectedClient.firstName} ${selectedClient.lastName}`,
      20,
      55
    );

    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 140, 20);
    doc.text(
      `Método de Pago: ${paymentMethod === 'CASH' ? 'Efectivo' : paymentMethod === 'CARD' ? 'Tarjeta' : 'Transferencia'}`,
      140,
      25
    );

    doc.setFontSize(12);
    doc.text("Descripción de Productos", 20, 70);

    const tableHeaders = ["Producto", "Cant.", "Precio Unit.", "Impuesto", "Subtotal"];
    const tableData = items.map((item) => [
      item.name || 'Producto',
      item.quantity.toString(),
      formatCurrency(item.basePrice || item.price),
      item.tax.toString(),
      formatCurrency(item.quantity * item.price),
    ]);

    autoTable(doc, {
      startY: 75,
      head: [tableHeaders],
      body: tableData,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 139, 202] },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ${formatCurrency(subtotal)}`, 140, finalY);
    doc.text(`Impuestos: ${formatCurrency(taxTotal)}`, 140, finalY + 5);
    doc.setFontSize(14);
    doc.text(`TOTAL: ${formatCurrency(total)}`, 140, finalY + 15);

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const handleProcessSale = async () => {
    if (!selectedClient) {
      setError('Debe seleccionar un cliente');
      return;
    }
    
    if (!user?.tenantId) {
      setError('Error de autenticación');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const productsForAPI: SaleItemForAPI[] = items.map(item => ({
        productId: item.productId || '', 
        quantity: item.quantity
      }));
      
      const invoiceResponse = await createSaleInvoice({
        tenantId: user.tenantId,
        clientId: selectedClient.id,
        totalPrice: total,
        electronicBill: isElectronicBill,
        products: productsForAPI
      }) as { invoice: { id: string } };
      
      await createPayment({
        tenantId: user.tenantId,
        amount: total,
        paymentMethod: paymentMethod,
        reference: `PAY-${Date.now()}`,
        invoiceId: invoiceResponse.invoice.id
      });

      generatePDF();
      
    } catch (error) {
      console.error('Error processing sale:', error);
      setError(error instanceof Error ? error.message : 'Error procesando la venta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAndClose = () => {
    onSuccess();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Detalles de la Venta</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">Cliente</label>
        <ClientSelector onSelect={setSelectedClient} />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">Método de Pago</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="CASH">Efectivo</option>
          <option value="CARD">Tarjeta</option>
          <option value="TRANSFER">Transferencia</option>
        </select>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className='text-white'>Generar Factura Electrónica</span>
          <Switch
            checked={isElectronicBill}
            onChange={setIsElectronicBill}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isElectronicBill ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isElectronicBill ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </Switch>
        </div>
      </div>
      
      <div className="space-y-2 my-4">
        <div className="flex justify-between">
          <span className='text-white'>Subtotal:</span>
          <span className='text-white'>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className='text-white'>Impuestos:</span>
          <span className='text-white'>{formatCurrency(taxTotal)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span className='text-white'>Total:</span>
          <span className='text-white'>{formatCurrency(total)}</span>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {pdfUrl ? (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Vista previa de la factura</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            title="Vista previa de la factura"
            className="border border-gray-300 mb-4"
          />
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleDownloadAndClose}
              className="px-4 py-2 text-white border border-gray-300 rounded hover:bg-gray-100"
              disabled={isLoading}
            >
              Finalizar
            </button>
            <a
              href={pdfUrl}
              download={`factura_${new Date().toISOString().split('T')[0]}.pdf`}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleDownloadAndClose}
            >
              Descargar Factura y Finalizar
            </a>
          </div>
        </div>
      ) : (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-white hover:bg-gray-100"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleProcessSale}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            disabled={isLoading || !selectedClient}
          >
            {isLoading ? 'Procesando...' : 'Completar Venta'}
          </button>
        </div>
      )}
    </div>
  );
}