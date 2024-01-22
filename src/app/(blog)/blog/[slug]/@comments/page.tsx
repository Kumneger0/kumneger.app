import { getAllComments } from "@/app/actions/action";
import { CommnetsWrapper } from "@/components/comments";
import { unstable_noStore } from "next/cache";

async function Page({ params }: { params: { slug: string } }) {
  unstable_noStore();
  const commnets = await getAllComments(params.slug);
  console.log("refresh");
  return (
    <div className="max-w-5xl w-full mx-auto">
      <pre className="font-bold text-2xl mt-3">{commnets.total} Comments</pre>
      <CommnetsWrapper asset_id={params.slug} commnets={commnets} />
    </div>
  );
}

export default Page;
