import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getSampleRelatedArticles } from "@/utils/utils";
import { twMerge } from "tailwind-merge";


export type AllBlogs = Awaited<ReturnType<typeof getSampleRelatedArticles>>;
function Blogs({ blogs, className }: { blogs?: AllBlogs; className: string }) {
  return (
    <>
      {blogs?.map(({ title, content, data }, index) => {
        return (
          <li className="w-full">
            <Card className={twMerge("border-none", className)}>
              <CardHeader>
                <CardTitle>{data?.title}</CardTitle>
                <CardDescription>{data.seoDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link className="text-blue-400 hover:underline" scroll={true} href={`/blog/${data.asset_id}`}>
                  Read More
                </Link>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </>
  );
}

export default Blogs;
