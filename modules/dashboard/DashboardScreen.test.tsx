import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardScreen from './DashBoardScreen';
import { useDashboardData } from './hooks/useDashboardData';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

jest.mock('./hooks/useDashboardData', () => ({
  useDashboardData: jest.fn(),
}));

// Mock de los widgets
jest.mock('./widgets/SalesWidget', () => ({
  __esModule: true,
  default: () => <div data-testid="sales-widget">Sales Widget</div>,
}));

jest.mock('./widgets/ProductsWidget', () => ({
  __esModule: true,
  default: () => <div data-testid="products-widget">Products Widget</div>,
}));

jest.mock('./widgets/InventoryWidget', () => ({
  __esModule: true,
  default: () => <div data-testid="inventory-widget">Inventory Widget</div>,
}));

jest.mock('./widgets/CustomersWidget', () => ({
  __esModule: true,
  default: () => <div data-testid="customers-widget">Customers Widget</div>,
}));

jest.mock('./widgets/ProfitabilityWidget', () => ({
  __esModule: true,
  default: () => <div data-testid="profitability-widget">Profitability Widget</div>,
}));

jest.mock('./DashBoardLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="dashboard-layout">{children}</div>,
}));

describe('DashboardScreen', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    (useDashboardData as jest.Mock).mockReturnValue({
      data: {},
      isError: false,
      isLoading: false,
    });
    jest.clearAllMocks();
  });

  it('debe renderizar el título correctamente', async () => {
    render(<DashboardScreen />);
    expect(screen.getByText('mocked-title')).toBeInTheDocument();
    expect(screen.getByText('mocked-title')).toHaveClass('text-3xl font-bold text-homePrimary');
  });

  it('debe mostrar mensaje de error y botón de reintentar cuando hay error', async () => {
    (useDashboardData as jest.Mock).mockReturnValue({
      data: null,
      isError: true,
    });

    render(<DashboardScreen />);
    expect(screen.getByText('mocked-errorLoading')).toBeInTheDocument();
    expect(screen.getByText('mocked-errorLoading')).toHaveClass('text-red-500 text-xl');
    expect(screen.getByRole('button', { name: 'mocked-retry' })).toBeInTheDocument();
  });

  it('debe recargar la página al hacer clic en el botón de reintentar', async () => {
    (useDashboardData as jest.Mock).mockReturnValue({
      data: null,
      isError: true,
    });

    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(<DashboardScreen />);
    const retryButton = screen.getByRole('button', { name: 'mocked-retry' });
    await user.click(retryButton);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  it('debe renderizar la imagen de fondo correctamente', async () => {
    render(<DashboardScreen />);
    const backgroundImage = screen.getByAltText('Background');
    expect(backgroundImage).toHaveAttribute('src', '/Images/fondoHerooo.png');
    expect(backgroundImage).toHaveClass('absolute inset-0 object-cover opacity-10');
  });
});