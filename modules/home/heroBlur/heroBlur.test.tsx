import { render, screen, act } from '@testing-library/react';
import HeroBlur from './heroBlur';
import '@testing-library/jest-dom';
import React from 'react';

let observerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;

class MockIntersectionObserver {
  constructor(callback: (entries: IntersectionObserverEntry[]) => void, _options?: IntersectionObserverInit) {
    observerCallback = callback;
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

const mockMatchMedia = (matches: boolean): MediaQueryList => ({
  matches,
  media: '',
  onchange: null,
  addListener: jest.fn(), 
  removeListener: jest.fn(), 
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) =>
    mockMatchMedia(query === '(max-width: 640px)')
  ),
});

jest.mock('./cardHeroBlur', () => ({
  __esModule: true,
  default: ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div data-testid="card-hero-blur">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

describe('HeroBlur Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window.matchMedia as jest.Mock).mockClear();
  });

  it('renderiza el título y la descripción correctamente', () => {
    render(<HeroBlur />);
    expect(screen.getByText(/mocked-heroBlur.headline/i)).toBeInTheDocument();
    expect(screen.getByText(/mocked-heroBlur.subheadline/i)).toBeInTheDocument();
  });

  it('renderiza las cuatro tarjetas de características', () => {
    render(<HeroBlur />);
    const cards = screen.getAllByTestId('card-hero-blur');
    expect(cards).toHaveLength(4);
  });

  it('aplica clases de transición cuando isVisible es verdadero', () => {
    render(<HeroBlur />);
    act(() => {
      observerCallback?.([{ isIntersecting: true }] as IntersectionObserverEntry[]);
    });
    const title = screen.getByText(/mocked-heroBlur.headline/i);
    expect(title).toHaveClass('opacity-100', 'translate-y-0');
  });

  it('configura isMobile correctamente en dispositivos móviles', () => {
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => mockMatchMedia(true));
    render(<HeroBlur />);
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 640px)');
  });

  it('configura isMobile correctamente en escritorio', () => {
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => mockMatchMedia(false));
    render(<HeroBlur />);
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 640px)');
  });

  it('responde a cambios en matchMedia', () => {
    const mockListener = jest.fn();
    const mql = mockMatchMedia(false);
    mql.addEventListener = mockListener;
  
    (window.matchMedia as jest.Mock).mockImplementationOnce(() => mql);
    render(<HeroBlur />);
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  it('aplica clases Tailwind correctamente', () => {
    const { container } = render(<HeroBlur />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-black', 'py-20', 'flex-col');
  });
});
