"use client";

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

interface CommentsProps {
  blogId?: string;
}

const CommentStaticReader = ({ blogId }: CommentsProps) => {
  const { theme } = useTheme();

  if (!blogId) {
    return null;
    }

  return (
    <section className='pb-8'>
      <h3 className="font-display text-3xl text-secondary uppercase mb-8 flex items-center gap-3">
        Comments
      </h3>
      <Giscus
        repo="rosfandy/blog-v2"
        repoId="R_kgDOQx5Mnw"
        category="Comments"
        categoryId="DIC_kwDOQx5Mn84C0cW9"
        mapping="specific"
        term={blogId}
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === 'dark' ? 'dark_dimmed' : 'light_tritanopia'}
        lang="en"
      />
    </section>
  );
};

export default CommentStaticReader;