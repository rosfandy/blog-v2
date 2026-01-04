import { getBlogs, getBlog } from '@/features/blog/server/blog.server';
import { supabase } from '@/config/supabase';

// Mock the supabase client
jest.mock('@/config/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('blog.server.ts', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogs', () => {
    it('should fetch all blogs and return parsed tags', async () => {
      const mockBlogsData = [
        {
          id: 1,
          title: 'Test Blog 1',
          description: 'Description 1',
          content: 'Content 1',
          status: 'published',
          category: 'tech',
          created_at: '2024-01-01',
          tags: '["react","typescript"]',
          profiles: [
            {
              id: 'user1',
              username: 'johndoe',
              full_name: 'John Doe',
              avatar_url: 'https://example.com/avatar.jpg',
            },
          ],
        },
        {
          id: 2,
          title: 'Test Blog 2',
          description: 'Description 2',
          content: 'Content 2',
          status: 'published',
          category: 'design',
          created_at: '2024-01-02',
          tags: null,
          profiles: [
            {
              id: 'user2',
              username: 'janedoe',
              full_name: 'Jane Doe',
              avatar_url: 'https://example.com/avatar2.jpg',
            },
          ],
        },
      ];

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockOrder = jest.fn().mockResolvedValue({
        data: mockBlogsData,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        order: mockOrder,
      } as any);

      const result = await getBlogs();

      expect(mockSupabase.from).toHaveBeenCalledWith('blogs');
      expect(mockSelect).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith('type', 'blog');
      expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[0].tags).toEqual(['react', 'typescript']);
      expect(result[0].profiles).toEqual(mockBlogsData[0].profiles[0]);
      expect(result[1].tags).toEqual([]);
    });

    it('should handle tags as already parsed array', async () => {
      const mockBlogsData = [
        {
          id: 1,
          title: 'Test Blog',
          description: 'Description',
          tags: ['react', 'nextjs'],
          profiles: [{ id: 'user1', username: 'john' }],
          created_at: '2024-01-01',
          status: 'published',
          category: 'tech',
        },
      ];

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockOrder = jest.fn().mockResolvedValue({
        data: mockBlogsData,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        order: mockOrder,
      } as any);

      const result = await getBlogs();

      expect(result[0].tags).toEqual(['react', 'nextjs']);
    });

    it('should handle blogs without profiles', async () => {
      const mockBlogsData = [
        {
          id: 1,
          title: 'Test Blog',
          description: 'Description',
          tags: null,
          profiles: null,
          created_at: '2024-01-01',
          status: 'published',
          category: 'tech',
        },
      ];

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockOrder = jest.fn().mockResolvedValue({
        data: mockBlogsData,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        order: mockOrder,
      } as any);

      const result = await getBlogs();

      expect(result[0].profiles).toBeUndefined();
      expect(result[0].tags).toEqual([]);
    });

    it('should throw error if fetch fails', async () => {
      const mockError = new Error('Supabase error');

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockOrder = jest
        .fn()
        .mockResolvedValue({ data: null, error: mockError });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        order: mockOrder,
      } as any);

      await expect(getBlogs()).rejects.toThrow('Supabase error');
    });
  });

  describe('getBlog', () => {
    it('should fetch single blog by id and return parsed tags', async () => {
      const mockBlogData = {
        id: 1,
        title: 'Test Blog',
        description: 'Description',
        content: 'Content',
        status: 'published',
        category: 'tech',
        created_at: '2024-01-01',
        tags: '["react","typescript","nextjs"]',
        profiles: [
          {
            id: 'user1',
            username: 'johndoe',
            full_name: 'John Doe',
            avatar_url: 'https://example.com/avatar.jpg',
            bio: 'A developer',
          },
        ],
      };

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: mockBlogData,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        single: mockSingle,
      } as any);

      const result = await getBlog('1');

      expect(mockSupabase.from).toHaveBeenCalledWith('blogs');
      expect(mockEq).toHaveBeenCalledWith('id', '1');
      expect(mockSingle).toHaveBeenCalled();

      expect(result).not.toBeNull();
      expect(result?.id).toBe(1);
      expect(result?.tags).toEqual(['react', 'typescript', 'nextjs']);
    });

    it('should handle tags as already parsed array in getBlog', async () => {
      const mockBlogData = {
        id: 1,
        title: 'Test Blog',
        description: 'Description',
        tags: ['react', 'nextjs'],
        created_at: '2024-01-01',
        status: 'published',
        category: 'tech',
      };

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: mockBlogData,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        single: mockSingle,
      } as any);

      const result = await getBlog('1');

      expect(result?.tags).toEqual(['react', 'nextjs']);
    });

    it('should return null if blog not found', async () => {
      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest
        .fn()
        .mockResolvedValue({ data: null, error: null });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        single: mockSingle,
      } as any);

      const result = await getBlog('999');

      expect(result).toBeNull();
    });

    it('should return null if fetch fails', async () => {
      const mockError = new Error('Supabase error');

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest
        .fn()
        .mockResolvedValue({ data: null, error: mockError });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        single: mockSingle,
      } as any);

      const result = await getBlog('1');

      expect(result).toBeNull();
    });

    it('should handle null tags gracefully', async () => {
      const mockBlogData = {
        id: 1,
        title: 'Test Blog',
        description: 'Description',
        tags: null,
        created_at: '2024-01-01',
        status: 'published',
        category: 'tech',
      };

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: mockBlogData,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      mockSelect.mockReturnValue({
        eq: mockEq,
      } as any);

      mockEq.mockReturnValue({
        single: mockSingle,
      } as any);

      const result = await getBlog('1');

      expect(result?.tags).toEqual([]);
    });
  });
});
