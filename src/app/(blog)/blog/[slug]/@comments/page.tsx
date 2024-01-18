import { getAllComments } from "@/app/actions/action";
import { CommnetsWrapper } from "@/components/comments";
import RelatedArticles from "@/components/relatedAtriles/RelatedAtricles";
import { unstable_noStore } from "next/cache";

async function Page({ params }: { params: { slug: string } }) {
  unstable_noStore();
  const commnets = await getAllComments(params.slug);
  return (
    <div className="max-w-5xl w-full mx-auto">
      <CommnetsWrapper asset_id={params.slug} commnets={commnets} />
      <RelatedArticles currentArticle={params.slug} />
    </div>
  );
}

export default Page;
