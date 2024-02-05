import { getAllComments } from "@/app/actions/action";
import { CommentsWrapper } from "@/components/comments";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
async function Page({ params }: { params: { slug: string } }) {
  cookies();
  const comments = await getAllComments(params.slug);
  return (
    <div className="max-w-5xl mt-4 w-full mx-auto">
      <hr className="w-full bg-slate-500 h-1" />
      <pre className="font-bold text-2xl mt-3">{comments.total} Comments</pre>
      <CommentsWrapper asset_id={params.slug} comments={comments} />
    </div>
  );
}

export default Page;
