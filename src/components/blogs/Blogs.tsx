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
    <div className="w-full flex flex-wrap justify-between items-start">
      {blogs?.map(({ title, content, data }, index) => {
        return (
          <li className={twMerge("border-none my-2 min-w-full", className)}>
            <Card className={"border-none "}>
              <CardHeader>
                <CardTitle className="w-full">{data?.title}</CardTitle>
                <CardDescription className="w-full line-clamp-2 min-h-[10px]">
                  {data?.seoDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <Link
                  className="text-blue-400 hover:underline"
                  scroll={true}
                  href={`/blog/${data.asset_id}`}
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </div>
  );
}

export default Blogs;
