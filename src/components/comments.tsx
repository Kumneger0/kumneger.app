"use client";
import {
  changeVote,
  createComment,
  getAllComments,
} from "@/app/actions/action";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type TComments = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>["comments"];

function Comments({ asset_id }: { asset_id: string }) {
  const session = useSession();
  const commetRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<TComments>();

  const user = session.data?.user;

  const refetchComments = async () => {
    const comments = await getAllComments(asset_id);
    if (!!comments) {
      setComments(comments.comments);
    }
  };
  useEffect(() => {
    refetchComments();
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-20">
        <div>
          <div className="font-bold text-2xl mx-2">Comments</div>
          {comments?.length ? (
            comments.map(({ content, User: user, id, votes }, index) => {
              const upvotes = votes?.filter((vote) => vote.isUpvote);
              const downvotes = votes?.filter((vote) => !vote.isUpvote);
              const isCurrentUserUpVote =
                votes?.find(({ userId }) => user?.id == userId)?.isUpvote ===
                true;
              const isCurrentUserDownVoted =
                votes?.find(({ userId }) => user?.id == userId)?.isUpvote ===
                false;
              console.log(upvotes);
              console.log(downvotes);
              console.log(isCurrentUserUpVote);
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
                        <button
                          onClick={async () => {
                            const vote = await changeVote(
                              id,
                              true,
                              user?.email ?? null,
                              asset_id
                            );
                            refetchComments();
                            console.log(vote);
                          }}>
                          <span
                            className={`${
                              isCurrentUserUpVote
                                ? "text-green-600 font-bold"
                                : ""
                            }`}>
                            like
                          </span>
                        </button>
                        <div>{upvotes.length}</div>
                      </div>
                      <div>
                        <button
                          onClick={async () => {
                            const vote = await changeVote(
                              id,
                              false,
                              user?.email ?? null,
                              asset_id
                            );
                            refetchComments();
                            console.log(vote);
                          }}>
                          <span
                            className={`${
                              isCurrentUserDownVoted
                                ? "text-red-600 font-bold"
                                : ""
                            }`}>
                            dislike
                          </span>
                        </button>
                        <div>{downvotes.length}</div>
                      </div>
                      <button>reply</button>
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

        {user ? (
          <>
            <div>
              <input
                ref={commetRef}
                type="text"
                className="p-3 rounded-md text-black"
                placeholder={`write you comment as ${user?.name ?? ""}`}
              />
              <Button
                variant={"destructive"}
                className={`${!user ? "opacity-50" : ""}`}
                disabled={!user}
                onClick={async () => {
                  const value = commetRef.current?.value;
                  if (value) {
                    const result = await createComment(
                      asset_id,
                      value,
                      user?.email ?? 0
                    );
                    commetRef.current.value = "";
                    console.log(result);
                    refetchComments();
                  }
                }}>
                post
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Button variant={"link"} onClick={async () => await signIn()}>
                signIn
              </Button>{" "}
              to Post Comment
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comments;
