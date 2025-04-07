import { CreatedInvoice, Venta } from "@/types/Api";
import { envVariables } from "@/utils/config";

const fetchWithCredentials = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  return response.json() as Promise<T>;
};

export const getListSaleInvoices = async (): Promise<CreatedInvoice[]> => {
  let url = `${envVariables.API_URL}/sale-invoices`;

  return fetchWithCredentials<CreatedInvoice[]>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteSaleInvoice = async (id: string): Promise<void> => {
  const url = `${envVariables.API_URL}/sale-invoices/${id}`;

  await fetchWithCredentials<void>(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para obtener facturas sin autenticación (para SSG)
export const getPublicSaleInvoices = async () => {
  const url = `${envVariables.API_URL}/sale-invoices/public/list`;
  console.log('Fetching public sale invoices from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Sin credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al obtener productos públicos');
  }

  return response.json();
};

export const crearFacturaVenta = async (venta: Venta): Promise<CreatedInvoice> => {
  const urlFactura = `${envVariables.API_URL}/sale-invoices`;
  console.log('Creando factura en:', urlFactura);

  // Obtener precios de productos
  const productResponses = await Promise.all(
    venta.products.map(p =>
      fetchWithCredentials<{ salePrice: number }>(
        `${envVariables.API_URL}/products/${p.productId}`,
        { method: 'GET' }
      )
    )
  );

  // Calcular precio total
  const totalPrice = productResponses.reduce((acc, prod, i) => {
    return acc + prod.salePrice * venta.products[i].quantity;
  }, 0);

  const facturaPayload = {
    clientId: venta.clientId,
    totalPrice,
    electronicBill: venta.electronicBill ?? false,
    payment: venta.payment ?? null
  };
  
  const factura = await fetchWithCredentials<CreatedInvoice>(urlFactura, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(facturaPayload)
  });

  const urlProductosFactura = `${envVariables.API_URL}/sale-product-invoices`;
  // Asociar productos a la factura
  await Promise.all(
    venta.products.map(p =>
      fetchWithCredentials<void>(urlProductosFactura, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: p.tenantId,
          productId: p.productId,
          invoiceId: factura.id,
          quantity: p.quantity
        })
      })
    )
  );

  const urlPayment = `${envVariables.API_URL}/payments`;
  // Registrar pago si aplica
  if (venta.payment) {
    await fetchWithCredentials<void>(urlPayment, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...venta.payment,
        invoiceId: factura.id
      })
    });
  }

  const pdfUrl = `${envVariables.API_URL}/sale-invoices/${factura.id}/pdf`;
  const pdfResponse = await fetch(pdfUrl, {
    method: 'GET',
    credentials: 'include',
  });

  if (!pdfResponse.ok) {
    throw new Error('No se pudo generar el PDF de la factura');
  }

  const blob = await pdfResponse.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `factura-${factura.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  return factura;
};