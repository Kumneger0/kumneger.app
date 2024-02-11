import { getAllBlogsFromCloundnary, getBlogBySlug } from "@/utils/utils";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import Blog from "./wrapper";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap"
});

type TPrams = { params: { slug: string } };

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (await getAllBlogsFromCloundnary()).map(({ asset_id }) => ({
    slug: asset_id
  }));
}

export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  const asset_id = params.slug;
  const { data } = await getBlogBySlug(asset_id);
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
  const { data, content } = await getBlogBySlug(asset_id);
  if (!data || !content) {
    console.log("not found");
    notFound();
  }
  const serialized = content ? await serialize(content) : null;

  const blogTitle =
    data && "title" in data && typeof data.title === "string" ? data.title : "";

  return (
    <div
      className={`dark min-h-screen bg-gray-800 text-white flex items-center justify-center ${openSans.className}`}
    >
      <main className="container max-w-5xl mx-auto px-4  md:px-6 lg:px-8">
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
                Published on: <span className="font-bold">{data.date}</span>
              </p>
              <p>
                Author: <span className="font-bold">{data.author}</span>
              </p>
            </div>
          </div>

          {!!serialized && <Blog>{serialized}</Blog>}
        </section>
      </main>
    </div>
  );
}
