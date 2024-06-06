import ShareButtons from "@/components/socialShare/share";
import { getBlogPosts } from "@/contents/utils";
import { BlogBlog } from '@/routes';

import Blog from "@/components/blog";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";


export const experimental_ppr = true

type TPrams = { params: { slug: string } };

export async function generateStaticParams() {
  const blogs = getBlogPosts()
  return blogs.map(({ slug }) => ({
    slug
  }));
}


export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  const slug = params.slug;
  const blog = getBlogPosts().find(({ slug: slg }) => slg == slug)
  return {
    title: blog?.metadata.title,
    description: blog?.metadata.summary,
    openGraph: {
      images: [{ url: `/api/gen-og-images/${blog?.metadata.title}` }],
      url: `/blog${blog?.slug}`
    }
  };
}

export default async function BlogSlug({ params }: TPrams) {
  const slug = params.slug;
  const blog = getBlogPosts().find(({ slug: slg }) => slg == slug)


  if (!blog?.content) {
    throw new Error('Opps we somethign wrong in our side')
  }

  const content = await serialize(blog?.content)



  return (
    <div
      className={`dark min-h-screen bg-gray-800 text-white flex items-center justify-center `}
    >
      <main className="container max-w-5xl mx-auto px-2 sm:px-4  md:px-6 lg:px-8">
        <section className="mt-12">
          <BlogBlog.Link>
            Back to Blog
          </BlogBlog.Link>
          <h1 className="text-2xl py-3 md:text-3xl font-bold text-center mt-6">
            {blog?.metadata.title}
          </h1>

          <div>
            <img
              width={1000}
              height={6000}
              src={`/api/gen-og-images/${encodeURIComponent(blog?.metadata.title as string)}`}
              alt="header"
            />
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="text-gray-400">
              <p>
                Published on:{" "}
                <span className="font-bold" suppressHydrationWarning>
                  {blog?.metadata.publishedAt}
                </span>
              </p>
              <p>
                Author: <span className="font-bold">{''}</span>
              </p>
            </div>
          </div>
        </section>
        <Blog blogContent={content} />
        <section className="my-5">
          <div>
            <ShareButtons />
          </div>
        </section>
      </main>
    </div>
  );
}
