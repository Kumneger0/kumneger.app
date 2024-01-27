import { getAllBlogsFromCloundnary, getBlogBySlug } from "@/utils/utils";
import { Metadata } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";
import Blog from "./wrapper";
import { notFound } from "next/navigation";

type TPrams = { params: { slug: string } };

export const dynamic = "force-static";

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
  const { data, content } = await getBlogBySlug(asset_id);
  if (!data || !content) {
    console.log("not found");
    notFound();
  }
  const serialized = content ? await serialize(content) : null;

  const blogTitle =
    data && "title" in data && typeof data.title === "string" ? data.title : "";

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
        {!!serialized && <Blog>{serialized}</Blog>}
      </div>
    </div>
  );
}

export default Home;
