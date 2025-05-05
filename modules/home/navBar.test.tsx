import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './navBar';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width: number; height: number }) => (
    <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
  ),
}));

jest.mock('@/components/atoms/CustomButton', () => ({
  __esModule: true,
  default: ({ text, onClickButton }: { text: string; onClickButton: () => void }) => (
    <button onClick={onClickButton}>{text}</button>
  ),
}));

describe('Navbar Component', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renderiza el logo y enlaces correctamente', () => {
    render(<Navbar />);
    
    expect(screen.getByAltText('Axia logo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Inicio/i })).toHaveAttribute('href', '/');
    expect(screen.getByText('Sobre Nosotros')).toHaveAttribute('href', '/aboutus');
  });

  it('el botón "Plataforma" ejecuta navigation.push', () => {
    render(<Navbar />);
    const button = screen.getByText('Plataforma');
    
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('aplica clases Tailwind correctamente', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    
    expect(nav).toHaveClass('bg-black');
    expect(nav).toHaveClass('dark:bg-gray-900');
    expect(nav).toHaveClass('fixed');
  });

  it('oculta el menú en móvil', () => {
    render(<Navbar />);
    const mobileMenu = screen.getByRole('list'); 
    
    expect(mobileMenu.parentElement).toHaveClass('hidden');
    expect(mobileMenu.parentElement).toHaveClass('md:flex');
  });
});