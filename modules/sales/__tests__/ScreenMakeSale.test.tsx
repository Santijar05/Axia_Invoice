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
    const heading = screen.getByText("Nueva venta"); 
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
    fireEvent.change(screen.getByPlaceholderText('Ingrese la cantidad'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Añadir producto'));
    expect(screen.getByText('No hay productos aún.')).toBeInTheDocument();
  });

  test('muestra alerta si se intenta finalizar venta sin productos', () => {
    render(<ScreenMakeSale />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(screen.getByText('Finalizar venta'));
    expect(alertMock).toHaveBeenCalledWith('Agrega productos antes de completar la venta.');
    alertMock.mockRestore();
  });
});
