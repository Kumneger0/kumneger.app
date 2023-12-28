import { getAllComments, getUserById } from "@/app/actions/action";
import { ReplyComments, Vote } from "./commentActions";
import PostComments from "./writeComments";

async function Comments({ asset_id }: { asset_id: string }) {
  const comments = (await getAllComments(asset_id))?.comments;

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-20">
        <div>
          <div className="font-bold text-2xl mx-2">Comments</div>
          {comments?.length ? (
            comments.map((com, index) => {
              return (
                <Comment depth={0} key={index} {...com} asset_id={asset_id} />
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
>["comments"][number] & { asset_id: string; depth: number };

function Comment({
  content,
  User: user,
  id,
  votes,
  asset_id,
  replies,
  depth = 0,
}: CommentProps) {
  return (
    <div
      style={{
        marginLeft: `${depth * 20}px`,
      }}
      className="w-full flex flex-col shadow-md border-l-2 border-slate-300 shadow-gray-700 rounded-lg my-5">
      <div className="user flex">
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
        <div className="flex gap-4">
          <Vote votes={votes} asset_id={asset_id} id={id} isUpvote={true}>
            upvote
          </Vote>
          <Vote votes={votes} asset_id={asset_id} id={id} isUpvote={false}>
            downvote
          </Vote>
          <ReplyComments asset_id={asset_id} />
        </div>
      </div>
      {replies.map(async (repli) => {
        const user = await getUserById(repli.userId);

        const votes = (
          "votes" in repli ? repli.votes : []
        ) as CommentProps["votes"];

        const repliProps = {
          ...repli,
          votes: votes,
          User: user,
          asset_id,
          depth: depth + 1,
        };

        return <Comment {...(repliProps as unknown as CommentProps)} />;
      })}
    </div>
  );
}
