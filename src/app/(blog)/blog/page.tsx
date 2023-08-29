import React from "react";
import { getAllBlogs, getSampleRelatedArticles } from "@/utils/utils";
import Link from "next/link";
import Blogs from "./allPosts/Blogs";

async function Home() {
  const blogs = await getSampleRelatedArticles();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      <Blogs blogs={blogs} />
    </div>
  );
}

export default Home;
