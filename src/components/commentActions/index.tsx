import {
  changeVote,
  deleteComment,
  getAllComments,
  writeReply
} from "@/app/actions/action";
import { atom, useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ElementRef,
  memo,
  startTransition,
  useOptimistic,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote
} from "react-icons/bi";
import { GoReply } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { LoginModal } from "../blogHeader/blogHeader";
import { Button } from "../ui/button";
import { RichEditorExample, SubmitForm } from "../writeComments";
import { EditorState, convertToRaw } from "draft-js";

export const commentIdAtom = atom<number | null>(null);

type TVotes = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>["comments"][number]["votes"];

const Vote = memo(
  ({
    id,
    asset_id,
    votes
  }: {
    id: number;
    asset_id: string;
    votes: TVotes;
  }) => {
    console.log({ votes, id });

    const { data, status } = useSession();
    const router = useRouter();

    const modalBtn = useRef<ElementRef<typeof LoginModal>>(null);

    const [optimisticVotes, setOptimisticVotes] = useOptimistic(
      votes,
      (_prv, newVotes: typeof votes) => {
        return newVotes;
      }
    );

    const upvoteCount = votes.filter(({ isUpvote }) => isUpvote).length;
    const downvoteCount = votes.filter(({ isUpvote }) => !isUpvote).length;

    const userVote = votes.find((vote) => vote.userEmail === data?.user?.email);

    async function createVote(isUpvote: boolean) {
      if (status === "unauthenticated" || !data?.user?.email) {
        modalBtn.current?.openModal();
        return;
      }

      console.log(data.user.email);

      const newVote = optimisticVotes.findIndex(
        (vote) => vote.userEmail === data.user?.email
      );
      if (newVote !== -1) {
        const changedVote = [...optimisticVotes];
        changedVote[newVote].isUpvote = isUpvote;

        setOptimisticVotes(changedVote satisfies typeof optimisticVotes);
      }
      await changeVote(id, isUpvote, data?.user?.email, asset_id);
      router.refresh();
    }

    return (
      <div className="flex justify-center gap-2 items-center">
        <div className="flex flex-col justify-center items-center">
          <div>
            {userVote?.isUpvote === true ? (
              <button
                type="button"
                className="hover:cursor-not-allowed"
                disabled={true}
              >
                <BiSolidUpvote className="w-6 h-6 text-green-500" />
              </button>
            ) : (
              <button type="button" onClick={() => createVote(true)}>
                <BiUpvote className="w-6 h-6" />
              </button>
            )}
          </div>
          <div>{upvoteCount}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            {userVote?.isUpvote === false ? (
              <button
                type="button"
                className="hover:cursor-not-allowed"
                disabled={true}
              >
                <BiSolidDownvote className="w-6 h-6 text-red-500" />
              </button>
            ) : (
              <button type="button" onClick={() => createVote(false)}>
                <BiDownvote className="w-6 h-6 " />
              </button>
            )}
          </div>
          <div>{downvoteCount}</div>
        </div>
        <div className="invisible">
          <LoginModal ref={modalBtn}>
            <div />
          </LoginModal>
        </div>
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
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const router = useRouter();

    const [id, setId] = useAtom(commentIdAtom);

    const details = {
      userEmail: data?.user?.email ?? null,
      asset_id,
      commentId
    };

    const createCommentsWithDetails = writeReply.bind(null, details);

    async function handleSubmit(formData: FormData) {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      const jsonString = JSON.stringify(rawContent);

      formData.set("content", jsonString);
      await createCommentsWithDetails(formData);
      startTransition(() => {
        setId(null);
      });
      router.refresh();
      setEditorState(EditorState.createEmpty());
    }

    if (status === "unauthenticated")
      return (
        <LoginModal>
          {" "}
          <GoReply className="w-7 h-7 text-white" />
        </LoginModal>
      );

    return (
      <div className="">
        <Button
          disabled={status === "loading"}
          className={`${
            status === "loading" ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => {
            if (!setId) return;
            startTransition(() => setId(commentId));
          }}
          variant={"destructive"}
        >
          <GoReply className="w-7 h-7 text-white" />
        </Button>
        {id === commentId ? (
          <>
            {createPortal(
              <form action={handleSubmit}>
                <RichEditorExample
                  editorState={editorState}
                  setEditorState={setEditorState}
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
  const router = useRouter();
  if (data?.user?.email !== userEmail || !data.user) return;

  async function handleDeleteCommentAction() {
    if (!data?.user) return;
    await deleteComment({
      asset_id,
      commentId,
      userEmail
    });
    router.refresh();
    console.log("refreshed delete");
  }

  return (
    <Button onClick={handleDeleteCommentAction} variant={"destructive"}>
      <MdOutlineDelete className="w-7 h-7 text-red-600" />
    </Button>
  );
});

export { Delete, ReplyComments, Vote };
