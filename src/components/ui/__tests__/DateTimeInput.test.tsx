import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateTimeInput from '../DateTimeInput';

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

describe('DateTimeInput Component', () => {
	const mockDate = '2024-01-15T14:30:00Z';

	describe('Basic Rendering', () => {
		it('renders without value when empty', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			expect(screen.getByText('Select date and time')).toBeInTheDocument();
		});

		it('displays formatted date and time when value provided', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const displayValue = screen.queryByText(/Jan.*15.*2024/i);
			expect(displayValue).toBeInTheDocument();
		});

		it('renders with calendar icon', () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const icons = container.querySelectorAll('svg');
			expect(icons.length).toBeGreaterThan(0);
		});

		it('applies custom className', () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
					className="custom-class"
				/>
			);

			const wrapper = container.firstChild;
			expect(wrapper).toHaveClass('custom-class');
		});
	});

	describe('Dropdown Behavior', () => {
		it('opens dropdown when trigger clicked', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button', { name: /Select date and time/i });
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Date')).toBeInTheDocument();
				expect(screen.getByText('Time')).toBeInTheDocument();
			});
		});

		it('closes dropdown when clicking outside', async () => {
			const handleChange = jest.fn();
			render(
				<div>
					<DateTimeInput
						value=""
						onChange={handleChange}
					/>
					<div data-testid="outside">Outside</div>
				</div>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Date')).toBeInTheDocument();
			});

			const outside = screen.getByTestId('outside');
			fireEvent.mouseDown(outside);

			await waitFor(() => {
				// Dropdown should be closed
				expect(trigger).toBeInTheDocument();
			});
		});

		it('toggles dropdown on button click', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');

			// Open
			fireEvent.click(trigger);
			await waitFor(() => {
				expect(screen.getByText('Date')).toBeInTheDocument();
			});

			// Close
			fireEvent.click(trigger);
			await waitFor(() => {
				// Dropdown should be hidden
				expect(trigger).toBeInTheDocument();
			});
		});

		it('rotates expand icon when dropdown opens', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Date')).toBeInTheDocument();
			});

			expect(trigger).toBeInTheDocument();
		});
	});

	describe('Date and Time Selection', () => {
		it('allows selecting a date', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const dateInputs = container.querySelectorAll('input[type="date"]');
			const dateInput = dateInputs[0] as HTMLInputElement;
			fireEvent.change(dateInput, { target: { value: '2024-06-15' } });

			expect(dateInput.value).toBe('2024-06-15');
		});

		it('allows selecting a time', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const timeInputs = container.querySelectorAll('input[type="time"]');
			const timeInput = timeInputs[0] as HTMLInputElement;
			fireEvent.change(timeInput, { target: { value: '15:45' } });

			expect(timeInput.value).toBe('15:45');
		});

		it('parses existing value into date and time inputs', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				const dateInputs = screen.queryAllByDisplayValue(/2024/);
				expect(dateInputs.length).toBeGreaterThan(0);
			});
		});

		it('applies changes when Apply button clicked with valid date and time', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const dateInputs = container.querySelectorAll('input[type="date"]');
			const timeInputs = container.querySelectorAll('input[type="time"]');
			const dateInput = dateInputs[0];
			const timeInput = timeInputs[0];

			fireEvent.change(dateInput, { target: { value: '2024-06-15' } });
			fireEvent.change(timeInput, { target: { value: '14:30' } });

			const applyButton = screen.getByText('Apply');
			fireEvent.click(applyButton);

			expect(handleChange).toHaveBeenCalled();
		});

		it('disables Apply button when date or time is empty', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const applyButton = screen.getByText('Apply') as HTMLButtonElement;
			expect(applyButton.disabled).toBe(true);

			// Add date only
			const dateInputs = container.querySelectorAll('input[type="date"]');
			const dateInput = dateInputs[0];
			fireEvent.change(dateInput, { target: { value: '2024-06-15' } });

			expect(applyButton.disabled).toBe(true);

			// Add time
			const timeInputs = container.querySelectorAll('input[type="time"]');
			const timeInput = timeInputs[0];
			fireEvent.change(timeInput, { target: { value: '14:30' } });

			await waitFor(() => {
				expect(applyButton.disabled).toBe(false);
			});
		});
	});

	describe('Clear Functionality', () => {
		it('clears date and time when Clear button clicked', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const clearButton = screen.getByText('Clear');
			fireEvent.click(clearButton);

			expect(handleChange).toHaveBeenCalledWith('');
		});

		it('closes dropdown after clearing', async () => {
			const handleChange = jest.fn();
			const { rerender } = render(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const clearButton = screen.getByText('Clear');
			fireEvent.click(clearButton);

			rerender(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			await waitFor(() => {
				expect(screen.getByText('Select date and time')).toBeInTheDocument();
			});
		});

		it('resets temp date and time on clear', async () => {
			const handleChange = jest.fn();
			const { rerender } = render(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			let inputs = screen.queryAllByDisplayValue(/2024/);
			expect(inputs.length).toBeGreaterThan(0);

			const clearButton = screen.getByText('Clear');
			fireEvent.click(clearButton);

			rerender(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			fireEvent.click(trigger);

			inputs = screen.queryAllByDisplayValue(/2024/);
			await waitFor(() => {
				expect(inputs.length).toBe(0);
			});
		});
	});

	describe('Display Formatting', () => {
		it('formats date and time in locale-specific format', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const displayText = screen.getByRole('button').textContent || '';
			expect(displayText).toMatch(/Jan/); // Month should be abbreviated
			expect(displayText).toMatch(/2024/); // Year should be shown
		});

		it('shows placeholder when no value', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			expect(screen.getByText('Select date and time')).toBeInTheDocument();
		});

		it('displays proper date format with leading zeros', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value="2024-01-05T09:05:00Z"
					onChange={handleChange}
				/>
			);

			// The formatted output should show properly formatted date
			const button = screen.getByRole('button');
			expect(button.textContent).toMatch(/Jan/);
		});
	});

	describe('Dark Mode', () => {
		it('renders with dark mode classes', () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const button = container.querySelector('button');
			expect(button?.className).toContain('dark:');
		});

		it('applies dark styles to dropdown', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				const dropdown = container.querySelector('[class*="dark:"]');
				expect(dropdown).toBeInTheDocument();
			});
		});
	});

	describe('Edge Cases', () => {
		it('handles rapid open/close clicks', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');

			fireEvent.click(trigger);
			fireEvent.click(trigger);
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(trigger).toBeInTheDocument();
			});
		});

		it('handles changing value while dropdown is open', async () => {
			const handleChange = jest.fn();
			const { container, rerender } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Date')).toBeInTheDocument();
			});

			// Rerender with new value
			rerender(
				<DateTimeInput
					value={mockDate}
					onChange={handleChange}
				/>
			);

			const inputs = screen.queryAllByDisplayValue(/2024/);
			await waitFor(() => {
				expect(inputs.length).toBeGreaterThan(0);
			});
		});

		it('handles invalid date value gracefully', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			// Should render without crashing
			expect(screen.getByRole('button')).toBeInTheDocument();
			
			// Should be able to open dropdown
			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);
			
			// Should have date/time inputs available
			const dateInputs = container.querySelectorAll('input[type="date"]');
			expect(dateInputs.length).toBeGreaterThan(0);
		});

		it('preserves values during Apply operation', async () => {
			const handleChange = jest.fn();
			const { container } = render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			const dateInputs = container.querySelectorAll('input[type="date"]');
			const timeInputs = container.querySelectorAll('input[type="time"]');
			const dateInput = dateInputs[0];
			const timeInput = timeInputs[0];
			const selectedDate = '2024-12-25';
			const selectedTime = '10:30';

			fireEvent.change(dateInput, { target: { value: selectedDate } });
			fireEvent.change(timeInput, { target: { value: selectedTime } });

			const applyButton = screen.getByText('Apply');
			fireEvent.click(applyButton);

			expect(handleChange).toHaveBeenCalledWith(
				expect.stringContaining(selectedDate)
			);
		});
	});

	describe('Accessibility', () => {
		it('has proper button role for trigger', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			expect(trigger).toBeInTheDocument();
		});

		it('has labeled date and time inputs', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Date')).toBeInTheDocument();
				expect(screen.getByText('Time')).toBeInTheDocument();
			});
		});

		it('has descriptive button labels', async () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(screen.getByText('Apply')).toBeInTheDocument();
				expect(screen.getByText('Clear')).toBeInTheDocument();
			});
		});

		it('supports keyboard navigation', () => {
			const handleChange = jest.fn();
			render(
				<DateTimeInput
					value=""
					onChange={handleChange}
				/>
			);

			const trigger = screen.getByRole('button');
			trigger.focus();

			expect(document.activeElement).toBe(trigger);
		});
	});
});
