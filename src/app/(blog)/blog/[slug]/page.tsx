import Comments from "@/components/comments";
import { getAllBlogsFromCloundnary, getBlogBySlug } from "@/utils/utils";
import { Metadata } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";
import RelatedArticles from "../../../../components/relatedAtriles/RelatedAtricles";
import Blog from "./wrapper";
import { Suspense } from "react";

type TPrams = { params: { slug: string } };

export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  const blogDetail = await getBlogBySlug(params.slug);
  const { data } = blogDetail as { data: Record<string, string> };
  return {
    title: data.title,
    authors: { name: data.author },
    openGraph: {
      images: [{ url: `/api/gen-og-images/${data.title}` }]
    }
  };
}

export async function generateStaticParams() {
  return (await getAllBlogsFromCloundnary()).map(({ asset_id }) => ({
    slug: asset_id
  }));
}

async function Home({ params }: TPrams) {
  const asset_id = params.slug;
  const { data, content } = (await getBlogBySlug(asset_id)) as {
    content: string;
    data: {
      asset_id: string;
      date: string;

      author: string;
    };
  };

  let serialized: MDXRemoteSerializeResult | null = null;
  if (typeof content === "string") {
    serialized = await serialize(content);
  }

  const blogTitle =
    "title" in data && typeof data.title === "string" ? data.title : "";

  return (
    <div className="flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="h-10 mt-5">
          <Link className="flex gap-1 items-center" href="/blog">
            <FaBackward className="h-7, w-7" />
            <span className="hover:underline">back to list</span>
          </Link>
        </div>
        <div className="my-2">
          <div className="font-bold text-lg">{data?.author}</div>
          <div>{data?.date}</div>
        </div>
        <div>
          <img
            width={1000}
            height={6000}
            src={`/api/gen-og-images/${blogTitle}`}
            alt="header"
          />
        </div>
        <div>
          <h1 className="font-bold text-3xl mt-5">{blogTitle}</h1>
        </div>

        <Blog>
          {serialized
            ? serialized
            : (null as unknown as MDXRemoteSerializeResult)}
        </Blog>
        <Comments asset_id={asset_id} />
        <div className="h-10" />
        <RelatedArticles currentArticle={params.slug} />
        <div className="h-10" />
      </div>
    </div>
  );
}

export default Home;
