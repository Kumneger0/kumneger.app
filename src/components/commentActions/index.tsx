"use client";

import {
  changeVote,
  createComment,
  deleteComment,
  getAllComments,
  getUser,
  writeReply,
} from "@/app/actions/action";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type TVotes = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>[number]["votes"];

export function Vote({
  children,
  id,
  isUpvote,
  asset_id,
  votes,
}: {
  children: React.ReactNode;
  id: number;
  isUpvote: boolean;
  asset_id: string;
  votes: TVotes;
}) {
  const { data } = useSession();
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    if (!data?.user?.email) return;
    getUser(data.user.email).then((user) => {
      setUserId(user?.id);
    });
  }, []);

  async function handleUserVote() {
    if (!data?.user) return;
    await changeVote(id, isUpvote, data.user.email || "", asset_id);
  }

  const currentVotes = votes?.filter(({ isUpvote: vote }) => isUpvote == vote);
  const isCurrentUserUserVoted = currentVotes?.some(
    ({ userId: id }) => id == userId
  );

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={handleUserVote}>
          <span
            className={`${
              isCurrentUserUserVoted && isUpvote
                ? "text-green-600 font-bold"
                : isCurrentUserUserVoted && !isUpvote
                ? "text-red-600 font-bold"
                : ""
            }`}>
            {children}
          </span>
        </Button>
      </div>
      <div>{currentVotes?.length}</div>
    </div>
  );
}

export interface Details {
  userEmail: string | null;
  asset_id: string;
  commentId: number;
}

function ReplyComments({
  asset_id,
  commentId,
}: {
  asset_id: string;
  commentId: number;
}) {
  const { data } = useSession();
  const [showReply, setShowReply] = useState(false);

  const details = {
    userEmail: data?.user?.email ?? null,
    asset_id,
    commentId,
  } satisfies Details;

  const createCommentsWithDetails = writeReply.bind(null, details);

  return (
    <div>
      <Button onClick={() => setShowReply(!showReply)} variant={"destructive"}>
        Reply
      </Button>
      <div className="mt-10 -ml-[200px]">
        {showReply ? (
          <>
            <form
              onSubmit={() => {
                setShowReply(false);
              }}
              action={createCommentsWithDetails}>
              <input
                className="border-2 text-black border-gray-300 rounded-md p-2"
                required
                autoCapitalize="on"
                spellCheck
                autoFocus
                type="text"
                name="content"
                placeholder="write a reply"
              />
              <Button variant={"secondary"} type="submit">
                Submit
              </Button>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
}

export { ReplyComments };

export function Delete({ userEmail, asset_id, commentId }: Details) {
  const { data } = useSession();

  function handleDeleteCommentAction() {
    if (!data?.user) return;
    if (data.user.email !== userEmail) return;
    deleteComment({
      asset_id,
      commentId,
      userEmail,
    });
  }

  return (
    <Button onClick={handleDeleteCommentAction} variant={"destructive"}>
      Delete
    </Button>
  );
}
