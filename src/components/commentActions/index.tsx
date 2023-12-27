"use client";

import { changeVote, getAllComments, getUserID } from "@/app/actions/action";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type TVotes = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>["comments"][number]["votes"];

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
    getUserID(data.user.email).then((user) => {
      setUserId(user?.id);
    });
  }, []);

  async function handleUserVote() {
    if (!data?.user) return;
    await changeVote(id, isUpvote, data.user.email || "", asset_id);
  }

  const currentVotes = votes.filter(({ isUpvote: vote }) => isUpvote == vote);
  const isCurrentUserUserVoted = currentVotes.some(
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
        ;
      </div>
      <div>{currentVotes.length}</div>
    </div>
  );
}
