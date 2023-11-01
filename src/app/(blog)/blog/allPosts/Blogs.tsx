"use client";
import React from "react";
import Link from "next/link";
import image from "../../../../../public/R.jpg";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { components } from "../[slug]/blog";
import { serialize } from "next-mdx-remote/serialize";
import { Button } from "@/components/ui/button"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




type BlogsType = {
  title: string;
  content: MDXRemoteSerializeResult;
};

function Blogs({ blogs }: { blogs?: Array<BlogsType> }) {
  return (
    <div className="max-w-11/12 max-[400px]:w-[300px]">
      <div className="w-full max-w-6xl flex justify-center flex-wrap gap-2 mx-auto">
        {blogs?.map(({ title, content }, index) => (

          <Card className="w-[350px] p-2 shadow-sm shadow-gray-600 rounded-xl">
            <CardHeader className="p-2">
              <CardTitle className="capitalize">{title}</CardTitle>

              <CardDescription>
                <div>kumneger wondimu</div>
                <div>{new Date().toDateString()}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className='p-2 line-clamp-3'>
              <MDXRemote {...content} components={components} />
            </CardContent>
            <CardFooter className="p-1 w-full flex justify-center">
              <Button className='bg-gray-800 hover:bg-gray-600 rounded-lg'>
                <Link href={`/blog/${title}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Blogs;


const ShowSampleBlog = ({
  blogSampleContent,
}: {
  blogSampleContent: MDXRemoteSerializeResult;
}) => {
  return <MDXRemote {...blogSampleContent} components={components} />;
};