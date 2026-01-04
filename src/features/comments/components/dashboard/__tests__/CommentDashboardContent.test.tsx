import { render, screen } from '@testing-library/react';
import CommentDashboardContent from '@/features/comments/components/dashboard/CommentDashboardContent';

describe('CommentDashboardContent', () => {
  it('should render main element', () => {
    const { container } = render(<CommentDashboardContent />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should display comments header title', () => {
    render(<CommentDashboardContent />);

    expect(screen.getByText(/COMMENTS/)).toBeInTheDocument();
  });

  it('should display header description', () => {
    render(<CommentDashboardContent />);

    expect(
      screen.getByText('Manage and moderate your blog comments.')
    ).toBeInTheDocument();
  });

  it('should display no comments message', () => {
    render(<CommentDashboardContent />);

    expect(screen.getByText('No Comments Yet')).toBeInTheDocument();
  });

  it('should display empty state description', () => {
    render(<CommentDashboardContent />);

    expect(
      screen.getByText(/Comments will appear here once readers start engaging/)
    ).toBeInTheDocument();
  });

  it('should render header element', () => {
    const { container } = render(<CommentDashboardContent />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should have header with proper styling', () => {
    const { container } = render(<CommentDashboardContent />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('w-full');
    expect(header).toHaveClass('p-6');
  });

  it('should have proper flex layout on header', () => {
    const { container } = render(<CommentDashboardContent />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
  });

  it('should have flex-1 scrollable content area', () => {
    const { container } = render(<CommentDashboardContent />);

    const contentArea = container.querySelector('div[class*="flex-1"]');
    expect(contentArea).toBeInTheDocument();
    expect(contentArea).toHaveClass('overflow-y-auto');
  });

  it('should display title with primary color accent', () => {
    const { container } = render(<CommentDashboardContent />);

    const titleSpan = container.querySelector('span[class*="text-primary"]');
    expect(titleSpan).toBeInTheDocument();
    expect(titleSpan?.textContent).toBe('.');
  });

  it('should have dark mode support classes', () => {
    const { container } = render(<CommentDashboardContent />);

    const elementsWithDarkMode = container.querySelectorAll('[class*="dark:"]');
    expect(elementsWithDarkMode.length).toBeGreaterThan(0);
  });

  it('should have proper heading styling', () => {
    render(<CommentDashboardContent />);

    const heading = screen.getByText(/COMMENTS/);
    expect(heading).toHaveClass('font-display');
    expect(heading).toHaveClass('text-4xl');
  });

  it('should display responsive heading sizes', () => {
    render(<CommentDashboardContent />);

    const heading = screen.getByText(/COMMENTS/);
    expect(heading).toHaveClass('md:text-5xl');
  });

  it('should have centered empty state message', () => {
    const { container } = render(<CommentDashboardContent />);

    const centerDiv = container.querySelector('div[class*="text-center"]');
    expect(centerDiv).toBeInTheDocument();
  });

  it('should display empty state with proper padding', () => {
    const { container } = render(<CommentDashboardContent />);

    const emptyState = container.querySelector('div[class*="py-12"]');
    expect(emptyState).toBeInTheDocument();
  });

  it('should have full screen height layout', () => {
    const { container } = render(<CommentDashboardContent />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('h-screen');
  });

  it('should have relative positioning with z-index', () => {
    const { container } = render(<CommentDashboardContent />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('relative');
    expect(main).toHaveClass('z-10');
  });

  it('should display heading with proper text color', () => {
    const { container } = render(<CommentDashboardContent />);

    const heading = container.querySelector('h2');
    expect(heading).toHaveClass('text-gray-800');
  });

  it('should display description with proper text color', () => {
    const { container } = render(<CommentDashboardContent />);

    const description = container.querySelector('p[class*="text-gray-500"]');
    expect(description).toBeInTheDocument();
  });

  it('should render no comments message as h3', () => {
    const { container } = render(<CommentDashboardContent />);

    const emptyHeading = container.querySelector('h3');
    expect(emptyHeading).toBeInTheDocument();
    expect(emptyHeading?.textContent).toBe('No Comments Yet');
  });

  it('should have proper spacing between heading and description', () => {
    const { container } = render(<CommentDashboardContent />);

    const heading = container.querySelector('h2');
    expect(heading).toHaveClass('mb-2');
  });

  it('should render with overflow hidden on main', () => {
    const { container } = render(<CommentDashboardContent />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('overflow-hidden');
  });
});
