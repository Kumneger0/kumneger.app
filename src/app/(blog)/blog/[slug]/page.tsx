import { getBlogURLS, getBlogBySlug } from "@/utils/utils";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import Blog from "./wrapper";
import { unstable_cache } from "next/cache";
import ShareButtons from "@/components/socialShare/share";

export const experimental_ppr = true

const getBlog = unstable_cache((asset_id: string) => getBlogBySlug(asset_id), [], {
        revalidate: false
      })
 

type TPrams = { params: { slug: string } };

export async function generateStaticParams() {
  const blogs = await getBlogURLS();
  return blogs.map(({ asset_id }) => ({
    slug: asset_id
  }));
}


export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  const asset_id = params.slug;
  const { data } = await getBlog(asset_id);
  return {
    title: data?.title,
    description: data?.seoDescription,
    openGraph: {
      images: [{ url: `/api/gen-og-images/${data?.title}` }]
    }
  };
}

export default async function BlogSlug({ params }: TPrams) {
  const asset_id = params.slug;
  const { data, content } = await getBlog(asset_id);

  const serialized = content ? await serialize(content) : null;

  const blogTitle =
    data && "title" in data && typeof data.title === "string" ? data.title : "";

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
            {blogTitle}
          </h1>

          <div>
            <img
              width={1000}
              height={6000}
              src={`/api/gen-og-images/${blogTitle}`}
              alt="header"
            />
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="text-gray-400">
              <p>
                Published on:{" "}
                <span className="font-bold" suppressHydrationWarning>
                  {data?.date}
                </span>
              </p>
              <p>
                Author: <span className="font-bold">{data?.author}</span>
              </p>
            </div>
          </div>

          {!!serialized && <Blog>{serialized}</Blog>}
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
