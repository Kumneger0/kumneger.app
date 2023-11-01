import Blogs, { TBlogs } from "@/app/(blog)/blog/allPosts/Blogs";
import { getSampleRelatedArticles } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";

const RelatedArticles = async ({
  currentArticle,
}: {
  currentArticle: string;
}) => {
  const blogs = await getSampleRelatedArticles(currentArticle, 3);

  const serializedBlog = await Promise.all<TBlogs[]>(
    blogs?.map(async ({ title, content, data }) => ({
      title,
      content: await serialize(content.slice(0, 200)),
      data
    })) as unknown as TBlogs[]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Articles</h2>
      <Blogs className="justify-around" blogs={serializedBlog} />
    </div>
  );
};
export default RelatedArticles;
