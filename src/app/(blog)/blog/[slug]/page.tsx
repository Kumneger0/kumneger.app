import React from "react";
import { Metadata } from "next";
import Blog from "./wrapper";
import { getBlogBySlug } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import RelatedArticles from "../../../../components/relatedAtriles/RelatedAtricles";
import Image from "next/image";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";

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
    <div className="flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="h-10 mt-5">
          <Link className="flex gap-1 items-center" href="/blog">
            {" "}
            <FaBackward className="h-7, w-7" />{" "}
            <span className="hover:underline">back to list</span>
          </Link>
        </div>
        <div>
          <img
            width={1000}
            height={6000}
            src={`https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
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
