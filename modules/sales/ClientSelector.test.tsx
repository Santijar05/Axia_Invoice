import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClientSelector from './ClientSelector';
import { getListClients, getListClientsByName } from '@/lib/api-clients';
import '@testing-library/jest-dom';
import { ClientDAO } from '@/types/Api';

jest.mock('@/lib/api-clients');

const mockClients: ClientDAO[] = [
  { id: '1', firstName: 'Juan', lastName: 'Perez', identification: '12345678', tenantId: 'tenant1' },
  { id: '2', firstName: 'Maria', lastName: 'Gomez', identification: '87654321', tenantId: 'tenant2' },
];

describe('ClientSelector', () => {
  const mockOnSelect = jest.fn();
  let user: ReturnType<typeof userEvent.setup>;
  
  beforeEach(() => {
    user = userEvent.setup();
    (getListClients as jest.Mock).mockResolvedValue(mockClients);
    (getListClientsByName as jest.Mock).mockImplementation((name: string) => {
      if (name === 'jua') {
        return Promise.resolve([mockClients[0]]);
      }
      return Promise.resolve([]);
    });
    jest.clearAllMocks();
  });

  it('debe cargar clientes iniciales al iniciar', async () => {
    render(<ClientSelector onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(getListClients).toHaveBeenCalledTimes(1);
    });
  });

  it('debe buscar clientes al escribir más de 2 caracteres', async () => {
    render(<ClientSelector onSelect={mockOnSelect} />);
    
    const input = screen.getByPlaceholderText('Buscar cliente por nombre');
    await user.type(input, 'jua');
    
    await waitFor(() => {
      expect(getListClientsByName).toHaveBeenCalledWith('jua');
    });
    
    expect(await screen.findByText(/Juan Perez.*12345678/)).toBeInTheDocument();
  });

  it('debe seleccionar un cliente y llamar a onSelect', async () => {
    render(<ClientSelector onSelect={mockOnSelect} />);
    
    const input = screen.getByPlaceholderText('Buscar cliente por nombre');
    await user.type(input, 'jua');
    
    const clientItem = await screen.findByText(/Juan Perez.*12345678/);
    await user.click(clientItem);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockClients[0]);
    expect(input).toHaveValue('Juan Perez');
  });

  it('debe mostrar mensaje cuando no hay resultados', async () => {
    render(<ClientSelector onSelect={mockOnSelect} />);
    
    const input = screen.getByPlaceholderText('Buscar cliente por nombre');
    await user.type(input, 'xyz');
    
    expect(await screen.findByText('No se encontraron clientes')).toBeInTheDocument();
  });
});