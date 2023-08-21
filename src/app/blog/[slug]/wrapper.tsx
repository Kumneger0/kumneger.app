"use client";
import Blog from "./blog";
import React from "react";
import SomeBlog from "@/blogs/blog.mdx";

function Wrapper({
  children,
  blog,
}: {
  children: React.ReactNode;
  blog: string;
}) {
  return <Blog blog={blog}>{children}</Blog>;
}

export default Wrapper;
export { SomeBlog };
