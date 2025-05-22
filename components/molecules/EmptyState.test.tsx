import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

jest.mock('next-intl', () => ({
  useTranslations: () => () => 'mocked-noResults',
}));

describe('EmptyState', () => {
  it('muestra el mensaje', () => {
    render(<EmptyState message="Sin datos" />);
    expect(screen.getByText('Sin datos')).toBeInTheDocument();
  });

  it('muestra el searchTerm si se pasa', () => {
    render(<EmptyState message="Nada" searchTerm="Juan" />);
    expect(screen.getByText(/Juan/)).toBeInTheDocument();
    expect(screen.getByText(/mocked-noResults/)).toBeInTheDocument();
  });

  it('muestra un icono custom si se pasa', () => {
    render(<EmptyState message="Nada" icon={<span data-testid="custom-icon">X</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});