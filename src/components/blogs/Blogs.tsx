import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getSampleRelatedArticles } from "@/utils/utils";

type AllBlogs = Awaited<ReturnType<typeof getSampleRelatedArticles>>;

function Blogs({ blogs, className }: { blogs?: AllBlogs; className: string }) {
  return (
    <>
      {blogs?.map(({ title, content, data }, index) => {
        return (
          <li className="py-4 w-full md:w-2/3">
            <Card className="border-none bg-gray-700">
              <CardHeader>
                <CardTitle>{data?.title}</CardTitle>
                <CardDescription>{data.seoDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link scroll={true} href={`/blog/${data.asset_id}`}>
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
