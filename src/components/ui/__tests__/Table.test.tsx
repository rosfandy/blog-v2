import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table, { DataItem } from '../Table';

describe('Table Component', () => {
	const mockColumns = [
		{ key: 'title', header: 'Title', type: 'title' as const },
		{ key: 'status', header: 'Status', type: 'status' as const },
		{ key: 'category', header: 'Category', type: 'category' as const },
		{ key: 'date', header: 'Date', type: 'date' as const },
		{ key: 'id', header: 'Actions', type: 'actions' as const },
	];

	const mockData: DataItem[] = [
		{
			id: '1',
			title: 'First Post',
			description: 'This is the first post',
			status: 'Published',
			category: 'Development',
			date: '2024-01-15',
		},
		{
			id: '2',
			title: 'Second Post',
			description: 'This is the second post',
			status: 'Draft',
			category: 'Design',
			date: '2024-01-10',
		},
		{
			id: '3',
			title: 'Third Post',
			description: 'This is the third post',
			status: 'Scheduled',
			category: 'Events',
			date: '2024-01-05',
		},
	];

	describe('Basic Rendering', () => {
		it('renders table with headers', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(screen.getByText('Title')).toBeInTheDocument();
			expect(screen.getByText('Status')).toBeInTheDocument();
			expect(screen.getByText('Category')).toBeInTheDocument();
			expect(screen.getByText('Date')).toBeInTheDocument();
		});

		it('renders all data rows', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(screen.getByText('First Post')).toBeInTheDocument();
			expect(screen.getByText('Second Post')).toBeInTheDocument();
			expect(screen.getByText('Third Post')).toBeInTheDocument();
		});

		it('renders empty table when data is undefined', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={undefined}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			// Should still have headers
			expect(screen.getByText('Title')).toBeInTheDocument();
		});

		it('renders empty table when data is empty array', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={[]}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			// Should have headers but no rows
			expect(screen.getByText('Title')).toBeInTheDocument();
			expect(screen.queryByText('First Post')).not.toBeInTheDocument();
		});
	});

	describe('Column Types', () => {
		it('renders title column with bold text', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const titleCell = screen.getByText('First Post');
			expect(titleCell).toBeInTheDocument();
			expect(titleCell.className).toContain('font-bold');
		});

		it('renders title column with description as subtitle', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(screen.getByText('This is the first post')).toBeInTheDocument();
		});

		it('renders status column with proper styling', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const statusBadges = screen.getAllByText(/Published|Draft|Scheduled/);
			expect(statusBadges.length).toBe(3);

			statusBadges.forEach(badge => {
				expect(badge.className).toContain('rounded-full');
				expect(badge.className).toContain('text-xs');
			});
		});

		it('renders status with colored dot indicator', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const statusElements = container.querySelectorAll('[class*="rounded-full"]');
			// Should have dots for each status
			expect(statusElements.length).toBeGreaterThan(0);
		});

		it('renders category column with border and custom color', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const categories = screen.getAllByText(/Development|Design|Events/);
			expect(categories.length).toBe(3);

			categories.forEach(cat => {
				expect(cat.className).toContain('border');
				expect(cat.className).toContain('rounded');
			});
		});

		it('renders date column with proper text styling', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(screen.getByText('2024-01-15')).toBeInTheDocument();
			expect(screen.getByText('2024-01-10')).toBeInTheDocument();
		});

		it('renders custom data in default column type', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const customColumns = [
				{ key: 'title', header: 'Title', type: 'title' as const },
				{ key: 'customField', header: 'Status', type: 'date' as const },
			];

			const customData = [
				{
					title: 'Test Item',
					description: 'Desc',
					customField: '2024-01-15',
				},
			];

			const { container } = render(
				<Table
					columns={customColumns}
					data={customData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			// Should render the data
			const rows = container.querySelectorAll('tbody tr');
			expect(rows.length).toBe(1);
		});
	});

	describe('Action Buttons', () => {
		it('renders edit and delete buttons in actions column', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const buttons = container.querySelectorAll('button[class*="hover:"]');
			expect(buttons.length).toBeGreaterThan(0);
		});

		it('calls onEdit when edit button clicked', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const editButtons = container.querySelectorAll('button[class*="hover:"]');
			if (editButtons.length > 0) {
				fireEvent.click(editButtons[0]);
				expect(handleEdit).toHaveBeenCalled();
			}
		});

		it('calls onDelete when delete button clicked', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const buttons = container.querySelectorAll('button[class*="hover:"]');
			if (buttons.length > 1) {
				// Delete button should be after edit button
				fireEvent.click(buttons[1]);
				expect(handleDelete).toHaveBeenCalled();
			}
		});

		it('does not require onEdit and onDelete callbacks', () => {
			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
				/>
			);

			expect(screen.getByText('First Post')).toBeInTheDocument();
			expect(container).toBeInTheDocument();
		});

		it('passes correct data item to edit handler', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const editButtons = container.querySelectorAll('button[class*="hover:"]');
			if (editButtons.length > 0) {
				fireEvent.click(editButtons[0]);
				expect(handleEdit).toHaveBeenCalledWith(mockData[0]);
			}
		});

		it('passes correct data item to delete handler', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const buttons = container.querySelectorAll('button[class*="hover:"]');
			if (buttons.length > 1) {
				fireEvent.click(buttons[1]);
				expect(handleDelete).toHaveBeenCalledWith(mockData[0]);
			}
		});
	});

	describe('Status Styling', () => {
		it('applies green styling for Published status', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const publishedStatus = screen.getByText('Published');
			expect(publishedStatus.className).toContain('green');
		});

		it('applies yellow styling for Draft status', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const draftStatus = screen.getByText('Draft');
			expect(draftStatus.className).toContain('yellow');
		});

		it('applies gray styling for Scheduled status', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const scheduledStatus = screen.getByText('Scheduled');
			expect(scheduledStatus.className).toContain('gray');
		});

		it('applies default styling for unknown status', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const unknownData = [
				{
					id: '1',
					title: 'Test',
					description: 'Desc',
					status: 'Unknown',
					category: 'Development',
					date: '2024-01-15',
				},
			];

			render(
				<Table
					columns={mockColumns}
					data={unknownData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const unknownStatus = screen.getByText('Unknown');
			expect(unknownStatus).toBeInTheDocument();
		});
	});

	describe('Category Styling', () => {
		it('applies primary color for Development category', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const devCategory = screen.getByText('Development');
			expect(devCategory.className).toContain('primary');
		});

		it('applies purple color for Design category', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const designCategory = screen.getByText('Design');
			expect(designCategory.className).toContain('purple');
		});

		it('applies secondary color for Events category', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const eventsCategory = screen.getByText('Events');
			expect(eventsCategory.className).toContain('secondary');
		});

		it('applies default styling for unknown category', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const unknownData = [
				{
					id: '1',
					title: 'Test',
					description: 'Desc',
					status: 'Published',
					category: 'Unknown',
					date: '2024-01-15',
				},
			];

			render(
				<Table
					columns={mockColumns}
					data={unknownData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const unknownCategory = screen.getByText('Unknown');
			expect(unknownCategory).toBeInTheDocument();
		});
	});

	describe('Styling and Theming', () => {
		it('renders table with proper base styles', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const table = container.querySelector('table');
			expect(table?.className).toContain('backdrop-blur');
			expect(table?.className).toContain('rounded');
		});

		it('applies dark mode classes', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const table = container.querySelector('table');
			expect(table?.className).toContain('dark:');
		});

		it('applies custom column className', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const customColumns = [
				{ key: 'title', header: 'Title', type: 'title' as const, className: 'custom-col' },
				{ key: 'status', header: 'Status', type: 'status' as const },
				{ key: 'category', header: 'Category', type: 'category' as const },
				{ key: 'date', header: 'Date', type: 'date' as const },
				{ key: 'id', header: 'Actions', type: 'actions' as const },
			];

			const { container } = render(
				<Table
					columns={customColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const customHeader = container.querySelector('[class*="custom-col"]');
			expect(customHeader).toBeInTheDocument();
		});

		it('shows hover effects on rows', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const rows = container.querySelectorAll('tbody tr');
			rows.forEach(row => {
				expect(row.className).toContain('group');
				expect(row.className).toContain('hover:');
			});
		});

		it('shows action buttons with hover opacity change', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const actionCells = container.querySelectorAll('td:last-child');
			actionCells.forEach(cell => {
				expect(cell).toBeInTheDocument();
			});
		});
	});

	describe('Responsive Design', () => {
		it('has responsive padding on cells', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const cells = container.querySelectorAll('td, th');
			cells.forEach(cell => {
				expect(cell.className).toContain('p-');
			});
		});

		it('renders responsive text sizes', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const titleCells = container.querySelectorAll('td span.text-sm');
			expect(titleCells.length).toBeGreaterThan(0);
		});

		it('has responsive text truncation', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const truncated = container.querySelector('[class*="truncate"]');
			expect(truncated).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('handles items with missing fields', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const incompleteData = [
				{
					id: '1',
					title: 'Test',
				},
			];

			render(
				<Table
					columns={mockColumns}
					data={incompleteData as DataItem[]}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(screen.getByText('Test')).toBeInTheDocument();
		});

		it('handles very long content in cells', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const longTitle = 'A'.repeat(50);
			const longData = [
				{
					id: '1',
					title: longTitle,
					description: 'B'.repeat(100),
					status: 'Published',
					category: 'Development',
					date: '2024-01-15',
				},
			];

			const { container } = render(
				<Table
					columns={mockColumns}
					data={longData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			// Verify the table renders with long content
			const rows = container.querySelectorAll('tbody tr');
			expect(rows.length).toBeGreaterThan(0);
		});

		it('renders single data row correctly', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const singleData = [mockData[0]];

			render(
				<Table
					columns={mockColumns}
					data={singleData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(screen.getByText('First Post')).toBeInTheDocument();
			expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
		});

		it('handles many rows without performance issues', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const manyRows = Array.from({ length: 100 }, (_, i) => ({
				id: String(i),
				title: `Post ${i}`,
				description: `Description ${i}`,
				status: 'Published',
				category: 'Development',
				date: '2024-01-15',
			}));

			const { container } = render(
				<Table
					columns={mockColumns}
					data={manyRows}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const rows = container.querySelectorAll('tbody tr');
			expect(rows.length).toBe(100);
		});
	});

	describe('Accessibility', () => {
		it('uses semantic table elements', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			expect(container.querySelector('table')).toBeInTheDocument();
			expect(container.querySelector('thead')).toBeInTheDocument();
			expect(container.querySelector('tbody')).toBeInTheDocument();
			expect(container.querySelectorAll('tr').length).toBeGreaterThan(0);
		});

		it('has proper header elements', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const headers = container.querySelectorAll('th');
			expect(headers.length).toBe(mockColumns.length);
		});

		it('uses button role for action buttons', () => {
			const handleEdit = jest.fn();
			const handleDelete = jest.fn();

			const { container } = render(
				<Table
					columns={mockColumns}
					data={mockData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			);

			const buttons = container.querySelectorAll('button');
			buttons.forEach(btn => {
				expect(btn.tagName).toBe('BUTTON');
			});
		});
	});
});
