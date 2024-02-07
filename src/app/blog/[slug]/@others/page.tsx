import Blogs, { TBlogs } from "@/components/blogs/Blogs";
import {
  getAllBlogsFromCloundnary,
  getSampleRelatedArticles
} from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (await getAllBlogsFromCloundnary()).map(({ asset_id }) => ({
    slug: asset_id
  }));
}

async function Page({ params }: { params: { slug: string } }) {
  const blogs = await getSampleRelatedArticles(params.slug, 3);
  const serializedBlog = await Promise.all<TBlogs[]>(
    blogs?.map(async ({ title, content, data }) => ({
      title: data.title,
      content: await serialize(content.slice(0, 200)),
      data
    })) as unknown as TBlogs[]
  );

  return (
    <div className="space-y-4  sm:ml-auto  mt-12 max-w-6xl w-full  mx-auto">
      <h2 className="text-2xl font-bold w-full text-center">
        Related Articles
      </h2>
      {/* @ts-ignore */}
      <ul className="flex flex-col items-center">
        {/* @ts-ignore */}
        <Blogs className="justify-around" blogs={serializedBlog} />
      </ul>
    </div>
  );
}

export default Page;
