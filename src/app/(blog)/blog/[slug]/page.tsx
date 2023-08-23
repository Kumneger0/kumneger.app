import React from "react";
import { Metadata } from "next";
import Blog from "./wrapper";
import { getBlogBySlug } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";

type TPrams = { params: { slug: string } };

export async function generateMetadata({ params }: TPrams): Promise<Metadata> {
  await new Promise((res) => setTimeout(res, 1000));
  return {
    title: params.slug.split(".")[0],
    description: params?.slug,
  };
}

async function Home({ params }: TPrams) {
  const blog = getBlogBySlug(`${params.slug}`);
  let serialized: MDXRemoteSerializeResult | null = null;
  if (typeof blog == "string") {
    serialized = await serialize(blog);
  }
  return (
    <div className="w-screen">
      <div className="max-w-5xl mx-auto">
        <div className="h-10"></div>
        <div>
          <Image
            width={1000}
            height={6000}
            src="/api/gen-og-images/sample image using og"
            alt="header Image"
          />
        </div>
        <div>
          <h1 className="font-bold text-3xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem,
            cupiditate.
          </h1>
        </div>

        <Blog>{serialized! && serialized}</Blog>
      </div>
    </div>
  );
}

export default Home;
