import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from './ToolBar';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `mocked-${key}`,
}));

describe('Toolbar', () => {
  it('renderiza el título', () => {
    render(<Toolbar title="Clientes" />);
    expect(screen.getByText('Clientes')).toBeInTheDocument();
  });

  it('llama a onAddNew si se hace click', () => {
    const fn = jest.fn();
    render(<Toolbar title="Clientes" onAddNew={fn} />);
    fireEvent.click(screen.getByRole('button', { name: /mocked-add/i }));
    expect(fn).toHaveBeenCalled();
  });
});