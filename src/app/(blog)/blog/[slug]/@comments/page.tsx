import { getAllComments } from "@/app/actions/action";
import { CommentsWrapper } from "@/components/comments";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
async function Page({ params }: { params: { slug: string } }) {
  cookies();
  const comments = await getAllComments(params.slug);
  return (
    <div className="max-w-5xl w-full mx-auto">
      <pre className="font-bold text-2xl mt-3">{comments.total} Comments</pre>
      <CommentsWrapper asset_id={params.slug} comments={comments} />
    </div>
  );
}

export default Page;
