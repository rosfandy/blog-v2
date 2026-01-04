import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('should render input with default type text', () => {
    const mockOnChange = jest.fn();
    render(<Input value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
  });

  it('should render input with custom type', () => {
    const mockOnChange = jest.fn();
    render(<Input type="email" value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('should render input with placeholder', () => {
    const mockOnChange = jest.fn();
    render(
      <Input
        value=""
        onChange={mockOnChange}
        placeholder="Enter your name"
      />
    );

    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('should display current value', () => {
    const mockOnChange = jest.fn();
    render(<Input value="test value" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('should call onChange when input value changes', async () => {
    const mockOnChange = jest.fn();
    render(<Input value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');

    // Should have been called multiple times for each character
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls.length).toBeGreaterThanOrEqual(5);
  });

  it('should handle different input types', () => {
    const mockOnChange = jest.fn();
    const types = ['text', 'email', 'password', 'number', 'date'];

    types.forEach((type) => {
      const { unmount, container } = render(
        <Input type={type} value="" onChange={mockOnChange} />
      );

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe(type);
      unmount();
    });
  });

  it('should accept custom className', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <Input
        value=""
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('should pass through additional props', () => {
    const mockOnChange = jest.fn();
    render(
      <Input
        value=""
        onChange={mockOnChange}
        disabled
        data-testid="custom-input"
      />
    );

    const input = screen.getByTestId('custom-input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should handle empty value', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(<Input value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');

    rerender(<Input value="filled" onChange={mockOnChange} />);
    expect(input.value).toBe('filled');
  });

  it('should support password input type', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<Input type="password" value="" onChange={mockOnChange} />);

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('should support number input type', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<Input type="number" value="42" onChange={mockOnChange} />);

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('42');
  });

  it('should support email input type', () => {
    const mockOnChange = jest.fn();
    render(
      <Input
        type="email"
        value="test@example.com"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');
    expect(input.value).toBe('test@example.com');
  });

  it('should trigger onChange on clear', async () => {
    const mockOnChange = jest.fn();
    render(<Input value="test" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    // Clear the input
    await userEvent.clear(input);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('should not be required by default', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <Input value="" onChange={mockOnChange} />
    );

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(false);
  });

  it('should be required when specified', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <Input value="" onChange={mockOnChange} required />
    );

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('should call onChange for each keystroke', async () => {
    const mockOnChange = jest.fn();
    render(<Input value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'ab');

    // Should be called twice (once for 'a', once for 'b')
    expect(mockOnChange.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle numeric input correctly', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <Input type="number" value="123" onChange={mockOnChange} />
    );

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('123');
  });
});
