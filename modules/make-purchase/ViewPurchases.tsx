'use client';

import { useEffect, useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import Toolbar from "@/components/organisms/ToolBar";
import EmptyState from '@/components/molecules/EmptyState';
import CustomTable from "@/components/organisms/CustomTable";
import { deletePurchaseInvoice, getListSalePurchases } from "@/lib/api-purchase";

export default function ViewPurchases() {
    const router = useRouter();
    const locale = useLocale();
    const [invoices, setInvoices] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const initialFetchDone = useRef(false);
    const t = useTranslations("purchases");

    const tableHeaders = [
        { label: t("headers.id"), key: "id"},
        { label: t("headers.supplier"), key: "proveedor"},
        { label: t("headers.date"), key: "fecha"},
        { label: t("headers.total"), key: "total"},
    ];

    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllInvoices();
            initialFetchDone.current = true;
        }
    }, []);

    const formatAndSetInvoices = (invoiceList: any[]) => {
        const formatted = invoiceList.map((invoice) => ({
            id: invoice.id,
            proveedor: `${invoice.supplier?.name || "Nombre"}`,
            fecha: new Date(invoice.date).toLocaleDateString(),
            total: `$${(invoice.totalPrice || 0).toFixed(2)}`,
        }));

        setInvoices(formatted);
    };

    const fetchAllInvoices = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const res = await getListSalePurchases();
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
        router.push(`/${locale}/shopping/view-purchases/${invoiceId}`);
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        try {
            await deletePurchaseInvoice(invoiceId);
            setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
        } catch (err) {
            console.error("Error eliminando la factura:", err);
            alert(t("deleteError"));
        }
    };

    return (
        <div className="container mx-auto">
            <Toolbar title={t("title")} invoice={true} />

            {isLoading ? (
                <p className="text-gray-500 text-sm mb-2 mt-4">{t("loading")}</p>
            ) : invoices.length === 0 ? (
                <EmptyState message={t("empty")} />
            ) : (
                <CustomTable
                    title={t("tableTitle")}
                    headers={tableHeaders}
                    options={true}
                    data={invoices}
                    contextType="invoices"
                    customActions={{
                        view: handleViewInvoice,
                        delete: handleDeleteInvoice,
                    }}
                />
            )}
        </div>
    );
}
