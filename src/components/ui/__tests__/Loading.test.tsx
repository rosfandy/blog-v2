import { render, screen, waitFor } from '@testing-library/react';
import Loading from '@/components/ui/Loading';

// Mock gsap to avoid animation complications
jest.mock('gsap', () => ({
  gsap: {
    timeline: jest.fn(() => ({
      fromTo: jest.fn().mockReturnThis(),
      to: jest.fn().mockReturnThis(),
      kill: jest.fn(),
    })),
    to: jest.fn(),
    killTweensOf: jest.fn(),
  },
}));

describe('Loading', () => {
  it('should render loading component', () => {
    const mockOnFinish = jest.fn();
    render(<Loading onFinish={mockOnFinish} />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Preparing...')).toBeInTheDocument();
  });

  it('should display loading text', () => {
    const mockOnFinish = jest.fn();
    render(<Loading onFinish={mockOnFinish} />);

    const loadingText = screen.getByText('Loading');
    expect(loadingText).toBeInTheDocument();
  });

  it('should display progress percentage', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    // Initial progress should be 0%
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should display preparing text', () => {
    const mockOnFinish = jest.fn();
    render(<Loading onFinish={mockOnFinish} />);

    expect(screen.getByText('Preparing...')).toBeInTheDocument();
  });

  it('should render progress bar', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const progressBar = container.querySelector('div[style*="width"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should have fixed positioning for full screen', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const root = container.querySelector('.fixed');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('inset-0');
  });

  it('should render with high z-index', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const root = container.querySelector('.z-\\[9999\\]');
    expect(root).toBeInTheDocument();
  });

  it('should accept onFinish callback', () => {
    const mockOnFinish = jest.fn();
    render(<Loading onFinish={mockOnFinish} />);

    // Component should be renderedwith callback
    expect(mockOnFinish).not.toHaveBeenCalled();
  });

  it('should render with dark mode support', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const root = container.firstChild;
    expect(root).toHaveClass('dark:bg-background-dark');
  });

  it('should have border for progress bar', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const progressBarContainer = container.querySelector('.border-2');
    expect(progressBarContainer).toBeInTheDocument();
  });

  it('should display progress bar with rounded corners', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const progressBar = container.querySelector('.rounded-full');
    expect(progressBar).toBeInTheDocument();
  });

  it('should render pulse ring element', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const pulseRing = container.querySelector('.loading-pulse');
    expect(pulseRing).toBeInTheDocument();
  });

  it('should render progress indicator text', () => {
    const mockOnFinish = jest.fn();
    render(<Loading onFinish={mockOnFinish} />);

    const spans = screen.getAllByText(/Loading|0%/);
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should have flex layout for centering', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const root = container.querySelector('.flex');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('items-center');
    expect(root).toHaveClass('justify-center');
  });

  it('should have minimum height screen', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const root = container.querySelector('.min-h-screen');
    expect(root).toBeInTheDocument();
  });

  it('should render with proper styling for readability', () => {
    const mockOnFinish = jest.fn();
    const { container } = render(<Loading onFinish={mockOnFinish} />);

    const textElements = container.querySelectorAll('span, p');
    expect(textElements.length).toBeGreaterThan(0);
  });
});
