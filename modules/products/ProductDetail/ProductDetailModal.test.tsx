import { render, screen } from '@testing-library/react';
import ProductDetailModal from './ProductDetailModal';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `mocked-${key}`,
}));

// Mock SupplierDAO object
const supplier = {
  id: 'supplier-1',
  name: 'Proveedor',
  tenantId: 'tenant-1',
  nit: '123456789',
  phone: '555-1234',
  address: 'Calle Falsa 123',
};

const product = {
  id: '1',
  name: 'Producto',
  tenantId: 'tenant-1',
  supplier: supplier,
  salePrice: 100,
  purchasePrice: 80,
  tax: 19,
  stock: 10,
};

describe('ProductDetailModal', () => {
  it('no renderiza si isOpen es false', () => {
    render(<ProductDetailModal product={product} isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText('Producto')).not.toBeInTheDocument();
  });

  it('renderiza el modal si isOpen y product', () => {
    render(<ProductDetailModal product={product} isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText('Producto')).toBeInTheDocument();
  });
});