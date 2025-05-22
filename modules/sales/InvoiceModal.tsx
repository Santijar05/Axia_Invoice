'use client';

import { jsPDF } from 'jspdf';
import { useState } from 'react';
import autoTable from 'jspdf-autotable';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';

import { ClientDAO } from '@/types/Api';
import { createPayment } from '@/lib/api-sales';
import Select from '@/components/atoms/select';
import { crearFacturaVenta } from '@/lib/api-saleInvoce';
import { SaleItem, SaleItemForAPI } from '@/types/Api';
import SearchBarUniversal from '@/components/molecules/SearchBar';
<<<<<<< HEAD
import { createPayment } from '@/lib/api-sales';
import { crearFacturaVenta } from '@/lib/api-saleInvoce';
=======
import { ToggleSwitch } from '@/components/molecules/ToggleSwitch';
>>>>>>> 1e7d804b8989f66f1ef475474988582f7e647346

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
  const t = useTranslations("invoiceModal");

  const { user } = useAuth();
  const [selectedClient, setSelectedClient] = useState<ClientDAO | null>(null);
  const [isElectronicBill, setIsElectronicBill] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  };

  const generatePDF = () => {
    if (!selectedClient) return;
    
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(t('pdf.title'), 20, 20);

    doc.setFontSize(10);
    doc.text(user?.name || t('pdf.companyName'), 20, 30);
    doc.text(`${t('pdf.nit')}: ${user?.tenantId || 'XXX.XXX.XXX-X'}`, 20, 35);
    doc.text(`${t('pdf.address')}: Calle X #X-XX`, 20, 40);
    doc.text(`${t('pdf.phone')}: XXX-XXX-XXX`, 20, 45);

    doc.text(`${t('pdf.client')}:`, 20, 50);
    doc.text(
      `${selectedClient.firstName} ${selectedClient.lastName}`,
      20,
      55
    );

    doc.text(`${t('pdf.date')}: ${new Date().toLocaleDateString('es-CO')}`, 140, 20);
    doc.text(
      `${t('pdf.paymentMethod')}: ${t(`paymentMethods.${paymentMethod}`)}`,
      140,
      25
    );

    doc.setFontSize(12);
    doc.text(t('pdf.productDescription'), 20, 70);

    const tableHeaders = [
      t('pdf.headers.product'),
      t('pdf.headers.quantity'),
      t('pdf.headers.unitPrice'),
      t('pdf.headers.tax'),
      t('pdf.headers.subtotal'),
    ];
    
    const tableData = items.map((item) => [
      item.name || t('pdf.headers.product'),
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
    doc.text(`${t('labels.subtotal')}: ${formatCurrency(subtotal)}`, 140, finalY);
    doc.text(`${t('labels.tax')}: ${formatCurrency(taxTotal)}`, 140, finalY + 5);
    doc.setFontSize(14);
    doc.text(`${t('labels.total')}: ${formatCurrency(total)}`, 140, finalY + 15);

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const handleProcessSale = async () => {
    if (!selectedClient) {
      setError(t('errors.noClient'));
      return;
    }

    if (!user?.tenantId) {
      setError(t('errors.auth'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const productsForAPI: SaleItemForAPI[] = items.map(item => ({
        tenantId: user?.tenantId || '', 
        productId: item.productId || '',
        quantity: item.quantity
      }));
      
      const invoiceResponse = await crearFacturaVenta({
        clientId: selectedClient.id,
        totalPrice: total,
        electronicBill: isElectronicBill,
        products: productsForAPI
      });
      
      await createPayment({
        tenantId: user.tenantId,
        amount: total,
        paymentMethod: paymentMethod,
        reference: `PAY-${Date.now()}`,
        invoiceId: invoiceResponse.id
      });

      generatePDF();
      
    } catch (error) {
      console.error('Error processing sale:', error);
      setError(error instanceof Error ? error.message :  t('errors.sale'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAndClose = () => {
    onSuccess();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">{t('title')}</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">{t('client')}</label>
        <SearchBarUniversal
          searchType="clients"
          onAddToCart={(item) => setSelectedClient(item as ClientDAO)} 

          showResults={true}
          placeholder={t('clientPlaceholder')}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">{t('payment')}</label>
        <Select
          value={paymentMethod}
          onChange={(e: any) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"

          options={[
            { value: "CASH", label: t("paymentMethods.CASH") },
            { value: "CARD", label: t("paymentMethods.CARD") },
            { value: "TRANSFER", label: t("paymentMethods.TRANSFER") }
          ]}
          placeholder={t('paymentPlaceholder')}
        />
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between">
<<<<<<< HEAD
          <span className='text-white'>Generar Factura Electrónica</span>
          
=======
          <span className='text-white'>{t('electronicBill')}</span>
          <ToggleSwitch
            options={[t('toggle.no'), t('toggle.yes')]}
            activeIndex={isElectronicBill ? 1 : 0} 
            onChange={(index) => setIsElectronicBill(index === 1)} 
          />
>>>>>>> 1e7d804b8989f66f1ef475474988582f7e647346
        </div>
      </div>
      
      <div className="space-y-2 my-4">
        <div className="flex justify-between">
          <span className='text-white'>{t('labels.subtotal')}:</span>
          <span className='text-white'>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className='text-white'>{t('labels.tax')}:</span>
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
          <h3 className="text-lg font-medium mb-3">{t('preview.title')}</h3>
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
              {t('preview.finish')}
            </button>
            <a
              href={pdfUrl}
              download={`factura_${new Date().toISOString().split('T')[0]}.pdf`}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleDownloadAndClose}
            >
              {t('preview.download')}
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
            {t('cancel')}
          </button>
          <button
            onClick={handleProcessSale}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            disabled={isLoading || !selectedClient}
          >
            {isLoading ? t('processing') : t('submit')}
          </button>
        </div>
      )}
    </div>
  );
}