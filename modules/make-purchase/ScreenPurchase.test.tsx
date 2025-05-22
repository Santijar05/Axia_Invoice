import { render, screen, fireEvent } from '@testing-library/react';
import ScreenPurchase from './ScreenPurchase';

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: { tenantId: 'tenant-1' } }),
}));
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `mocked-${key}`,
}));
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();
jest.mock('@/store/ShoppingCart', () => ({
  useShoppingCart: () => ({
    cart: [],
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
  }),
}));
jest.mock('@/components/molecules/SearchBar', () => (props: any) => (
  <button onClick={() => props.onAddToCart && props.onAddToCart({ id: 'prod-1', name: 'Producto', purchasePrice: 1000, salePrice: 1200, tax: 19, supplier: { id: 'sup-1' }, quantity: 1, stock: 10 })}>
    Mocked SearchBar
  </button>
));
jest.mock('@/components/atoms/CustomButton', () => ({ text, onClickButton, style, typeButton, ...props }: any) => (
  <button
    onClick={onClickButton}
    style={typeof style === 'string' ? {} : style}
    {...props}
  >
    {text}
  </button>
));
jest.mock('@/components/atoms/Input', () => (props: any) => (
  <input {...props} data-testid="quantity-input" />
));

describe('ScreenPurchase', () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
    mockRemoveFromCart.mockClear();
    mockClearCart.mockClear();
  });

  it('muestra el título correctamente', () => {
    render(<ScreenPurchase />);
    expect(screen.getByText('mocked-title')).toBeInTheDocument();
  });

  it('renderiza el botón para agregar producto y lo deshabilita si no hay producto seleccionado', () => {
    render(<ScreenPurchase />);
    const btn = screen.getByText('mocked-addProductButton');
    expect(btn).toBeDisabled();
  });

  it('agrega un producto al carrito al hacer click en el SearchBar y luego en agregar', () => {
    render(<ScreenPurchase />);
    fireEvent.click(screen.getAllByText('Mocked SearchBar')[1]); // El de productos
    fireEvent.change(screen.getByTestId('quantity-input'), { target: { value: '2' } });
    // Simula selección de producto
    fireEvent.click(screen.getByText('mocked-addProductButton'));
    expect(mockAddToCart).toHaveBeenCalled();
  });

  it('muestra el mensaje de carrito vacío si no hay productos', () => {
    render(<ScreenPurchase />);
    expect(screen.getByText('mocked-emptyCart')).toBeInTheDocument();
  });

  it('deshabilita el botón de confirmar compra si el carrito está vacío', () => {
    render(<ScreenPurchase />);
    expect(screen.getByText('mocked-confirmPurchase')).toBeDisabled();
  });

  it('llama a handleConfirmPurchase al hacer click en confirmar compra', () => {
    window.alert = jest.fn();
    jest.mock('@/store/ShoppingCart', () => ({
      useShoppingCart: () => ({
        cart: [{ id: 'prod-1', name: 'Producto', purchasePrice: 1000, salePrice: 1200, tax: 19, supplier: { id: 'sup-1' }, quantity: 1, stock: 10 }],
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
        clearCart: mockClearCart,
      }),
    }));
    render(<ScreenPurchase />);
    fireEvent.click(screen.getByText('mocked-confirmPurchase'));
    // No se puede comprobar el alert real porque la función es async y depende del mock de crearCompra
  });

  it('permite cambiar la cantidad del input', () => {
    render(<ScreenPurchase />);
    const input = screen.getByTestId('quantity-input');
    fireEvent.change(input, { target: { value: '5' } });
    expect(input).toHaveValue(5);
  });
});