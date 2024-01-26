import { getAllComments } from "@/app/actions/action";
import { CommentsWrapper } from "@/components/comments";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
async function Page({ params }: { params: { slug: string } }) {
  cookies();

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const commnets = await getAllComments(params.slug);
  console.log("refresh");
  return (
    <div className="max-w-5xl w-full mx-auto">
      <pre className="font-bold text-2xl mt-3">{commnets.total} Comments</pre>
      <CommentsWrapper asset_id={params.slug} comments={commnets} />
    </div>
  );
}

export default Page;
