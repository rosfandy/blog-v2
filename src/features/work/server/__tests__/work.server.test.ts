import { getProjects, getProjectById } from '@/features/work/server/work.server';
import { supabase } from '@/config/supabase';

// Mock the supabase client
jest.mock('@/config/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('work.server.ts', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProjects', () => {
    it('should fetch all projects and return parsed tags', async () => {
      const mockProjectsData = [
        {
          id: 1,
          title: 'E-commerce Platform',
          description: 'Full-stack e-commerce application',
          content: 'Content',
          status: 'published',
          category: 'web',
          type: 'project',
          created_at: '2024-01-01',
          tags: '["react","nextjs","typescript"]',
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
          title: 'Mobile App',
          description: 'React Native mobile app',
          content: 'Content',
          status: 'published',
          category: 'mobile',
          type: 'project',
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
        data: mockProjectsData,
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

      const result = await getProjects();

      expect(mockSupabase.from).toHaveBeenCalledWith('blogs');
      expect(mockSelect).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith('type', 'project');
      expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[0].tags).toEqual(['react', 'nextjs', 'typescript']);
      expect(result[0].profiles).toEqual(mockProjectsData[0].profiles[0]);
      expect(result[1].tags).toEqual([]);
    });

    it('should handle tags as already parsed array', async () => {
      const mockProjectsData = [
        {
          id: 1,
          title: 'Test Project',
          description: 'Description',
          type: 'project',
          tags: ['web', 'design'],
          profiles: [{ id: 'user1', username: 'john' }],
          created_at: '2024-01-01',
          status: 'published',
          category: 'web',
        },
      ];

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockOrder = jest.fn().mockResolvedValue({
        data: mockProjectsData,
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

      const result = await getProjects();

      expect(result[0].tags).toEqual(['web', 'design']);
    });

    it('should handle projects without profiles', async () => {
      const mockProjectsData = [
        {
          id: 1,
          title: 'Test Project',
          description: 'Description',
          type: 'project',
          tags: null,
          profiles: null,
          created_at: '2024-01-01',
          status: 'published',
          category: 'web',
        },
      ];

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockOrder = jest.fn().mockResolvedValue({
        data: mockProjectsData,
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

      const result = await getProjects();

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

      await expect(getProjects()).rejects.toThrow('Supabase error');
    });
  });

  describe('getProjectById', () => {
    it('should fetch single project by id and return parsed tags', async () => {
      const mockProjectData = {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce application',
        content: 'Content',
        status: 'published',
        category: 'web',
        type: 'project',
        created_at: '2024-01-01',
        tags: '["react","nextjs","typescript"]',
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
        data: mockProjectData,
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

      const result = await getProjectById('1');

      expect(mockSupabase.from).toHaveBeenCalledWith('blogs');
      expect(mockEq).toHaveBeenCalledWith('id', '1');
      expect(mockSingle).toHaveBeenCalled();

      expect(result).not.toBeNull();
      expect(result?.id).toBe(1);
      expect(result?.tags).toEqual(['react', 'nextjs', 'typescript']);
    });

    it('should handle tags as already parsed array in getProjectById', async () => {
      const mockProjectData = {
        id: 1,
        title: 'Test Project',
        description: 'Description',
        type: 'project',
        tags: ['web', 'design'],
        created_at: '2024-01-01',
        status: 'published',
        category: 'web',
      };

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: mockProjectData,
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

      const result = await getProjectById('1');

      expect(result?.tags).toEqual(['web', 'design']);
    });

    it('should return null if project not found', async () => {
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

      const result = await getProjectById('999');

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

      const result = await getProjectById('1');

      expect(result).toBeNull();
    });

    it('should handle null tags gracefully', async () => {
      const mockProjectData = {
        id: 1,
        title: 'Test Project',
        description: 'Description',
        type: 'project',
        tags: null,
        created_at: '2024-01-01',
        status: 'published',
        category: 'web',
      };

      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: mockProjectData,
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

      const result = await getProjectById('1');

      expect(result?.tags).toEqual([]);
    });
  });
});
