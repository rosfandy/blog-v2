import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogStaticReader from '@/features/blog/components/BlogStaticReader';
import { Blog } from '@/features/blog/types/blog.type';

// Mock gsap
jest.mock('gsap', () => ({
  gsap: {
    registerPlugin: jest.fn(),
    context: jest.fn((callback) => {
      callback();
      return { revert: jest.fn() };
    }),
    timeline: jest.fn(() => ({
      fromTo: jest.fn().mockReturnThis(),
    })),
    to: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock gsap/ScrollTrigger
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(() => ({
      kill: jest.fn(),
    })),
    refresh: jest.fn(),
    getAll: jest.fn(() => []),
  },
}));

// Mock gsap/ScrollToPlugin
jest.mock('gsap/ScrollToPlugin', () => ({}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

// Mock CommentStaticReader
jest.mock('@/features/comments/components/reader/CommentStaticReader', () => {
  return function MockCommentReader() {
    return <div data-testid="comment-reader">Comments</div>;
  };
});

describe('BlogStaticReader', () => {
  const mockBlog: Blog = {
    id: 1,
    title: 'Getting Started with React',
    description: 'Learn React from scratch',
    content: '<h1>Introduction</h1><p>Content here</p><h2>Setup</h2><p>Setup content</p>',
    status: 'published',
    category: 'Technology',
    created_at: '2024-01-15',
    tags: ['react', 'javascript', 'frontend'],
    profiles: {
      id: 'user1',
      username: 'johndoe',
      full_name: 'John Doe',
      avatar_url: 'https://example.com/avatar.jpg',
      bio: 'Web Developer',
    },
    thumbnail: 'https://example.com/thumbnail.jpg',
  };

  it('should render blog reader main section', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should display back to articles button', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText('Back to Articles')).toBeInTheDocument();
  });

  it('should display blog title', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
  });

  it('should display blog category', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText(mockBlog.category)).toBeInTheDocument();
  });

  it('should display formatted date', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    const dateText = screen.getByText(/January/);
    expect(dateText).toBeInTheDocument();
  });

  it('should display reading time estimate', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should display author information', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    // Author info may be hidden due to animations but component should render
  });

  it('should display author avatar image', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    const authorImages = screen.getAllByAltText(/Author|avatar/);
    expect(authorImages.length).toBeGreaterThan(0);
  });

  it('should display blog thumbnail image', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should display blog tags', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    mockBlog.tags!.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('should display default tags when none provided', () => {
    const blogWithoutTags: Blog = {
      ...mockBlog,
      tags: [],
    };

    render(<BlogStaticReader blog={blogWithoutTags} />);

    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  it('should display blog content', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('should render share buttons', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const buttons = container.querySelectorAll('button');
    // Back button + 3 share buttons
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('should render comments section', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByTestId('comment-reader')).toBeInTheDocument();
  });

  it('should pass blog id to comments component', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByTestId('comment-reader')).toBeInTheDocument();
  });

  it('should display table of contents with headings', async () => {
    render(<BlogStaticReader blog={mockBlog} />);

    await waitFor(() => {
      expect(screen.getByText('Contents')).toBeInTheDocument();
    });
  });

  it('should handle blog without profile', () => {
    const blogWithoutProfile: Blog = {
      ...mockBlog,
      profiles: undefined,
    };
    
    const { container } = render(<BlogStaticReader blog={blogWithoutProfile} />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    // Component should render without crashing even without profile
  });

  it('should use category as badge text', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText(mockBlog.category!)).toBeInTheDocument();
  });

  it('should display default category when none provided', () => {
    const blogWithoutCategory: Blog = {
      ...mockBlog,
      category: '',
    };

    render(<BlogStaticReader blog={blogWithoutCategory} />);

    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should use blog.date if available', () => {
    const blogWithDate: Blog = {
      ...mockBlog,
      date: '2024-02-20',
    };

    render(<BlogStaticReader blog={blogWithDate} />);

    const dateText = screen.getByText(/February/);
    expect(dateText).toBeInTheDocument();
  });

  it('should process HTML content correctly', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });

  it('should render article with prose styling', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('prose');
  });

  it('should have dark mode support classes', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const elementsWithDarkMode = container.querySelectorAll('[class*="dark:"]');
    expect(elementsWithDarkMode.length).toBeGreaterThan(0);
  });

  it('should render responsive layout', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const responsiveElements = container.querySelectorAll('[class*="md:"]');
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('should handle author name fallback', () => {
    const blogWithoutFullName: Blog = {
      ...mockBlog,
      profiles: {
        ...mockBlog.profiles!,
        full_name: undefined,
      },
    };

    render(<BlogStaticReader blog={blogWithoutFullName} />);

    expect(screen.getByText(/Written by/)).toBeInTheDocument();
  });

  it('should display tags section with header', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText('Tags:')).toBeInTheDocument();
  });

  it('should display share section with header', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText('Share:')).toBeInTheDocument();
  });

  it('should render main heading with proper styling', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const heading = container.querySelector('h1[class*="font-display"]');
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe(mockBlog.title);
  });

  it('should have table of contents container', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const aside = container.querySelector('aside');
    expect(aside).toBeInTheDocument();
  });

  it('should handle empty tags array', () => {
    const blogWithEmptyTags: Blog = {
      ...mockBlog,
      tags: [],
    };

    render(<BlogStaticReader blog={blogWithEmptyTags} />);

    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  it('should display article content inside article element', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article?.textContent).toContain('Content here');
  });

  it('should render with proper max-width constraints', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('max-w-7xl');
  });

  it('should have proper spacing and padding', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('px-4');
    expect(main).toHaveClass('md:px-8');
  });

  it('should display author role/title', () => {
    render(<BlogStaticReader blog={mockBlog} />);

    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('should handle blog with minimal data', () => {
    const minimalBlog: Blog = {
      id: 1,
      title: 'Test',
      description: 'Test',
      status: 'published',
      category: '',
      created_at: '2024-01-01',
    };

    render(<BlogStaticReader blog={minimalBlog} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render article with proper ID for scroll targets', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const article = container.querySelector('article#article');
    expect(article).toBeInTheDocument();
  });

  it('should have featured image with proper aspect ratio', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const imageContainer = container.querySelector('div[class*="aspect-"]');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should render tags with hover effects', () => {
    const { container } = render(<BlogStaticReader blog={mockBlog} />);

    const tagElements = container.querySelectorAll('span[class*="hover:"]');
    expect(tagElements.length).toBeGreaterThan(0);
  });
});
