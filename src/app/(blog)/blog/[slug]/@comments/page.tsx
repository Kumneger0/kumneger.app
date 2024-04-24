import { getAllComments } from "@/app/actions/action";
import { CommentsWrapper } from "@/components/comments";

export const dynamic = "force-dynamic";
async function Page({ params }: { params: { slug: string } }) {
  const comments = await getAllComments(params.slug);

  return (
    <div
      style={{
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: "400",
        fontStyle: "normal",
        fontVariationSettings: '"wdth" 100'
      }}
      className="max-w-4xl mt-12  w-full mx-auto"
    >
      <pre className="font-bold text-2xl mt-3">{comments.total} Comments</pre>
      <CommentsWrapper asset_id={params.slug} comments={comments} />
    </div>
  );
}

export default Page;
