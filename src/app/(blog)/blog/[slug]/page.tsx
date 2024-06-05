import ShareButtons from "@/components/socialShare/share";
import { getBlogPosts } from "@/contents/utils";
import { getBlogURLS } from "@/utils/utils";
import Link from "next/link";

export const experimental_ppr = true

type TPrams = { params: { slug: string } };

export async function generateStaticParams() {
  const blogs = await getBlogURLS();
  return blogs.map(({ asset_id }) => ({
    slug: asset_id
  }));
}


// export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
//   const asset_id = params.slug;
//   const { data } = await getBlog(asset_id);
//   return {
//     title: data?.title,
//     description: data?.seoDescription,
//     openGraph: {
//       images: [{ url: `/api/gen-og-images/${data?.title}` }]
//     }
//   };
// }

export default async function BlogSlug({ params }: TPrams) {
  const slug = params.slug;
  const blog = getBlogPosts().find(({ slug: slg }) => slg == slug)

  return (
    <div
      className={`dark min-h-screen bg-gray-800 text-white flex items-center justify-center `}
    >
      <main className="container max-w-5xl mx-auto px-2 sm:px-4  md:px-6 lg:px-8">
        <section className="mt-12">
          <Link className="underline text-blue-400" href="/blog">
            Back to Blog
          </Link>
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

          <div>{blog?.content}</div>
        </section>
        <section className="my-5">
          <div>
            <ShareButtons />
          </div>
        </section>
      </main>
    </div>
  );
}
