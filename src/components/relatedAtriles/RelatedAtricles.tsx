import Blogs from "@/app/(blog)/blog/allPosts/Blogs";
import { getSampleRelatedArticles } from "@/utils/utils";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import React from "react";

const RelatedArticles = async ({
  currentArticle,
}: {
  currentArticle: string;
}) => {
  const sampleArticles = await getSampleRelatedArticles(currentArticle, 3);

  type BlogsType = {
    title: string;
    content: MDXRemoteSerializeResult;
  };

  const serializedBlog = await Promise.all<BlogsType[]>(
    sampleArticles?.map(async ({ title, content }) => ({
      title,
      content: await serialize(content.slice(0, 200)),
    })) as unknown as BlogsType[]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Articles</h2>
      <Blogs blogs={serializedBlog} />
    </div>
  );
};
export default RelatedArticles;
