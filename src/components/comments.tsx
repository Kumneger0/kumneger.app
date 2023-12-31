import { getAllComments, getCommentById } from "@/app/actions/action";
import { useId } from "react";
import { Delete, LoadMore, ReplyComments, Vote } from "./commentActions";
import PostComments from "./writeComments";
import { ReadonlyURLSearchParams } from "next/navigation";

async function Comments({
  asset_id,
  searchParams
}: {
  asset_id: string;
  searchParams: ReadonlyURLSearchParams;
}) {
  const skip = searchParams.get("skip");
  const comments = await getAllComments(asset_id, Number(skip));

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-20">
        <div>
          <div className="font-bold text-2xl mx-2">Comments</div>
          {comments?.length ? (
            comments?.map((com, index) => {
              return (
                <div className="w-full h-full my-2 bg-gray-800 p-2">
                  <Comment depth={0} key={index} {...com} asset_id={asset_id} />
                </div>
              );
            })
          ) : (
            <>
              <div>no comments</div>
            </>
          )}
        </div>
        <div>
          <PostComments asset_id={asset_id} />
        </div>
      </div>
    </div>
  );
}

export default Comments;

type CommentProps = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>[number] & { asset_id: string; depth: number };

async function Comment({
  content,
  User: user,
  id,
  votes,
  asset_id,
  replies,
  depth = 0
}: CommentProps) {
  const parentId = useId();
  if (!user) {
    user = (await getCommentById(id))?.User;
  }

  return (
    <div
      style={{
        marginLeft: `${depth * 20}px`,
        maxWidth: `calc(100% - ${depth * 20}px)`
      }}
      className="w-full  flex flex-col border-l-2 px-2 border-slate-300  rounded-lg my-5"
    >
      <div className="user flex ">
        <div>
          <img
            width={50}
            height={50}
            className="rounded-full object-cover object-center"
            src={user?.image ?? ""}
          />
        </div>
        <div>
          <div className="">{user?.name}</div>
        </div>
      </div>
      <div className="ml-16">
        <div>{content}</div>
        <div className="flex gap-2">
          <Vote votes={votes} asset_id={asset_id} id={id} isUpvote={true}>
            upvote
          </Vote>
          <Vote votes={votes} asset_id={asset_id} id={id} isUpvote={false}>
            downvote
          </Vote>
          <ReplyComments
            replayFormPrentId={parentId}
            commentId={id}
            asset_id={asset_id}
          />
          <Delete
            userEmail={user?.email ?? null}
            asset_id={asset_id}
            commentId={id}
          />
        </div>
        <div id={parentId}></div>
      </div>
      {replies?.map(async (repli, i) => {
        return (
          <div>
            {/* @ts-expect-error */}
            <Comment asset_id={asset_id} depth={depth + 1} {...repli} />
            <div>
              {!(repli.replies?.length > 0) && replies.length - 1 == i && (
                <LoadMore />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
