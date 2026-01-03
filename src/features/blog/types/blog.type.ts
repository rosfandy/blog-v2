
export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  content?: string;
  status: string;
  category: string;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  date?: string;
  thumbnail?: string;
  author_id?: string;
  profiles?: Profile;
}