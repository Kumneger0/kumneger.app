import React from "react";
import { Metadata } from "next";
import Blog from "./wrapper";
import { getBlogBySlug } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import RelatedArticles from "../../../../components/relatedAtriles/RelatedAtricles";
import Image from "next/image";

type TPrams = { params: { slug: string } };

export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  await new Promise((res) => setTimeout(res, 1000));
  return {
    title: params.slug.split(".")[0],
    description: params?.slug,
    openGraph: {
      images: [
        { url: `/api/gen-og-images/${params.slug.replaceAll("-", " ")}` },
      ],
    },
  };
}

async function Home({ params }: TPrams) {
  const slug = params.slug.replaceAll("%20", " ").concat(".mdx");

  const blog = getBlogBySlug(slug);
  let serialized: MDXRemoteSerializeResult | null = null;
  if (typeof blog == "string") {
    serialized = await serialize(blog);
  }
  return (
    <div className="w-screen">
      <div className="max-w-5xl w-11/12 mx-auto">
        <div className="h-10"></div>
        <div>
          <Image
            width={1000}
            height={6000}
            src={`/api/gen-og-images/${params.slug.replaceAll("-", " ")}`}
            alt="header Image"
          />
        </div>
        <div>
          <h1 className="font-bold text-3xl mt-5">
            {slug.split(".")[0].replaceAll("-", " ")}
          </h1>
        </div>

        <Blog>{serialized! && serialized}</Blog>
        <div className="h-10"></div>
        <RelatedArticles currentArticle={slug} />
        <div className="h-10"></div>
      </div>
    </div>
  );
}

export default Home;
