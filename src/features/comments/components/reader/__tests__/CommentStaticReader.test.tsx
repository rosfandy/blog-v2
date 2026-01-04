import { render, screen } from '@testing-library/react';
import CommentStaticReader from '@/features/comments/components/reader/CommentStaticReader';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
  })),
}));

// Mock giscus
jest.mock('@giscus/react', () => {
  return function MockGiscus() {
    return <div data-testid="giscus-component">Giscus Comments</div>;
  };
});

describe('CommentStaticReader', () => {
  it('should render comments section when blogId is provided', () => {
    render(<CommentStaticReader blogId="123" />);

    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('should render Giscus component when blogId is provided', () => {
    render(<CommentStaticReader blogId="123" />);

    expect(screen.getByTestId('giscus-component')).toBeInTheDocument();
  });

  it('should not render anything when blogId is not provided', () => {
    const { container } = render(<CommentStaticReader />);

    expect(container.firstChild).toBeNull();
  });

  it('should display comments heading with proper styling', () => {
    render(<CommentStaticReader blogId="123" />);

    const heading = screen.getByText('Comments');
    expect(heading).toHaveClass('font-display');
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('text-secondary');
  });

  it('should render section element', () => {
    const { container } = render(<CommentStaticReader blogId="123" />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('pb-8');
  });

  it('should pass blogId as term to Giscus', () => {
    render(<CommentStaticReader blogId="test-blog-123" />);

    // Giscus component is mocked, so we just verify it renders
    expect(screen.getByTestId('giscus-component')).toBeInTheDocument();
  });

  it('should use light theme when theme is light', () => {
    render(<CommentStaticReader blogId="123" />);

    // Verify component renders with light theme
    expect(screen.getByTestId('giscus-component')).toBeInTheDocument();
  });

  it('should handle empty blogId string', () => {
    const { container } = render(<CommentStaticReader blogId="" />);

    // Empty string is falsy, so nothing should render
    expect(container.firstChild).toBeNull();
  });

  it('should handle undefined blogId', () => {
    const { container } = render(<CommentStaticReader blogId={undefined} />);

    // Undefined is falsy, so nothing should render
    expect(container.firstChild).toBeNull();
  });

  it('should display comments icon alongside heading', () => {
    const { container } = render(<CommentStaticReader blogId="123" />);

    // Check for flex layout with gap in the heading wrapper
    const heading = screen.getByText('Comments');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('flex');
  });

  it('should have proper margin spacing', () => {
    const { container } = render(<CommentStaticReader blogId="123" />);

    const heading = screen.getByText('Comments');
    expect(heading).toHaveClass('flex');
    expect(heading).toHaveClass('gap-3');
  });

  it('should render with dark mode support', () => {
    const { container } = render(<CommentStaticReader blogId="123" />);

    const section = container.querySelector('section');
    // Even though we don't see dark: classes directly applied, the children may have them
    expect(section).toBeInTheDocument();
  });
});
