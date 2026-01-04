import { render, screen } from '@testing-library/react';
import BlogStaticList from '@/features/blog/components/BlogStaticList';
import { Blog } from '@/features/blog/types/blog.type';

// Mock gsap
jest.mock('gsap', () => ({
  gsap: {
    timeline: jest.fn(() => ({
      fromTo: jest.fn().mockReturnThis(),
    })),
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

describe('BlogStaticList', () => {
  const mockBlogs: Blog[] = [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Learn React basics',
      content: 'Content here',
      status: 'published',
      category: 'Technology',
      created_at: '2024-01-01',
      tags: ['react', 'javascript'],
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      description: 'Master TypeScript',
      content: 'Content here',
      status: 'published',
      category: 'Programming',
      created_at: '2024-01-02',
      tags: ['typescript', 'javascript'],
    },
  ];

  it('should render blog list section', () => {
    const { container } = render(<BlogStaticList blogs={mockBlogs} />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should display blog section title', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('should render all blog posts', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.title)).toBeInTheDocument();
      expect(screen.getByText(blog.description)).toBeInTheDocument();
    });
  });

  it('should display blog categories', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.category)).toBeInTheDocument();
    });
  });

  it('should display formatted dates', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    // Check that dates are formatted (should be "Month Day, Year" format)
    const dateElements = screen.getAllByText(/January|February|March|April|May|June|July|August|September|October|November|December/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('should render read more links for each blog', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    const readMoreButtons = screen.getAllByText('Read more');
    expect(readMoreButtons.length).toBe(mockBlogs.length);
  });

  it('should generate correct blog URLs with slugified title', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    const readMoreButtons = screen.getAllByText('Read more') as HTMLAnchorElement[];
    
    // First blog link should contain slugified title
    expect(readMoreButtons[0].closest('a')?.href).toContain('getting-started-with-react');
    expect(readMoreButtons[0].closest('a')?.href).toContain('1');
  });

  it('should handle empty blog list', () => {
    const { container } = render(<BlogStaticList blogs={[]} />);

    expect(screen.getByText('Blog')).toBeInTheDocument();
    
    // No read more buttons should be rendered
    const readMoreButtons = screen.queryAllByText('Read more');
    expect(readMoreButtons.length).toBe(0);
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<BlogStaticList blogs={mockBlogs} />);

    const header = container.querySelector('div[class*="border-b"]');
    expect(header).toBeInTheDocument();
  });

  it('should display default category when not provided', () => {
    const blogsWithoutCategory: Blog[] = [
      {
        id: 1,
        title: 'Test Blog',
        description: 'Test',
        content: 'Content',
        status: 'published',
        category: '',
        created_at: '2024-01-01',
      },
    ];

    render(<BlogStaticList blogs={blogsWithoutCategory} />);

    // Should show "General" as default
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should use date from blog.date if available', () => {
    const blogsWithDate: Blog[] = [
      {
        id: 1,
        title: 'Test Blog',
        description: 'Test',
        content: 'Content',
        status: 'published',
        category: 'Test',
        created_at: '2024-01-01',
        date: '2024-02-15',
      },
    ];

    render(<BlogStaticList blogs={blogsWithDate} />);

    // Should display the date from blog.date property
    expect(screen.getByText(/February|Feb/)).toBeInTheDocument();
  });

  it('should display blog descriptions', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.description)).toBeInTheDocument();
    });
  });

  it('should handle multiple blogs with different categories', () => {
    const blogsWithCategories: Blog[] = [
      {
        id: 1,
        title: 'Tech Blog',
        description: 'Tech content',
        status: 'published',
        category: 'Technology',
        created_at: '2024-01-01',
      },
      {
        id: 2,
        title: 'Design Blog',
        description: 'Design content',
        status: 'published',
        category: 'Design',
        created_at: '2024-01-02',
      },
    ];

    render(<BlogStaticList blogs={blogsWithCategories} />);

    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('should render with proper link href structure', () => {
    render(<BlogStaticList blogs={mockBlogs} />);

    const links = screen.getAllByRole('link');
    const readMoreLinks = links.filter((link) =>
      link.textContent?.includes('Read more')
    );

    readMoreLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      expect(href).toMatch(/^\/blog\//);
      expect(href).toContain('-');
      expect(href).toContain(mockBlogs[index].id.toString());
    });
  });
});
