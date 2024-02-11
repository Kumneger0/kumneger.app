import { getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Blogs, { AllBlogs } from "../blogs/Blogs";

async function PublishedArticles() {
  const articles = (await getSampleRelatedArticles()).slice(0, 3);

  

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold capitalize">Some of My Recent Articles</h2>
      <ul className="list-inside list-none max-w-3xl my-4 text-lg text-gray-300 space-y-4">
        <Blogs className="bg-gray-700 rounded-xl" blogs={articles as unknown as AllBlogs } />
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
