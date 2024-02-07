import { getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import React from "react";

async function PublishedArticles() {
  const articles = (await getSampleRelatedArticles())
    .map(({ data }) => ({
      title: data.title,
      description: data.seoDescription,
      assetId: data.asset_id
    }))
    .slice(0, 3);
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">Published Articles</h2>
      <ul className="list-inside list-none max-w-4xl mt-4 text-lg text-gray-300 space-y-4">
        {articles.map(({ title, description, assetId }) => (
          <li>
            <Link
              className="underline text-2xl py-3 my-3 text-blue-400 font-bold"
              href={`/blog/${assetId}`}
            >
              {title}
            </Link>
            <p>{description}</p>
          </li>
        ))}
      </ul>
      <Link
        className="text-blue-400 underline my-5 font-bold text-2xl py-5"
        href="/blog"
      >
        View all articles
      </Link>
    </section>
  );
}

export default PublishedArticles;
