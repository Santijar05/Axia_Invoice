'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import EmptyState from '@/components/molecules/EmptyState';
import { deleteSaleInvoice, getListSaleInvoices } from "@/lib/api-saleInvoce";

export default function ScreenInvoices() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("invoices");

    const [invoices, setInvoices] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const initialFetchDone = useRef(false);

    const tableHeaders = [
        { key: "cliente", label: t("customer") },
        { key: "fecha", label: t("date") },
        { key: "total", label: t("total") }
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
            cliente: `${invoice.client?.firstName || t("name")} ${invoice.client?.lastName || t("unknown")}`,
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
            console.error(t("fetchError"), err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewInvoice = (invoiceId: string) => {
        router.push(`/${locale}/sales/sales-invoices/${invoiceId}`);
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        try {
            await deleteSaleInvoice(invoiceId);
            setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
        } catch (err) {
            console.error(t("deleteError"), err);
            alert(t("deleteErrorAlert"));
        }
    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title={t("management")}
                onAddNew={() => router.push(`/${locale}/sales/make-sales`)}
            />

            {isLoading ? (
                <p className="text-gray-500 text-sm mb-2 mt-4">{t("loading")}</p>
            ) : invoices.length === 0 ? (
                <EmptyState message={t("noInvoices")} />
            ) : (
                <CustomTable
                    title={t("invoiceList")}
                    headers={tableHeaders}
                    options={true}
                    data={invoices}
                    contextType="invoices"
                    customActions={{
                        view: handleViewInvoice,
                        delete: handleDeleteInvoice,
                    }}
                    actionLabels={{
                        view: t("viewDetails")
                    }}
                />
            )}
        </div>
    );
}