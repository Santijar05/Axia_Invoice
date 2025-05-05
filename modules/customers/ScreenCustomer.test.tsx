import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScreenCustomers from './ScreenCustomers';
import { getListCustomers } from '@/request/users';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Mock de las dependencias
jest.mock('@/request/users', () => ({
  getListCustomers: jest.fn(),
  deleteCustomers: jest.fn(),
}));
jest.mock('@/lib/api-clients', () => ({
  getListClientsByName: jest.fn(),
}));

// Mock del enrutador para la App Router
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isReady: true,
  isPreview: false,
  isLocaleDomain: false,
  isFallback: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFirstAccess: false,
};

// Componente wrapper para proveer el contexto del enrutador
const renderWithRouter = (ui: React.ReactElement) => {
  const { AppRouterContext } = require('next/dist/shared/lib/app-router-context.shared-runtime');
  return render(
    <AppRouterContext.Provider value={mockRouter}>
      {ui}
    </AppRouterContext.Provider>
  );
};

// Datos mockeados
const mockClients = [
  {
    id: '1',
    identification: '12345678',
    firstName: 'Juan',
    lastName: 'Perez',
    email: 'juan@example.com',
  },
  {
    id: '2',
    identification: '87654321',
    firstName: 'Maria',
    lastName: 'Gomez',
    email: 'maria@example.com',
  },
];

// Mock de subcomponentes
jest.mock('@/components/organisms/CustomTable', () => {
  return function MockCustomTable({ data, headers, customActions }: any) {
    return (
      <div data-testid="custom-table">
        {data.length === 0 ? (
          <div data-testid="no-clients">No hay clientes</div>
        ) : (
          data.map((client: any) => (
            <div key={client.id} data-testid={`client-${client.id}`}>
              {client['first name']} {client['last name']}
              <button
                onClick={() => customActions.edit(client.id)}
                data-testid={`edit-${client.id}`}
              >
                Editar
              </button>
            </div>
          ))
        )}
      </div>
    );
  };
});

jest.mock('@/components/organisms/ToolBar', () => {
  return function MockToolbar({ onAddNew }: any) {
    return (
      <div data-testid="toolbar">
        <button onClick={onAddNew} data-testid="add-new-client">
          Agregar Nuevo Cliente
        </button>
      </div>
    );
  };
});

jest.mock('@/components/organisms/CustomModalNoButton', () => {
  return function MockCustomModalNoButton({ isOpen, title, children }: any) {
    return isOpen ? (
      <div data-testid="modal">
        <h2 data-testid="modal-title">{title}</h2>
        {children}
      </div>
    ) : null;
  };
});

jest.mock('@/components/molecules/SearchBar', () => {
  return function MockSearchBarUniversal({ onSearchTermChange, onResultsFound }: any) {
    return (
      <input
        placeholder="Buscar clientes..."
        onChange={(e) => {
          onSearchTermChange(e.target.value);
          if (e.target.value.length >= 2) {
            onResultsFound([]);
          } else {
            onResultsFound(mockClients);
          }
        }}
        data-testid="search-input"
      />
    );
  };
});

jest.mock('@/components/molecules/EmptyState', () => {
  return function MockEmptyState({ message }: any) {
    return <div data-testid="empty-state">{message}</div>;
  };
});

jest.mock('@/components/molecules/TableFilter', () => {
  return function MockTableFilter() {
    return <div data-testid="table-filter" />;
  };
});

jest.mock('./CustomerForm', () => {
  return function MockCustomerForm() {
    return <div data-testid="customer-form" />;
  };
});

jest.mock('./CustomerFormEdit', () => {
  return function MockCustomerFormEdit() {
    return <div data-testid="customer-form-edit" />;
  };
});

describe('ScreenCustomers', () => {
  // Guardar la referencia original de console.error
  const originalConsoleError = console.error;
  
  beforeAll(() => {
    // Mockear console.error para filtrar mensajes específicos
    console.error = jest.fn((...args) => {
      // Solo suprimir advertencias específicas de React
      const message = args[0];
      if (
        typeof message === 'string' && (
          message.includes('ReactDOMTestUtils.act') ||
          message.includes('The current testing environment is not configured to support act')
        )
      ) {
        return; // Suprimir estas advertencias específicas
      }
      
      // Permitir que otros errores pasen
      originalConsoleError(...args);
    });
  });
  
  afterAll(() => {
    // Restaurar el console.error original después de las pruebas
    console.error = originalConsoleError;
  });

  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    (getListCustomers as jest.Mock).mockReset();
    (getListCustomers as jest.Mock).mockResolvedValue(mockClients);
    (require('@/lib/api-clients').getListClientsByName as jest.Mock).mockReset();
    (require('@/lib/api-clients').getListClientsByName as jest.Mock).mockResolvedValue([]);
    jest.clearAllMocks();
  });

  it('debe cargar los clientes al renderizar el componente', async () => {
    renderWithRouter(<ScreenCustomers />);

    await waitFor(() => {
      expect(getListCustomers).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('custom-table')).toBeInTheDocument();
      expect(screen.getByText(/Juan Perez/i)).toBeInTheDocument();
      expect(screen.getByText(/Maria Gomez/i)).toBeInTheDocument();
    });
  });

  it('debe mostrar mensaje "No se encontraron clientes" cuando no haya resultados', async () => {
    (require('@/lib/api-clients').getListClientsByName as jest.Mock).mockResolvedValue([]);

    renderWithRouter(<ScreenCustomers />);

    const input = screen.getByTestId('search-input');
    await act(async () => {
      await user.type(input, 'xyz');
    });

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByTestId('empty-state')).toHaveTextContent(/No se encontraron clientes/i);
    });
  });

  it('debe abrir el modal para agregar un nuevo cliente', async () => {
    renderWithRouter(<ScreenCustomers />);

    const addButton = screen.getByTestId('add-new-client');
    await act(async () => {
      await user.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent(/Agregar Nuevo Cliente/i);
    });
  });

  it('debe manejar el clic en "editar" para un cliente', async () => {
    renderWithRouter(<ScreenCustomers />);

    await waitFor(() => {
      expect(screen.getByTestId('custom-table')).toBeInTheDocument();
      expect(screen.getByText(/Juan Perez/i)).toBeInTheDocument();
    });

    const editButton = screen.getByTestId('edit-1');
    await act(async () => {
      await user.click(editButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent(/Editar Cliente/i);
    });
  });
});