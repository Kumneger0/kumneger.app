"use client";
import Blog from "./blog";
import React from "react";
import SomeBlog from "@/blogs/blog.mdx";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Blog>{children}</Blog>;
}

export default Wrapper;
export { SomeBlog };
