import React from "react";
import { Metadata } from "next";
import Blog from "./wrapper";
import { getBlogBySlug } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

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
    <div className="w-screen h-[200vh] bg-slate-100 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-bold text-3xl">{params.slug.split(".")[0]}</h1>
        <Blog>{serialized! && serialized}</Blog>
      </div>
    </div>
  );
}

export default Home;
