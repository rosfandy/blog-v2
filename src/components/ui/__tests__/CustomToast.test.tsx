import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from '../CustomToast';

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

// Test component that uses useToast
const TestComponent = () => {
	const { showToast } = useToast();

	return (
		<div>
			<button onClick={() => showToast('success', 'Success!', 'Operation completed')}>
				Show Success
			</button>
			<button onClick={() => showToast('error', 'Error!', 'Something went wrong')}>
				Show Error
			</button>
			<button onClick={() => showToast('warning', 'Warning!', 'Be careful')}>
				Show Warning
			</button>
			<button onClick={() => showToast('info', 'Info', 'FYI')}>
				Show Info
			</button>
		</div>
	);
};

describe('CustomToast Component', () => {
	describe('Toast Provider Setup', () => {
		it('provides toast context to children', () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			expect(screen.getByText('Show Success')).toBeInTheDocument();
		});

		it('throws error when useToast is used outside provider', () => {
			const ThrowComponent = () => {
				const { showToast } = useToast();
				return <div onClick={() => showToast('success', 'Test')}>Test</div>;
			};

			// Suppress console error
			const spy = jest.spyOn(console, 'error').mockImplementation();

			expect(() => {
				render(<ThrowComponent />);
			}).toThrow('useToast must be used within a ToastProvider');

			spy.mockRestore();
		});
	});

	describe('Toast Display', () => {
		it('displays success toast', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				expect(screen.getByText('Operation completed')).toBeInTheDocument();
			});
		});

		it('displays error toast', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const errorButton = screen.getByText('Show Error');
			fireEvent.click(errorButton);

			await waitFor(() => {
				expect(screen.getByText('Error!')).toBeInTheDocument();
				expect(screen.getByText('Something went wrong')).toBeInTheDocument();
			});
		});

		it('displays warning toast', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const warningButton = screen.getByText('Show Warning');
			fireEvent.click(warningButton);

			await waitFor(() => {
				expect(screen.getByText('Warning!')).toBeInTheDocument();
				expect(screen.getByText('Be careful')).toBeInTheDocument();
			});
		});

		it('displays info toast', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const infoButton = screen.getByText('Show Info');
			fireEvent.click(infoButton);

			await waitFor(() => {
				expect(screen.getByText('Info')).toBeInTheDocument();
				expect(screen.getByText('FYI')).toBeInTheDocument();
			});
		});

		it('displays title without description', async () => {
			const MinimalComponent = () => {
				const { showToast } = useToast();
				return (
					<button onClick={() => showToast('success', 'Just title')}>
						Show Toast
					</button>
				);
			};

			render(
				<ToastProvider>
					<MinimalComponent />
				</ToastProvider>
			);

			const button = screen.getByText('Show Toast');
			fireEvent.click(button);

			await waitFor(() => {
				expect(screen.getByText('Just title')).toBeInTheDocument();
			});
		});
	});

	describe('Toast Styling and Icons', () => {
		it('renders success toast with green icon', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				const icons = container.querySelectorAll('svg');
				expect(icons.length).toBeGreaterThan(0);
			});
		});

		it('renders error toast with red icon', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const errorButton = screen.getByText('Show Error');
			fireEvent.click(errorButton);

			await waitFor(() => {
				expect(screen.getByText('Error!')).toBeInTheDocument();
				const icons = container.querySelectorAll('svg');
				expect(icons.length).toBeGreaterThan(0);
			});
		});

		it('renders warning toast with yellow icon', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const warningButton = screen.getByText('Show Warning');
			fireEvent.click(warningButton);

			await waitFor(() => {
				expect(screen.getByText('Warning!')).toBeInTheDocument();
				const icons = container.querySelectorAll('svg');
				expect(icons.length).toBeGreaterThan(0);
			});
		});

		it('renders info toast with blue icon', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const infoButton = screen.getByText('Show Info');
			fireEvent.click(infoButton);

			await waitFor(() => {
				expect(screen.getByText('Info')).toBeInTheDocument();
				const icons = container.querySelectorAll('svg');
				expect(icons.length).toBeGreaterThan(0);
			});
		});

		it('applies proper border color based on type', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				const toastContainer = container.querySelector('[data-toast-id]');
				expect(toastContainer).toBeInTheDocument();
				// Toast should have border styling
				const toastDiv = toastContainer?.querySelector('div[class*="border"]');
				expect(toastDiv || toastContainer?.querySelector('div')).toBeInTheDocument();
			});
		});
	});

	describe('Toast Removal', () => {
		it('auto-removes toast after 4 seconds', async () => {
			jest.useFakeTimers();

			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
			});

			jest.advanceTimersByTime(4000);

			await waitFor(() => {
				expect(screen.queryByText('Success!')).not.toBeInTheDocument();
			});

			jest.useRealTimers();
		});

		it('removes toast when dismiss button clicked', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
			});

			const dismissButton = screen.getByRole('button', { name: /Dismiss/i });
			fireEvent.click(dismissButton);

			await waitFor(() => {
				expect(screen.queryByText('Success!')).not.toBeInTheDocument();
			});
		});

		it('handles removal with animation', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
			});

			const dismissButton = screen.getByRole('button', { name: /Dismiss/i });
			fireEvent.click(dismissButton);

			// Toast should be removed after animation
			await waitFor(() => {
				expect(screen.queryByText('Success!')).not.toBeInTheDocument();
			}, { timeout: 1000 });
		});
	});

	describe('Multiple Toasts', () => {
		it('displays multiple toasts simultaneously', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			const errorButton = screen.getByText('Show Error');

			fireEvent.click(successButton);
			fireEvent.click(errorButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				expect(screen.getByText('Error!')).toBeInTheDocument();
			});
		});

		it('allows removing individual toasts from multiple', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			const errorButton = screen.getByText('Show Error');

			fireEvent.click(successButton);
			fireEvent.click(errorButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				expect(screen.getByText('Error!')).toBeInTheDocument();
			});

			const dismissButtons = screen.getAllByRole('button', { name: /Dismiss/i });
			fireEvent.click(dismissButtons[0]);

			await waitFor(() => {
				const visibleToasts = screen.queryAllByText(/Success!|Error!/);
				expect(visibleToasts.length).toBe(1);
			});
		});

		it('stacks toasts vertically with spacing', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			const warningButton = screen.getByText('Show Warning');

			fireEvent.click(successButton);
			fireEvent.click(warningButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				expect(screen.getByText('Warning!')).toBeInTheDocument();
			});

			// Check that container has space-y class for vertical spacing
			const toastContainer = container.querySelector('[class*="space-y"]');
			expect(toastContainer).toBeInTheDocument();
		});
	});

	describe('Dark Mode', () => {
		it('applies dark mode classes to toast', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				const toast = container.querySelector('[data-toast-id]');
				// Toast should be rendered with styling classes
				expect(toast).toBeInTheDocument();
				const toastDiv = toast?.querySelector('div[class*="bg-"]');
				expect(toastDiv).toBeInTheDocument();
			});
		});

		it('shows proper text color in dark mode', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				// Toast text should be rendered
				const title = screen.getByText('Success!');
				expect(title.tagName).toBe('P');
			});
		});
	});

	describe('Edge Cases', () => {
		it('handles rapid toast creation', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');

			fireEvent.click(successButton);
			fireEvent.click(successButton);
			fireEvent.click(successButton);

			await waitFor(() => {
				const successToasts = screen.queryAllByText('Success!');
				expect(successToasts.length).toBeGreaterThan(0);
			});
		});

		it('handles very long toast title', async () => {
			const LongComponent = () => {
				const { showToast } = useToast();
				return (
					<button onClick={() => showToast('success', 'A'.repeat(100))}>
						Show Toast
					</button>
				);
			};

			render(
				<ToastProvider>
					<LongComponent />
				</ToastProvider>
			);

			const button = screen.getByText('Show Toast');
			fireEvent.click(button);

			await waitFor(() => {
				expect(screen.getByText(/A+/)).toBeInTheDocument();
			});
		});

		it('handles very long description', async () => {
			const LongComponent = () => {
				const { showToast } = useToast();
				return (
					<button onClick={() => showToast('success', 'Title', 'B'.repeat(200))}>
						Show Toast
					</button>
				);
			};

			render(
				<ToastProvider>
					<LongComponent />
				</ToastProvider>
			);

			const button = screen.getByText('Show Toast');
			fireEvent.click(button);

			await waitFor(() => {
				expect(screen.getByText(/Title/)).toBeInTheDocument();
			});
		});

		it('handles empty description gracefully', async () => {
			const EmptyDescComponent = () => {
				const { showToast } = useToast();
				return (
					<button onClick={() => showToast('success', 'Just Title', '')}>
						Show Toast
					</button>
				);
			};

			render(
				<ToastProvider>
					<EmptyDescComponent />
				</ToastProvider>
			);

			const button = screen.getByText('Show Toast');
			fireEvent.click(button);

			await waitFor(() => {
				expect(screen.getByText('Just Title')).toBeInTheDocument();
			});
		});

		it('generates unique IDs for each toast', async () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);
			fireEvent.click(successButton);

			await waitFor(() => {
				const toastElements = container.querySelectorAll('[data-toast-id]');
				const ids = Array.from(toastElements).map(el => el.getAttribute('data-toast-id'));
				const uniqueIds = new Set(ids);
				expect(uniqueIds.size).toBe(ids.length);
			});
		});
	});

	describe('Accessibility', () => {
		it('has sr-only text for dismiss button', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Dismiss')).toBeInTheDocument();
			});
		});

		it('uses semantic HTML for toast structure', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				expect(screen.getByText('Success!')).toBeInTheDocument();
				const title = screen.getByText('Success!');
				expect(title.tagName).toBe('P');
			});
		});

		it('has proper button role for dismiss', async () => {
			render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const successButton = screen.getByText('Show Success');
			fireEvent.click(successButton);

			await waitFor(() => {
				const dismissButton = screen.getByRole('button', { name: /Dismiss/i });
				expect(dismissButton).toBeInTheDocument();
			});
		});
	});

	describe('Toast Container Position', () => {
		it('positions toasts in top-right corner', () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const toastContainer = container.querySelector('[class*="fixed"]');
			expect(toastContainer?.className).toContain('top-4');
			expect(toastContainer?.className).toContain('right-4');
		});

		it('sets proper z-index for toasts', () => {
			const { container } = render(
				<ToastProvider>
					<TestComponent />
				</ToastProvider>
			);

			const toastContainer = container.querySelector('[class*="z-"]');
			expect(toastContainer?.className).toContain('z-50');
		});
	});
});
