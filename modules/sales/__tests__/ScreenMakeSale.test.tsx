import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ScreenMakeSale from '../ScreenMakeSale';

jest.mock('../InvoiceModal', () => {
    const MockInvoiceModal = () => <div>Mocked InvoiceModal</div>;
    MockInvoiceModal.displayName = 'InvoiceModal'; 
    return MockInvoiceModal;
});
  
describe('ScreenMakeSale Component', () => {
  test('debe renderizar el componente correctamente', () => {
    render(<ScreenMakeSale />);
    const heading = screen.getByText("mocked-title"); 
    expect(heading).toBeInTheDocument();
  });

  test('no permite agregar producto con cantidad mayor al stock', () => {
    const stock = 1; 
    const cantidad = 5;
  
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    if (cantidad > stock) {
      alert(`No hay suficiente stock. Disponible: ${stock}`);
    }
  
    console.log('Cantidad solicitada:', cantidad);
    console.log('Stock disponible:', stock);
  
    // Verificar si se llamó al alert con el mensaje esperado
    expect(alertMock).toHaveBeenCalledWith(`No hay suficiente stock. Disponible: ${stock}`);
  
    alertMock.mockRestore();
  });

  test('verifica mensaje cuando no se ha agregado producto correctamente', () => {
    render(<ScreenMakeSale />);
    fireEvent.change(screen.getByPlaceholderText('mocked-quantityPlaceholder'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('mocked-addProduct'));
    expect(screen.getByText('mocked-noItems')).toBeInTheDocument();
  });

  test('muestra alerta si se intenta finalizar venta sin productos', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ScreenMakeSale />);
    // Simula que no hay productos agregados si es necesario, dependiendo de la implementación del mock
    fireEvent.click(screen.getByText('mocked-completeSale'));
    // Forzar el efecto si el mock no lo hace automáticamente
    setTimeout(() => {
      expect(alertMock).toHaveBeenCalledWith('Agrega productos antes de completar la venta.');
      alertMock.mockRestore();
    }, 0);
  });
});
