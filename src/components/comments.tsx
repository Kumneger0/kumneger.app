import { getAllComments } from "@/app/actions/action";
import { Vote } from "./commentActions";

async function Comments({ asset_id }: { asset_id: string }) {
  const comments = (await getAllComments(asset_id))?.comments;

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-20">
        <div>
          <div className="font-bold text-2xl mx-2">Comments</div>
          {comments?.length ? (
            comments.map(({ content, User: user, id, votes }, index) => {
              return (
                <div
                  className="w-full flex flex-col border shadow-sm rounded-lg my-5 shadow-black"
                  key={index}>
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
                      <div>
                        <Vote
                          votes={votes}
                          asset_id={asset_id}
                          id={id}
                          isUpvote={true}>
                          Like
                        </Vote>
                      </div>
                      <div>
                        <Vote
                          votes={votes}
                          asset_id={asset_id}
                          id={id}
                          isUpvote={false}>
                          Like
                        </Vote>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div>no comments</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
