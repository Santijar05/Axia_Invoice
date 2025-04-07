'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import EmptyState from '@/components/molecules/EmptyState';
import { deleteSaleInvoice, getListSaleInvoices } from "@/lib/api-saleInvoce";

export default function ScreenInvoices() {
    const router = useRouter();
    const [invoices, setInvoices] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const initialFetchDone = useRef(false);

    const tableHeaders = ["Cliente", "Fecha", "Total"];

    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllInvoices();
            initialFetchDone.current = true;
        }
    }, []);

    const formatAndSetInvoices = (invoiceList: any[]) => {
        const formatted = invoiceList.map((invoice) => ({
            id: invoice.id,
            cliente: `${invoice.client?.firstName || "Nombre"} ${invoice.client?.lastName || "Desconocido"}`,
            fecha: new Date(invoice.date).toLocaleDateString(),
            total: `$${(invoice.totalPrice || 0).toFixed(2)}`,
        }));
        setInvoices(formatted);
    };

    const fetchAllInvoices = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const res = await getListSaleInvoices();
            if (res && Array.isArray(res)) {
                formatAndSetInvoices(res);
            }
        } catch (err) {
            console.error('Error al obtener facturas:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewInvoice = (invoiceId: string) => {
        router.push(`/sales/sales-invoices/${invoiceId}`);
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        try {
            await deleteSaleInvoice(invoiceId);
            setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
        } catch (err) {
            console.error("Error eliminando la factura:", err);
            alert("Ocurrió un error al eliminar la factura.");
        }
    };

    return (
        <div className="container mx-auto">
            <Toolbar title="Gestión de Facturas" invoice={true} />

            {isLoading ? (
                <p className="text-gray-500 text-sm mb-2 mt-4">Cargando facturas...</p>
            ) : invoices.length === 0 ? (
                <EmptyState message="No hay facturas registradas." />
            ) : (
                <CustomTable
                    title="Lista de Facturas"
                    headers={tableHeaders}
                    options={true}
                    data={invoices}
                    contextType="invoices"
                    customActions={{
                        view: handleViewInvoice,
                        delete: handleDeleteInvoice,
                    }}
                    actionLabels={{
                        view: "Ver Detalles"
                    }}
                />
            )}
        </div>
    );
}
