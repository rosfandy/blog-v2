import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputTag from '@/components/ui/InputTag';

describe('InputTag', () => {
  it('should render the component with placeholder', () => {
    const mockOnChange = jest.fn();
    render(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        placeholder="Add custom tags..."
      />
    );

    const input = screen.getByPlaceholderText('Add custom tags...');
    expect(input).toBeInTheDocument();
  });

  it('should display existing tags', () => {
    const mockOnChange = jest.fn();
    const tags = ['react', 'typescript', 'nextjs'];

    render(<InputTag value={tags} onChange={mockOnChange} />);

    tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('should add a new tag on Enter key press', async () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');

    // Type a new tag
    await userEvent.type(input, 'newtag');

    // Press Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(['newtag']);
  });

  it('should prevent adding duplicate tags', async () => {
    const mockOnChange = jest.fn();
    const existingTags = ['react', 'typescript'];

    render(<InputTag value={existingTags} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');

    // Try to add existing tag
    await userEvent.type(input, 'react');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // onChange should not be called with duplicate
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should trim whitespace from tags', async () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');

    // Type tag with whitespace
    await userEvent.type(input, '  newtag  ');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(['newtag']);
  });

  it('should not add empty tags', async () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');

    // Try to add empty/whitespace-only tag
    await userEvent.type(input, '   ');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should remove a tag when close button is clicked', async () => {
    const mockOnChange = jest.fn();
    const tags = ['react', 'typescript'];

    render(<InputTag value={tags} onChange={mockOnChange} />);

    // Get the close button for the first tag
    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith(['typescript']);
  });

  it('should remove correct tag when multiple tags exist', async () => {
    const mockOnChange = jest.fn();
    const tags = ['react', 'typescript', 'nextjs'];

    render(<InputTag value={tags} onChange={mockOnChange} />);

    const closeButtons = screen.getAllByRole('button');
    // Click the close button for 'typescript' (second tag)
    fireEvent.click(closeButtons[1]);

    expect(mockOnChange).toHaveBeenCalledWith(['react', 'nextjs']);
  });

  it('should accept custom className', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <InputTag
        value={[]}
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should handle default placeholder', () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');
    expect(input).toBeInTheDocument();
  });

  it('should handle input value changes', async () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...') as HTMLInputElement;

    // Type text
    await userEvent.type(input, 'test');

    // Input value should update (internal state)
    expect(input.value).toBe('test');
  });

  it('should handle multiple tags with same prefix', async () => {
    const mockOnChange = jest.fn();
    const tags = ['react', 'react-dom', 'react-router'];

    render(<InputTag value={tags} onChange={mockOnChange} />);

    tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('should maintain tag order', () => {
    const mockOnChange = jest.fn();
    const tags = ['third', 'first', 'second'];

    const { container } = render(
      <InputTag value={tags} onChange={mockOnChange} />
    );

    const tagElements = container.querySelectorAll(
      'span.inline-flex.items-center'
    );
    expect(tagElements[0]).toHaveTextContent('third');
    expect(tagElements[1]).toHaveTextContent('first');
    expect(tagElements[2]).toHaveTextContent('second');
  });

  it('should handle special characters in tags', async () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');

    // Add tag with special characters
    await userEvent.type(input, 'c++');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(['c++']);
  });

  it('should not call onChange when adding empty input on Enter', async () => {
    const mockOnChange = jest.fn();
    render(<InputTag value={[]} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Add tags...');

    // Just press Enter without typing
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
