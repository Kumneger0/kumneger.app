import { getBlogBySlug, getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Blogs, { AllBlogs } from "../blogs/Blogs";

const pinedArticleSlugs = ["0934bbabf5a7dc408f680b7ad5c9558d"];

async function PublishedArticles() {
  const articles = (await getSampleRelatedArticles())
    .filter(({ data: { asset_id } }) => !pinedArticleSlugs.includes(asset_id))
    .slice(0, 3);

  const pinnedArticles = (
    await Promise.all(
      pinedArticleSlugs.map(async (id) => await getBlogBySlug(id))
    )
  ).filter(({ data, content }) => !!data && !!content) as Array<
    (typeof articles)[number]
  >;

  return (
    <section className="mt-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold capitalize">
        Some of My Recent Articles
      </h2>
      <ul className="list-inside list-none  my-4 text-lg text-gray-300 space-y-4">
        <Blogs
          className="bg-gray-700 rounded-xl  w-full min-w-[300px]"
          blogs={[...pinnedArticles, ...articles]}
        />
      </ul>
      <Link
        className="text-blue-400 mt-12 underline my-5 font-bold text-2xl"
        href="/blog"
      >
        <Button className="text-lg" variant={"link"}>
          {" "}
          View all articles
        </Button>
      </Link>
    </section>
  );
}

export default PublishedArticles;
