import React from "react";
import { getAllBlogs } from "@/utils/utils";
import Link from "next/link";
import Blogs from "./allPosts/Blogs";

async function Home() {
  const blogs = await getAllBlogs()
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Blogs blogs={blogs} />
    </div>
  );
}

export default Home;
