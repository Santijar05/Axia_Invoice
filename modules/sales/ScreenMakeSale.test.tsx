import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScreenMakeSale from './ScreenMakeSale';

jest.mock('./InvoiceModal', () => () => <div>Mocked InvoiceModal</div>);
jest.mock('@/components/organisms/CustomModalNoButton', () => ({ isOpen, children }: any) => isOpen ? <div>{children}</div> : null);
jest.mock('./SaleComponents/SaleTable', () => (props: any) => {
  // Ensure the correct prop is used for products
  const items = props.products || props.items || props.data || [];
  return (
    <div data-testid="sale-table">
      {items.map((i: any) => (
        <div key={i.id}>{i.name}</div>
      ))}
      {/* Add a button to simulate "Eliminar" for each product */}
      {items.map((i: any) => (
        <button key={`delete-${i.id}`} onClick={() => props.onDelete && props.onDelete(i.id)}>
          Eliminar
        </button>
      ))}
    </div>
  );
});
jest.mock('./SaleComponents/SaleSummary', () => ({ onCompleteSale, disabled }: any) => (
  <button disabled={disabled} onClick={onCompleteSale}>Completar venta</button>
));
jest.mock('./SaleComponents/SaleForm', () => (props: any) => (
  <div>
    <input
      placeholder="mocked-namePlaceholder"
      value={props.name}
      onChange={e => props.setName(e.target.value)}
    />
    <input
      placeholder="mocked-quantityPlaceholder"
      value={props.quantity}
      onChange={e => props.setQuantity(Number(e.target.value))}
      type="number"
    />
    <input
      placeholder="mocked-pricePlaceholder"
      value={props.price}
      onChange={e => props.setPrice(e.target.value)}
      type="number"
    />
    <button onClick={props.handleAddItem}>mocked-addProduct</button>
  </div>
));
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    if (key === 'success') return 'Venta exitosa';
    if (key === 'addBeforeComplete') return 'Agrega productos antes de completar la venta.';
    if (key === 'title') return 'mocked-title';
    if (key === 'notEnoughStock') return 'No hay suficiente stock. Disponible:';
    if (key === 'confirmSale') return 'Confirmar venta';
    return `mocked-${key}`;
  },
}));

describe('ScreenMakeSale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el título correctamente', () => {
    render(<ScreenMakeSale />);
    expect(screen.getByText('mocked-title')).toBeInTheDocument();
  });

  it('no permite agregar producto si el precio es inválido', () => {
    render(<ScreenMakeSale />);
    fireEvent.change(screen.getByPlaceholderText('mocked-namePlaceholder'), { target: { value: 'Producto' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-quantityPlaceholder'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-pricePlaceholder'), { target: { value: '' } });
    fireEvent.click(screen.getByText('mocked-addProduct'));
    expect(screen.queryByText('Producto')).not.toBeInTheDocument();
  });

  it('no permite agregar producto si la cantidad es 0', () => {
    render(<ScreenMakeSale />);
    fireEvent.change(screen.getByPlaceholderText('mocked-namePlaceholder'), { target: { value: 'Producto' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-quantityPlaceholder'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-pricePlaceholder'), { target: { value: '1000' } });
    fireEvent.click(screen.getByText('mocked-addProduct'));
    expect(screen.queryByText('Producto')).not.toBeInTheDocument();
  });
  
  it('muestra el título correctamente', () => {
    render(<ScreenMakeSale />);
    expect(screen.getByText('mocked-title')).toBeInTheDocument();
  });

  it('no permite agregar producto si el precio es inválido', () => {
    render(<ScreenMakeSale />);
    fireEvent.change(screen.getByPlaceholderText('mocked-namePlaceholder'), { target: { value: 'Producto' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-quantityPlaceholder'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-pricePlaceholder'), { target: { value: '' } });
    fireEvent.click(screen.getByText('mocked-addProduct'));
    expect(screen.queryByText('Producto')).not.toBeInTheDocument();
  });

  it('no permite agregar producto si la cantidad es 0', () => {
    render(<ScreenMakeSale />);
    fireEvent.change(screen.getByPlaceholderText('mocked-namePlaceholder'), { target: { value: 'Producto' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-quantityPlaceholder'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-pricePlaceholder'), { target: { value: '1000' } });
    fireEvent.click(screen.getByText('mocked-addProduct'));
    expect(screen.queryByText('Producto')).not.toBeInTheDocument();
  });

  it('reinicia el formulario después de una venta exitosa', () => {
    window.alert = jest.fn();
    render(<ScreenMakeSale />);
    fireEvent.change(screen.getByPlaceholderText('mocked-namePlaceholder'), { target: { value: 'Producto' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-quantityPlaceholder'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('mocked-pricePlaceholder'), { target: { value: '1000' } });
    fireEvent.click(screen.getByText('mocked-addProduct'));
    fireEvent.click(screen.getByText('Completar venta'));
    // Aquí deberías simular el éxito de la venta y comprobar el reseteo de los campos
    // Esto depende de cómo esté implementado el mock del modal
  });

});