import { render, screen, fireEvent } from '@testing-library/react';
import WorkStaticList, { Project } from '@/features/work/components/WorkStaticList';

// Mock gsap
jest.mock('gsap', () => ({
  gsap: {
    registerPlugin: jest.fn(),
    fromTo: jest.fn().mockReturnThis(),
  },
}));

// Mock gsap/ScrollTrigger
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    getAll: jest.fn(() => []),
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

describe('WorkStaticList', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      category: ['web', 'frontend'],
      year: 2024,
      description: ['Built a modern e-commerce platform', 'Integrated payment processing'],
      techStack: ['React', 'TypeScript', 'Tailwind'],
      thumbnail: '/images/project1.jpg',
    },
    {
      id: '2',
      title: 'Mobile App',
      category: ['mobile', 'cross-platform'],
      year: 2023,
      description: ['Developed a cross-platform mobile app', 'Real-time synchronization'],
      techStack: ['React Native', 'Firebase', 'Redux'],
      thumbnail: '/images/project2.jpg',
    },
  ];

  it('should render work list main section', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should display work section title', () => {
    render(<WorkStaticList projects={mockProjects} />);

    expect(screen.getByText('JOURNEY')).toBeInTheDocument();
    expect(screen.getByText('WORK')).toBeInTheDocument();
  });

  it('should render all projects', () => {
    render(<WorkStaticList projects={mockProjects} />);

    mockProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('should display project categories', () => {
    render(<WorkStaticList projects={mockProjects} />);

    expect(screen.getByText('web')).toBeInTheDocument();
    expect(screen.getByText('mobile')).toBeInTheDocument();
  });

  it('should display project years', () => {
    render(<WorkStaticList projects={mockProjects} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should display all project descriptions', () => {
    render(<WorkStaticList projects={mockProjects} />);

    expect(screen.getByText('Built a modern e-commerce platform')).toBeInTheDocument();
    expect(screen.getByText('Integrated payment processing')).toBeInTheDocument();
  });

  it('should render visit buttons for each project', () => {
    render(<WorkStaticList projects={mockProjects} />);

    const visitButtons = screen.getAllByText('Visit');
    expect(visitButtons.length).toBe(mockProjects.length);
  });

  it('should display tech stack for projects', () => {
    render(<WorkStaticList projects={mockProjects} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
  });

  it('should display tech stack header', () => {
    render(<WorkStaticList projects={mockProjects} />);

    const techHeaders = screen.getAllByText('Tech Stack');
    expect(techHeaders.length).toBe(mockProjects.length);
  });

  it('should render project images with alt text', () => {
    render(<WorkStaticList projects={mockProjects} />);

    const images = screen.getAllByAltText(/E-Commerce Platform|Mobile App/);
    expect(images.length).toBe(mockProjects.length);
  });

  it('should handle empty projects list', () => {
    render(<WorkStaticList projects={[]} />);

    expect(screen.getByText('JOURNEY')).toBeInTheDocument();
    expect(screen.getByText('WORK')).toBeInTheDocument();

    const visitButtons = screen.queryAllByText('Visit');
    expect(visitButtons.length).toBe(0);
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('flex-grow');
    expect(main).toHaveClass('w-full');
  });

  it('should render articles for each project', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(mockProjects.length);
  });

  it('should display multiple descriptions per project', () => {
    render(<WorkStaticList projects={mockProjects} />);

    // First project should have both descriptions
    expect(screen.getByText('Built a modern e-commerce platform')).toBeInTheDocument();
    expect(screen.getByText('Integrated payment processing')).toBeInTheDocument();

    // Second project should have its descriptions
    expect(screen.getByText('Developed a cross-platform mobile app')).toBeInTheDocument();
    expect(screen.getByText('Real-time synchronization')).toBeInTheDocument();
  });

  it('should have hover states on project items', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const articles = container.querySelectorAll('article[class*="hover"]');
    expect(articles.length).toBe(mockProjects.length);
  });

  it('should render with proper grid layout for project content', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const grids = container.querySelectorAll('.grid');
    expect(grids.length).toBeGreaterThan(0);
  });

  it('should display project titles with proper styling', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const titles = container.querySelectorAll('h2');
    expect(titles.length).toBeGreaterThan(0);

    titles.forEach((title) => {
      expect(title).toHaveClass('font-display');
    });
  });

  it('should render category badges with styling', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const categoryBadges = container.querySelectorAll('span[class*="bg-black"]');
    expect(categoryBadges.length).toBe(mockProjects.length);
  });

  it('should handle projects with multiple categories', () => {
    const projectsWithCategories: Project[] = [
      {
        ...mockProjects[0],
        category: ['web', 'frontend', 'design'],
      },
    ];

    render(<WorkStaticList projects={projectsWithCategories} />);

    expect(screen.getByText('web')).toBeInTheDocument();
  });

  it('should display all tech stack items separately', () => {
    render(<WorkStaticList projects={mockProjects} />);

    const techItems = screen.getByText('Tailwind');
    expect(techItems).toBeInTheDocument();
  });

  it('should have proper spacing and layout structure', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const sections = container.querySelectorAll('div[class*="gap"]');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should render divider line at the bottom', () => {
    const { container } = render(<WorkStaticList projects={mockProjects} />);

    const divider = container.querySelector('div[class*="h-px"]');
    expect(divider).toBeInTheDocument();
  });

  it('should display project images with correct source', () => {
    render(<WorkStaticList projects={mockProjects} />);

    const images = screen.getAllByRole('img') as HTMLImageElement[];
    const projectImages = images.filter((img) => img.src && img.src.includes('project'));

    expect(projectImages.length).toBeGreaterThan(0);
  });
});
