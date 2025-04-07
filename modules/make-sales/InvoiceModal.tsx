import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createSaleInvoice, createPayment } from '@/lib/api-sales';
import { SaleItem, SaleItemForAPI } from '@/types/Api';
import { ClientDAO } from '@/types/Api';
import ClientSelector from './ClientSelector';
import { Switch } from '@headlessui/react';
import Select from '@/components/atoms/select';

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

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
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
      
      setTimeout(() => {
        console.log(" Llamando a onSuccess desde setTimeout");
        onSuccess();
        
        // Añadir un segundo temporizador como refuerzo (por si el primero falla)
        setTimeout(() => {
          console.log(" Segundo intento de limpieza");
          onSuccess();
        }, 200);
      }, 500); 
    } catch (error) {
      console.error('Error processing sale:', error);
      setError(error instanceof Error ? error.message : 'Error procesando la venta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Detalles de la Venta</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cliente</label>
        <ClientSelector onSelect={setSelectedClient} />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Método de Pago</label>
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
          <span>Generar Factura Electrónica</span>
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
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos:</span>
          <span>{formatCurrency(taxTotal)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
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
    </div>
  );
}
