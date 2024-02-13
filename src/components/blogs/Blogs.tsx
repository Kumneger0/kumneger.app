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
    <div className="w-full flex flex-wrap justify-between ">
      {blogs?.map(({ title, content, data }, index) => {
        return (
          <li className={twMerge("border-none my-2 min-w-[300px]", className)}>
            <Card className={twMerge("border-none")}>
              <CardHeader>
                <CardTitle className="w-full">{data?.title}</CardTitle>
                <CardDescription className="w-full">
                  {data.seoDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
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
