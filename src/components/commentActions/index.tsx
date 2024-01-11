import {
  changeVote,
  deleteComment,
  getAllComments,
  getUser,
  writeReply
} from "@/app/actions/action";
import { atom, useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";
import { SubmitForm } from "../writeComments";
const commentIdAtom = atom<number | null>(null);

type TVotes = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>["comments"][number]["votes"];

const Vote = memo(
  ({
    children,
    id,
    isUpvote,
    asset_id,
    votes
  }: {
    children: React.ReactNode;
    id: number;
    isUpvote: boolean;
    asset_id: string;
    votes: TVotes;
  }) => {
    const { data } = useSession();
    const [userId, setUserId] = useState<string>();
    useEffect(() => {
      if (!data?.user?.email) return;
      getUser(data.user.email).then((user) => {
        setUserId(user?.id);
      });
    }, [data?.user?.email]);

    async function handleUserVote() {
      if (!data?.user?.email) {
        alert("please login to vote");
        return;
      }
      await changeVote(id, isUpvote, data.user.email, asset_id);
    }

    const currentVotes = votes?.filter(
      ({ isUpvote: vote }) => isUpvote === vote
    );
    const isCurrentUserUserVoted = currentVotes?.some(
      ({ userId: id }) => id === userId
    );

    return (
      <div className="flex flex-col justify-center items-center">
        <div>
          <Button onClick={handleUserVote}>
            <span
              className={`${
                isCurrentUserUserVoted && isUpvote
                  ? "text-green-600 font-bold"
                  : isCurrentUserUserVoted && !isUpvote
                    ? "text-red-600 font-bold"
                    : ""
              }`}
            >
              {children}
            </span>
          </Button>
        </div>
        <div>{currentVotes?.length}</div>
      </div>
    );
  }
);

export interface Details {
  userEmail: string | null;
  asset_id: string;
  commentId: number;
}

const ReplyComments = memo(
  ({
    asset_id,
    commentId,
    replayFormPrentId
  }: {
    asset_id: string;
    commentId: number;
    replayFormPrentId: string;
  }) => {
    const { data, status } = useSession();

    const [id, setId] = useAtom(commentIdAtom);

    const details = {
      userEmail: data?.user?.email ?? null,
      asset_id,
      commentId
    };

    const createCommentsWithDetails = writeReply.bind(null, details);

    async function handleSubmit(formData: FormData) {
      const responce = await createCommentsWithDetails(formData);
      setId(null);
    }

    return (
      <div>
        <Button
          onClick={() => {
            if (status === "unauthenticated") {
              alert("please login to write your reply");
              return;
            }

            setId
              ? setId((prv) => (prv === commentId ? null : commentId))
              : null;
          }}
          variant={"destructive"}
        >
          Reply
        </Button>
        {id === commentId ? (
          <>
            {createPortal(
              <form action={handleSubmit}>
                <input
                  className="border-2 text-black border-gray-300 rounded-md p-2"
                  required
                  autoCapitalize="on"
                  spellCheck
                  // biome-ignore lint/a11y/noAutofocus: <explanation>
                  autoFocus
                  type="text"
                  name="content"
                  placeholder={`write a reply ${commentId}`}
                />
                <SubmitForm />
              </form>,
              document.getElementById(replayFormPrentId) as HTMLDivElement
            )}
          </>
        ) : null}
      </div>
    );
  }
);

const Delete = memo(({ userEmail, asset_id, commentId }: Details) => {
  const { data } = useSession();

  if (data?.user?.email !== userEmail || !data.user) return;

  function handleDeleteCommentAction() {
    if (!data?.user) return;
    deleteComment({
      asset_id,
      commentId,
      userEmail
    });
  }

  return (
    <Button onClick={handleDeleteCommentAction} variant={"destructive"}>
      Delete
    </Button>
  );
});

export { Delete, ReplyComments, Vote };
