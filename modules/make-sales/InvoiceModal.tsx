'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import { getListClients } from '@/lib/api-clients';
import Select from '@/components/atoms/select';
import CustomButton from '@/components/atoms/CustomButton';
import { ClientDAO } from '@/types/Api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interfaces
interface PaymentMethod {
  id: string;
  name: string;
}

interface SaleItem {
  id: number;
  name: string;
  quantity: number;
  stock: number;
  tax: number;
  price: number;
  basePrice: number;
}

interface InvoiceFormData {
  paymentMethod: string;
  electronicInvoice: boolean;
  customerName?: string;
  customerId?: string;
  customerEmail?: string;
}

export interface InvoiceModalProps {
  subtotal: number;
  taxTotal: number;
  total: number;
  items?: SaleItem[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'cash', name: 'Efectivo' },
  { id: 'credit_card', name: 'Tarjeta de Crédito' },
  { id: 'debit_card', name: 'Tarjeta de Débito' },
  { id: 'transfer', name: 'Transferencia Bancaria' },
  { id: 'nequi', name: 'Nequi' },
  { id: 'daviplata', name: 'Daviplata' },
];

const InvoiceModal = forwardRef<HTMLFormElement, InvoiceModalProps>(
  ({ subtotal, taxTotal, total, items = [], onSuccess, onCancel }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm<InvoiceFormData>({
      defaultValues: {
        electronicInvoice: false,
      },
    });

    const electronicInvoice = watch('electronicInvoice');
    const [customers, setCustomers] = React.useState<ClientDAO[] | undefined>();
    const [selectedCustomer, setSelectedCustomer] = React.useState<ClientDAO | undefined>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
      async function fetchCustomers() {
        try {
          const data = await getListClients();
          setCustomers(data);
        } catch (err: any) {
          setError(err.message || "Error inesperado");
        } finally {
          setLoading(false);
        }
      }
      fetchCustomers();
    }, []);

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(value);
    };

    const generatePDF = (data: InvoiceFormData) => {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(18);
      doc.text("Factura de Venta", 20, 20);

      // Company Info
      doc.setFontSize(10);
      doc.text("Nombre Empresa", 20, 30);
      doc.text("NIT: XXX.XXX.XXX-X", 20, 35);
      doc.text("Dirección: Calle X #X-XX", 20, 40);

      // Customer Info
      doc.text("Cliente:", 20, 50);
      doc.text(
        selectedCustomer
          ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
          : "Cliente no especificado",
        20,
        55
      );

      // Invoice Details
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 140, 20);
      doc.text(
        `Método de Pago: ${paymentMethods.find((m) => m.id === data.paymentMethod)?.name}`,
        140,
        25
      );

      // Items Table
      doc.setFontSize(12);
      doc.text("Descripción de Productos", 20, 70);

      const tableHeaders = ["Producto", "Cant.", "Precio Unit.", "Subtotal"];
      const tableData = items.map((item) => [
        item.name,
        item.quantity.toString(),
        formatCurrency(item.price),
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

      // Totals
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.text(`Subtotal: ${formatCurrency(subtotal)}`, 140, finalY);
      doc.text(`Impuestos: ${formatCurrency(taxTotal)}`, 140, finalY + 5);
      doc.setFontSize(14);
      doc.text(`TOTAL: ${formatCurrency(total)}`, 140, finalY + 15);

      // Generate Blob for preview and save file
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      doc.save(`factura_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const onSubmit = (data: InvoiceFormData) => {
      console.log('Datos de facturación:', data);
      generatePDF(data);
      onSuccess?.();
    };

    const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = event.target.value;
      const customer = customers?.find((p) => p.id === selectedId);
      if (customer) {
        setSelectedCustomer(customer);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 p-6"
      >
        <section className="border-b border-gray-200 pb-4">
          <div className="mb-4">
            <span className="text-white text-sm font-medium">Cliente:</span>
            <Select
              className="text-homePrimary-200 mt-2"
              placeholder="Seleccionar proveedor"
              options={
                customers?.map((client) => ({
                  value: client.id,
                  label: `${client.firstName} ${client.lastName}`,
                })) || []
              }
              onChange={handleCustomerChange}
            />
          </div>
          <h3 className="text-lg font-medium text-white mb-3">Detalles de la Venta</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-white">Subtotal:</span>
              <span className="text-white">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-white">Impuestos:</span>
              <span className="text-white">{formatCurrency(taxTotal)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200 text-white">
              <span>Total:</span>
              <span className="text-white">{formatCurrency(total)}</span>
            </div>
          </div>
        </section>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-500">
            Método de Pago <span className="text-red-500">*</span>
          </label>
          <Select
            className="w-full text-white"
            placeholder="Seleccione método de pago"
            options={paymentMethods.map((method) => ({
              value: method.id,
              label: method.name,
            }))}
            {...register('paymentMethod', {
              required: 'Seleccione un método de pago',
            })}
          />
          {errors.paymentMethod && (
            <p className="text-sm text-red-600">{errors.paymentMethod.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Generar Factura Electrónica
          </label>
          <Switch
            checked={electronicInvoice}
            onChange={(value) => setValue('electronicInvoice', value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              electronicInvoice ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                electronicInvoice ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </Switch>
        </div>

        {pdfUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-3">Vista previa del PDF</h3>
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              title="Vista previa de la factura"
              className="border border-gray-300"
            />
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <CustomButton
            text="Cancelar"
            style="border text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
            typeButton="button"
            onClickButton={onCancel}
          />
          <CustomButton
            text="Confirmar Venta"
            style="border text-white bg-blue-600 hover:bg-blue-700"
            typeButton="submit"
          />
        </div>
      </form>
    );
  }
);

InvoiceModal.displayName = 'InvoiceModal';
export default InvoiceModal;