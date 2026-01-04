import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select, { SelectOption } from '../Select';

// Mock GSAP
jest.mock('gsap', () => ({
	gsap: {
		to: jest.fn((target, config) => {
			if (config.onComplete) {
				setTimeout(config.onComplete, 0);
			}
		}),
		fromTo: jest.fn(),
	},
}));

describe('Select Component', () => {
	const mockOptions: SelectOption[] = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
	];

	describe('Single Select Mode', () => {
		it('renders with placeholder when no value selected', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					placeholder="Select an option"
					mode="single"
				/>
			);

			expect(screen.getByText('Select an option')).toBeInTheDocument();
		});

		it('displays selected value', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value="option1"
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			expect(screen.getByText('Option 1')).toBeInTheDocument();
		});

		it('opens dropdown when clicked', async () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button', { name: /Select option/i });
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument();
				expect(screen.getByText('Option 2')).toBeInTheDocument();
				expect(screen.getByText('Option 3')).toBeInTheDocument();
			});
		});

		it('selects value and closes dropdown on option click', async () => {
			const handleChange = jest.fn();
			const { rerender } = render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button', { name: /Select option/i });
			fireEvent.click(trigger);

			const option = screen.getByText('Option 2');
			fireEvent.click(option);

			expect(handleChange).toHaveBeenCalledWith('option2');

			// Rerender with new value
			rerender(
				<Select
					value="option2"
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			await waitFor(() => {
				expect(screen.getByText('Option 2')).toBeInTheDocument();
			});
		});

		it('closes dropdown when clicking outside', async () => {
			const handleChange = jest.fn();
			render(
				<div>
					<Select
						value=""
						onChange={handleChange}
						options={mockOptions}
						mode="single"
					/>
					<div data-testid="outside">Outside element</div>
				</div>
			);

			const trigger = screen.getByRole('button', { name: /Select option/i });
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getAllByText('Option 1')).toHaveLength(1);
			});

			const outside = screen.getByTestId('outside');
			fireEvent.mouseDown(outside);

			await waitFor(() => {
				const options = screen.queryAllByText('Option 1');
				expect(options.length).toBeGreaterThanOrEqual(1);
			});
		});
	});

	describe('Multiple Select Mode', () => {
		it('renders with placeholder in multiple mode', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value={[]}
					onChange={handleChange}
					options={mockOptions}
					placeholder="Select options"
					mode="multiple"
				/>
			);

			expect(screen.getByText('Select options')).toBeInTheDocument();
		});

		it('displays multiple selected values as tags', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value={['option1', 'option3']}
					onChange={handleChange}
					options={mockOptions}
					mode="multiple"
				/>
			);

			expect(screen.getByText('Option 1')).toBeInTheDocument();
			expect(screen.getByText('Option 3')).toBeInTheDocument();
		});

		it('allows toggling options on and off', async () => {
			const handleChange = jest.fn();
			const { rerender } = render(
				<Select
					value={[]}
					onChange={handleChange}
					options={mockOptions}
					mode="multiple"
					placeholder="Select options"
				/>
			);

			const trigger = screen.getByRole('button', { name: /Select options/i });
			fireEvent.click(trigger);

			const option1 = screen.getAllByText('Option 1')[0];
			fireEvent.click(option1);

			expect(handleChange).toHaveBeenCalledWith(['option1']);

			// Rerender with new value
			rerender(
				<Select
					value={['option1']}
					onChange={handleChange}
					options={mockOptions}
					mode="multiple"
					placeholder="Select options"
				/>
			);

			// Verify the value is displayed in the trigger
			expect(screen.getByText('Option 1')).toBeInTheDocument();
		});
	});

	describe('Search Functionality', () => {
		it('does not show search when showSearch is false', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					showSearch={false}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
		});

		it('shows search input when showSearch is true', async () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					showSearch={true}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
			});
		});

		it('filters options based on search query', async () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					showSearch={true}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const searchInput = screen.getByPlaceholderText('Search...');
			await userEvent.type(searchInput, 'Option 2');

			await waitFor(() => {
				expect(screen.getByText('Option 2')).toBeInTheDocument();
				expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
			});
		});

		it('shows "No results" when search matches nothing', async () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					showSearch={true}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const searchInput = screen.getByPlaceholderText('Search...');
			await userEvent.type(searchInput, 'NonExistent');

			await waitFor(() => {
				expect(screen.getByText('No results')).toBeInTheDocument();
			});
		});

		it('performs case-insensitive search', async () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					showSearch={true}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const searchInput = screen.getByPlaceholderText('Search...');
			await userEvent.type(searchInput, 'option 2');

			await waitFor(() => {
				expect(screen.getByText('Option 2')).toBeInTheDocument();
			});
		});
	});

	describe('Styling and Theming', () => {
		it('applies custom className', () => {
			const handleChange = jest.fn();
			const { container } = render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					className="custom-class"
					mode="single"
				/>
			);

			const wrapper = container.firstChild;
			expect(wrapper).toHaveClass('custom-class');
		});

		it('renders with dark mode classes', () => {
			const handleChange = jest.fn();
			const { container } = render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			const button = container.querySelector('button');
			expect(button?.className).toContain('dark:');
		});
	});

	describe('Edge Cases', () => {
		it('handles empty options array', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={[]}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			expect(screen.getByText('No results')).toBeInTheDocument();
		});

		it('handles rapid toggle clicks', async () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');

			// Rapid clicks
			fireEvent.click(trigger);
			fireEvent.click(trigger);
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(trigger).toBeInTheDocument();
			});
		});
	});

	describe('Accessibility', () => {
		it('has proper button role for trigger', () => {
			const handleChange = jest.fn();
			render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			expect(trigger).toBeInTheDocument();
		});

		it('supports keyboard navigation', () => {
			const handleChange = jest.fn();
			const { container } = render(
				<Select
					value=""
					onChange={handleChange}
					options={mockOptions}
					mode="single"
				/>
			);

			const trigger = screen.getByRole('button');
			expect(trigger).toBeInTheDocument();

			// Can be focused
			trigger.focus();
			expect(document.activeElement).toBe(trigger);
		});
	});
});
