const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com',

  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',

  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,

  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@yourtwitterhandle',

  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Rosfandy Blog',
  SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal blog and portfolio of Rosfandy, a creative developer and designer',
} as const;

if (typeof window !== 'undefined' || process.env.NODE_ENV === 'production') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_APP_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ] as const;

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`Warning: Missing environment variable: ${envVar}`);
    }
  }
}

export const {
  APP_URL,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  GA_TRACKING_ID,
  TWITTER_HANDLE,
  SITE_NAME,
  SITE_DESCRIPTION,
} = env;

export const SITE_URL = APP_URL;
export const OG_IMAGE_URL = `${APP_URL}/og-default.jpg`;

export const API_ROUTES = {
  BLOGS: '/api/blogs',
  CONTACT: '/api/contact',
} as const;