import Blogs from "@/components/blogs/Blogs";
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

  return (
    <div className="space-y-4  sm:ml-auto  mt-12 max-w-6xl w-full  mx-auto">
      <h2 className="text-2xl font-bold w-full text-center">
        Related Articles
      </h2>
      {/* @ts-ignore */}
      <ul className="flex flex-col items-center">
        <Blogs className="bg-gray-700 rounded-xl" blogs={blogs} />
      </ul>
    </div>
  );
}

export default Page;
