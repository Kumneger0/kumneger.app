"use client";
import React from "react";
import Link from "next/link";
import image from "../../../../../public/R.jpg";
import Image from "next/image";

function Blogs({
  blogs,
}: {
  blogs?: Array<{ title: string; content: string }>;
}) {
  return (
    <div>
      <div className="w-11/12 max-w-6xl mx-auto my-5 font-bold text-xl">
        Welcome to My Blog: Discover insightful articles and valuable resources
        to enhance your knowledge. Stay up-to-date with the latest trends, tips,
        and industry news. Explore a wide range of topics and find inspiration
        for your own writing
      </div>
      <div className="w-11/12 max-w-6xl flex justify-center flex-wrap gap-6 mx-auto">
        {blogs?.map((article, index) => (
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
    </div>
  );
}

export default Blogs;
