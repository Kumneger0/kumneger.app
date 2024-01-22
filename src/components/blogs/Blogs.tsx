"use client";
import { Button } from "@/components/ui/button";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { components } from "../../app/(blog)/blog/[slug]/blog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export type TBlogs = {
  title: string;
  content: MDXRemoteSerializeResult;
  data: {
    title: string;
    author: string;
    date: string;
    year: number;
    month: number;
    day: number;
    asset_id: string;
  };
}[];

function Blogs({ blogs, className }: { blogs?: TBlogs; className: string }) {
  return (
    <div className="max-w-11/12  max-[400px]:w-[300px]">
      <div
        className={twMerge(
          className,
          "w-full max-w-6xl flex  flex-wrap gap-5 mx-auto"
        )}
      >
        {blogs?.map(({ title, content, data }, index) => {
          const blogCOntent = content as unknown as MDXRemoteSerializeResult;
          return (
            <Card className="w-[350px] min-w-[350px] max-[330px]:max-w-[310px] p-2 shadow-sm border-[0.2px] border-gray-600 shadow-gray-600 rounded-xl">
              <CardHeader className="p-2">
                <CardTitle className="capitalize">{data?.title}</CardTitle>
                <CardDescription>
                  <div>{(data.author as string) || ""}</div>
                  <div>{(data.date as string) || ""}</div>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 line-clamp-3">
                <MDXRemote {...blogCOntent} components={components} />
              </CardContent>
              <CardFooter className="p-1 w-full flex justify-center">
                <Button className="bg-gray-800 hover:bg-gray-600 rounded-lg">
                  <Link scroll={true} href={`/blog/${data.asset_id}`}>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Blogs;

const ShowSampleBlog = ({
  blogSampleContent
}: {
  blogSampleContent: MDXRemoteSerializeResult;
}) => {
  return <MDXRemote {...blogSampleContent} components={components} />;
};
