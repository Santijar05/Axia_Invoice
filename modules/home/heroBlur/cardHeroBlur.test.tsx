import { render, screen } from '@testing-library/react';
import CardHeroBlur from './cardHeroBlur';

describe('CardHeroBlur', () => {
  it('renderiza el icono, título y descripción', () => {
    render(<CardHeroBlur icon={<span data-testid="icon" />} title="Título" description="Desc" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('aplica clase text-homePrimary al icono', () => {
    render(<CardHeroBlur icon={<span data-testid="icon" />} title="T" description="D" />);
    const iconWrapper = screen.getByTestId('icon').parentElement;
    expect(iconWrapper).toHaveClass('text-homePrimary');
  });

  it('aplica clase text-white y text-xl al título', () => {
    render(<CardHeroBlur icon={<span />} title="Mi Título" description="D" />);
    const title = screen.getByText('Mi Título');
    expect(title).toHaveClass('text-white');
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-left');
  });

  it('aplica clase text-gray-400 al description', () => {
    render(<CardHeroBlur icon={<span />} title="T" description="Mi descripción" />);
    const desc = screen.getByText('Mi descripción');
    expect(desc).toHaveClass('text-gray-400');
    expect(desc).toHaveClass('text-left');
  });

  it('renderiza correctamente si el icono es un componente', () => {
    const CustomIcon = () => <svg data-testid="svg-icon" />;
    render(<CardHeroBlur icon={<CustomIcon />} title="T" description="D" />);
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  it('no rompe si el icono es null', () => {
    render(<CardHeroBlur icon={null} title="T" description="D" />);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('renderiza múltiples instancias sin colisión', () => {
    render(
      <>
        <CardHeroBlur icon={<span data-testid="icon1" />} title="T1" description="D1" />
        <CardHeroBlur icon={<span data-testid="icon2" />} title="T2" description="D2" />
      </>
    );
    expect(screen.getByTestId('icon1')).toBeInTheDocument();
    expect(screen.getByTestId('icon2')).toBeInTheDocument();
    expect(screen.getByText('T1')).toBeInTheDocument();
    expect(screen.getByText('T2')).toBeInTheDocument();
  });

  it('estructura DOM: el título y descripción están dentro de un div con space-y-3', () => {
    render(<CardHeroBlur icon={<span />} title="T" description="D" />);
    const title = screen.getByText('T');
    const desc = screen.getByText('D');
    expect(title.parentElement).toHaveClass('space-y-3');
    expect(desc.parentElement).toHaveClass('space-y-3');
  });

  it('estructura DOM: el título es h3 y la descripción es p', () => {
    render(<CardHeroBlur icon={<span />} title="T" description="D" />);
    const title = screen.getByText('T');
    const desc = screen.getByText('D');
    expect(title.tagName).toBe('H3');
    expect(desc.tagName).toBe('P');
  });

  it('permite pasar elementos icono', () => {
    const ComplexIcon = () => (
      <span>
        <svg data-testid="svg-icon" />
        <span data-testid="extra">Extra</span>
      </span>
    );
    render(<CardHeroBlur icon={<ComplexIcon />} title="T" description="D" />);
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });
});