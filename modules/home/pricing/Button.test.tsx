import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza el texto', () => {
    const { getByText } = render(<Button text="Comprar" />);
    expect(getByText('Comprar')).toBeInTheDocument();
  });

  it('llama a onClick', () => {
    const fn = jest.fn();
    const { getByText } = render(<Button text="Comprar" onClick={fn} />);
    fireEvent.click(getByText('Comprar'));
    expect(fn).toHaveBeenCalled();
  });
});