import { slugify } from '@/utils/slugify';

describe('slugify', () => {
  it('should convert text to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('should remove colons', () => {
    expect(slugify('Hello: World')).toBe('hello-world');
  });

  it('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('should replace multiple spaces with single hyphen', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('should trim whitespace from start and end', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(slugify('hello@world#123')).toBe('hello-world-123');
  });

  it('should handle dots and dashes', () => {
    expect(slugify('hello-world.test')).toBe('hello-world-test');
  });

  it('should handle numbers', () => {
    expect(slugify('React 19 Tutorial')).toBe('react-19-tutorial');
  });

  it('should handle mixed special characters', () => {
    expect(slugify('Hello! @World #123 $Test')).toBe('hello-world-123-test');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(slugify('-hello-world-')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('should handle only whitespace', () => {
    expect(slugify('   ')).toBe('');
  });

  it('should handle text with only special characters and colons', () => {
    expect(slugify('::!@#$%')).toBe('');
  });

  it('should handle real-world blog title examples', () => {
    expect(slugify('Getting Started: React 19 Best Practices')).toBe(
      'getting-started-react-19-best-practices'
    );
  });

  it('should handle text with multiple consecutive colons', () => {
    expect(slugify('Hello:::World')).toBe('helloworld');
  });

  it('should handle underscores', () => {
    expect(slugify('hello_world_test')).toBe('hello-world-test');
  });

  it('should handle parentheses', () => {
    expect(slugify('Hello (World) Test')).toBe('hello-world-test');
  });

  it('should handle brackets', () => {
    expect(slugify('Hello [World] Test')).toBe('hello-world-test');
  });

  it('should handle curly braces', () => {
    expect(slugify('Hello {World} Test')).toBe('hello-world-test');
  });

  it('should handle slashes', () => {
    expect(slugify('Hello / World / Test')).toBe('hello-world-test');
  });

  it('should handle backslashes', () => {
    expect(slugify('Hello \\ World \\ Test')).toBe('hello-world-test');
  });

  it('should handle quotes', () => {
    expect(slugify('Hello "World" Test')).toBe('hello-world-test');
  });

  it('should handle apostrophes', () => {
    expect(slugify("It's a beautiful day")).toBe('it-s-a-beautiful-day');
  });

  it('should handle ampersands', () => {
    expect(slugify('Cats & Dogs')).toBe('cats-dogs');
  });

  it('should handle equals signs', () => {
    expect(slugify('Test = Value')).toBe('test-value');
  });

  it('should handle plus signs', () => {
    expect(slugify('TypeScript + React')).toBe('typescript-react');
  });

  it('should handle percent signs', () => {
    expect(slugify('100% Complete')).toBe('100-complete');
  });
});
