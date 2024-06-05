import { getBlogPosts } from '@/contents/utils';
import { BlogBlogSlug } from '@/routes'


export const dynamic = "force-static";

export default async function Home() {
  const blogs = getBlogPosts()

  return (
    <div className="dark min-h-screen bg-gray-800 text-white flex flex-col">
      <main className="mx-auto px-4 mt-12 md:px-6 lg:px-8 flex-1 overflow-y-auto">
        <div className="font-bold text-2xl">Lastest Posts</div>
        <section className="">
          <ul className="flex flex-col items-center space-y-4">
            {blogs.map(({ slug, content, metadata }) => (
              <li className="p-4 transition duration-300 ease-in-out">
                <BlogBlogSlug.Link slug={slug}>
                  <h3 className="text-xl font-semibold mb-2 hover:decoration-dashed hover:cursor-pointer" >{metadata.title}</h3>
                </BlogBlogSlug.Link>
                <p className="text-sm">{metadata.publishedAt}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>

  );
}
