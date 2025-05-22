'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import Toolbar from "@/components/organisms/ToolBar";
import EmptyState from '@/components/molecules/EmptyState';
import CustomTable from "@/components/organisms/CustomTable";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import { deleteSaleInvoice, getListSaleInvoices } from "@/lib/api-saleInvoce";
import TableFilter from "@/components/molecules/TableFilter";

export default function ScreenInvoices() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("saleInvoice");

    const [currentSort, setCurrentSort] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null);
    const [initialInvoices, setInitialInvoices] = useState<{ [key: string]: string }[]>([]);
    const [invoices, setInvoices] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const initialFetchDone = useRef(false);

    const tableHeaders = [
        { label: t("headers.id"), key: "id" },
        { label: t("headers.client"), key: "cliente" },
        { label: t("headers.date"), key: "fecha" },
        { label: t("headers.total"), key: "total" },
    ];

    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllInvoices();
            initialFetchDone.current = true;
        }
    }, []);

    const fetchAllInvoices = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const res = await getListSaleInvoices();
            
            if (res && Array.isArray(res)) {
                const formatted = res.map((invoice) => ({
                    id: invoice.id,
                    cliente: `${invoice.client?.firstName || "Nombre"} ${invoice.client?.lastName || "Desconocido"}`,
                    fecha: new Date(invoice.date).toLocaleDateString(),
                    total: `$${(invoice.totalPrice || 0).toFixed(2)}`,
                }));

                setInitialInvoices(formatted);
                setInvoices(formatted);
            }
        } catch (err) {
            console.error("Error al obtener facturas:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInvoicesFound = useCallback((results: any) => {
        const invoiceResults = results.filter((result: any) =>
            result.client && result.client.firstName && result.client.lastName
        );

        console.log("hola desde invoice", invoiceResults)
        if (invoiceResults.length > 0) {
            const formatted = invoiceResults.map((invoice: any) => ({
                id: invoice.id,
                cliente: `${invoice.client.firstName} ${invoice.client.lastName}`,
                fecha: new Date(invoice.date).toLocaleDateString(),
                total: `$${(invoice.totalPrice || 0).toFixed(2)}`,
            }));
            setInvoices(formatted);
        } else if (searchTerm && searchTerm.length >= 2) {
            setInvoices([{
                id: "no-results",
                cliente: `No se encontraron facturas para: "${searchTerm}"`,
                fecha: "",
                total: "",
            }]);
        } else {
            setInvoices([...initialInvoices]);
        }
    }, [searchTerm, initialInvoices]);

    const handleViewInvoice = (invoiceId: string) => {
        router.push(`/${locale}/sales/sales-invoices/${invoiceId}`);
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        try {
            await deleteSaleInvoice(invoiceId);
            setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
        } catch (err) {
            console.error("Error eliminando la factura:", err);
            alert(t("deleteError"));
        }
    };

    const sortInvoices = (data: { [key: string]: string }[], field: string, direction: 'asc' | 'desc') => {
        return [...data].sort((a, b) => {
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
        setCurrentSort({ field, direction });
        const sorted = sortInvoices([...invoices], field, direction);
        setInvoices(sorted);
    }, [invoices]);

    return (
        <div className="container mx-auto">
            <Toolbar title={t("title")} invoice={true} />

            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="w-72 my-4">
                    <SearchBarUniversal
                        onResultsFound={handleInvoicesFound}
                        showResults={false}
                        placeholder={t("searchPlaceholder")}
                        searchType="invoices" 
                        onSearchTermChange={setSearchTerm}
                    />
                </div>
                <TableFilter
                    headers={tableHeaders}
                    onSort={handleSort}
                />
            </div>

            {isLoading ? (
                <p className="text-gray-500 text-sm mb-2 mt-4">{t("loading")}</p>
            ) : searchTerm && invoices.length === 1 && invoices[0].id === "no-results" ? (
                <EmptyState message={t("empty")} searchTerm={searchTerm} />
            ) : (
                <CustomTable
                    title={t("tableTitle")}
                    headers={tableHeaders}
                    options={true}
                    data={invoices.filter(inv => inv.id !== "no-results")}
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
