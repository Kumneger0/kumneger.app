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
    <div className="max-w-11/12 max-[400px]:w-[300px]">
      <div className="w-11/12 max-w-6xl mx-auto my-5 font-bold text-xl">
        Latest Articles
      </div>
      <div className="w-11/12 max-w-6xl flex justify-center flex-wrap gap-6 mx-auto">
        {blogs?.map((article, index) => (
          <div
            key={index}
            className="p-4 border rounded-md min-w-[90%] max-w-full mx-auto max-[400]:-ml-10">
            <h3 className="text-xl font-semibold">
              {article.title.replaceAll("-", " ")}
            </h3>
            <p className="text-white w-[95%] line-clamp-2 my-2">
              {article.content.slice(0, 200)}
            </p>
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
