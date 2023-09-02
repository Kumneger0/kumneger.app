import React from "react";
import { getAllBlogs, getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import Blogs from "./allPosts/Blogs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

async function Home() {
  const blogs = await getSampleRelatedArticles();

  type BlogsType = {
    title: string;
    content: MDXRemoteSerializeResult;
  };

  const serializedBlog = await Promise.all<BlogsType[]>(
    blogs?.map(async ({ title, content }) => ({
      title,
      content: await serialize(content.slice(0, 200)),
    })) as unknown as BlogsType[]
  );

  return (
    <div className="w-11/12 mx-auto flex min-h-screen flex-col items-center justify-between p-5">
      <Blogs blogs={serializedBlog} />
    </div>
  );
}

export default Home;
