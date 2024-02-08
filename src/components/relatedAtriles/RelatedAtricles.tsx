import Blogs from "@/components/blogs/Blogs";
import { getSampleRelatedArticles } from "@/utils/utils";
import { serialize } from "next-mdx-remote/serialize";

const RelatedArticles = async ({
  currentArticle
}: {
  currentArticle: string;
}) => {
  const blogs = await getSampleRelatedArticles(currentArticle, 3);

  return (
    <div className="space-y-4 ml-6 my-5">
      <h2 className="text-2xl font-bold">Related Articles</h2>
      <Blogs className="justify-around" blogs={blogs} />
    </div>
  );
};
export default RelatedArticles;
