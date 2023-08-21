"use client";
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { compileSync } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types.js";
import { Heading, Paragraph, Code } from "../components/components";
import Blog1 from "@/blogs/blog.mdx";
import Blog2 from "@/blogs/blog2.mdx";
import Blog3 from "@/blogs/blog3.mdx";
import Blog4 from "@/blogs/blog4.mdx";
import Blog5 from "@/blogs/blog5.mdx";

const blogs = {
  blog: Blog1,
  blog2: Blog2,
  blog3: Blog3,
  blog4: Blog4,
  blog5: Blog5,
};

const components = {
  h1: Heading,
  p: Paragraph,
  code: Code,
} as MDXComponents;

function Blog({ children, blog }: { children: React.ReactNode; blog: string }) {
  console.log(blog);
  const SelectedBlog = blogs[blog as keyof typeof blogs];
  const Complied = compileSync(children as string);
  return (
    <div className="max-w-5xl max-[900px]:w-11/12 mx-auto">
      <MDXProvider components={components}>
        <SelectedBlog />
      </MDXProvider>
    </div>
  );
}

export default Blog;
