import { getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import React from "react";

const RelatedArticles = async ({
  currentArticle,
}: {
  currentArticle: string;
}) => {
  const sampleArticles = await getSampleRelatedArticles(currentArticle);
  console.log(sampleArticles);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Articles</h2>
      {sampleArticles?.map((article, index) => (
        <div key={index} className="p-4 border rounded-md">
          <h3 className="text-xl font-semibold">
            {article.title.replaceAll("-", " ")}
          </h3>
          <p className="text-white line-clamp-2 my-2">{article.content}</p>
          <Link
            href={`/blog/${article.title}`}
            className="text-blue-500 hover:underline">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};
export default RelatedArticles;
