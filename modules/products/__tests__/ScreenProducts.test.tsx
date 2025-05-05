import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScreenProducts from '../ScreenProducts';
import { getListproducts } from '@/lib/api-products';
import CustomTable from '@/components/organisms/CustomTable';

// MOCK useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// MOCK getListproducts
jest.mock('@/lib/api-products', () => ({
  getListproducts: jest.fn(),
}));

describe('ScreenProducts Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Carga y muestra productos al montarse', async () => {
        const mockProducts = [
        {
            id: '1',
            name: 'Producto A',
            supplier: { name: 'Proveedor A' },
            tax: 10,
            stock: 50,
            purchasePrice: 20,
            salePrice: 30,
        },
        ];

        (getListproducts as jest.Mock).mockResolvedValue(mockProducts);

        render(<ScreenProducts onSuccess={jest.fn()} />);

        expect(await screen.findByText('Producto A')).toBeInTheDocument();
        expect(screen.getByText('Proveedor A')).toBeInTheDocument();
    });

    test('Filtra productos con barra de búsqueda', async () => {
        const initial = [
        {
            id: '1',
            name: 'Producto A',
            stock: 10,
            supplier: { name: 'X' },
            tax: 5,
            purchasePrice: 2,
            salePrice: 4,
        },
        ];

        (getListproducts as jest.Mock).mockResolvedValue(initial);

        render(<ScreenProducts onSuccess={() => {}} />);

        const input = screen.getByPlaceholderText('Buscar productos...');
        fireEvent.change(input, { target: { value: 'Producto B' } });

        expect(await screen.findByText('No se encontraron productos')).toBeInTheDocument();
    });

    test('abre modal de edición al hacer clic en "Editar"', async () => {
        const products = [
            { id: 1, name: 'Producto Test 1' },
            { id: 2, name: 'Producto Test 2' },
        ];

        const handleEditProduct = (id: string) => {
            // Lógica para editar el producto
            console.log('Editar producto con id:', id);
          };
          

        const formattedProducts = products.map(product => ({
            name: product.name,
        }));

        render(
            <CustomTable
                title="Lista de Productos"
                headers={['Name']}
                options={true}
                data={formattedProducts}
                actionLabels={{
                    edit: 'Editar',
                    delete: 'Eliminar',
                    view: 'Ver Detalles',
                }}
                customActions={{
                    edit: handleEditProduct,
                }}
            />
        );

        const row = await screen.findByRole('cell', { name: /Producto Test 1/ });

        fireEvent.click(row);

        // Espera a que el dropdown se abra
        const editButton = await screen.findByText('Editar');
        
        // Verifica que el botón "Editar" sea clickeable
        fireEvent.click(editButton);

        // Verifica que el modal de edición se haya abierto
        const modal = screen.getByTestId('modal'); // Asegúrate de que el modal tenga un testID
        expect(modal).toBeVisible();
    });
});
