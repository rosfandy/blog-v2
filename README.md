# Portfolio Website

A modern portfolio website with blog functionality, built using Next.js.

## 📋 Overview

This is a full-stack web application featuring:
- **Blog System** with rich text editing capabilities
- **Responsive Design** with dark mode support
- **SEO Optimized** pages

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── auth/                     # Authentication pages (login)
│   │   ├── blog/                     # Blog pages ([id], page.tsx)
│   │   ├── dashboard/                # Admin dashboard pages
│   │   │   ├── analytics/            # Analytics page
│   │   │   ├── blogs/                # Blog management
│   │   │   ├── comments/             # Comments management
│   │   │   ├── media/                # Media library
│   │   │   └── settings/             # Site settings
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   ├── components/                   # Reusable UI components
│   │   ├── fragments/                # Page sections (Header, Sidebar, etc.)
│   │   ├── layouts/                  # Layout components
│   │   ├── provider/                 # Context providers
│   │   ├── ui/                       # Basic UI components
│   │   └── index.ts                  # Component exports
│   ├── config/                       # Configuration files
│   │   └── supabase.ts               # Supabase client setup
│   ├── features/                     # Feature-based modules
│   │   ├── blog/                     # Blog functionality
│   │   │   ├── components/           # Blog-specific components
│   │   │   │   ├── BlogStaticReader.tsx
│   │   │   │   ├── Comments.tsx
│   │   │   │   ├── RelatedPosts.tsx
│   │   │   │   └── blogreader.css
│   │   │   └── hook/                 # Blog hooks (useBlog.ts)
│   │   ├── comments/                 # Comments feature
│   ├── hooks/                        # Custom React hooks
├── public/                           # Static assets (images, icons)
├── package.json                      # Dependencies and scripts
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint config
└── README.md                         # This file
```

## 🎯 Key Features

### Blog System
- Dynamic table of contents generation
- Rich text content with TipTap editor
- Comments and social sharing

## 🔧 Architecture

The project follows a feature-based architecture with:
- **Components**: Reusable UI elements
- **Features**: Self-contained business logic modules
- **Hooks**: Custom React hooks for data fetching and logic
- **Pages**: Next.js App Router pages
- **Utils**: Helper functions and utilities

## 📱 Responsive & Accessible

- Mobile-first responsive design
- Dark/light mode support
- Accessible components and navigation
- Optimized for performance

---

Built with Next.js and modern web technologies.
