"use client";
import {
  getAllComments,
  getMoreCommentsFromDB,
  getMoreTopLevelComments
} from "@/app/actions/action";
import { differenceInCalendarDays, differenceInMinutes } from "date-fns";
import React, {
  Suspense,
  useEffect,
  useId,
  //@ts-ignore
  useOptimistic,
  useState,
  useTransition
} from "react";
import { Delete, ReplyComments, Vote } from "./commentActions";
import PostComments from "./writeComments";

import { ChevronsUpDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export type Comments = NonNullable<Awaited<ReturnType<typeof getAllComments>>>;

type CommentProps = Comments["comments"][number] & {
  asset_id: string;
  depth: number;
};

const Comments = ({ asset_id }: { asset_id: string }) => {
  const [{ comments, total }, setComments] = useState<Comments>({
    comments: [],
    total: 0
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchComments = () =>
      getAllComments(asset_id).then((res) =>
        startTransition(() => setComments(res))
      );
    fetchComments();
  }, [asset_id]);

  async function getMoreComments() {
    const lastCommnetId = comments.at(-1)?.id;
    const lastCommentDate = comments.at(-1)?.date;
    if (!lastCommnetId || !lastCommentDate) return;
    const moreComments = await getMoreTopLevelComments(
      asset_id,
      lastCommnetId,
      lastCommentDate,
      0
    );
    if (!moreComments) return;

    moreComments.shift();

    const concatinaedComments = {
      comments: comments.concat(moreComments),
      total: total
    };

    startTransition(() => {
      setComments(concatinaedComments);
    });
  }

  const remaingComments = total - comments.length;
  if (isPending) return <div>loading...</div>;

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-20">
        <div>
          <div className="font-bold text-2xl mx-2">{total} Comments</div>
          <CommnetsWrapper asset_id={asset_id} commnets={{ comments, total }} />
          <div>
            <MoreCommnets
              getMoreComments={getMoreComments}
              remaingComments={remaingComments}
              isPending={isPending}
            ></MoreCommnets>
          </div>
        </div>
        <div>
          <PostComments setComments={setComments} asset_id={asset_id} />
        </div>
      </div>
    </div>
  );
};

export default Comments;

function CommnetsWrapper({
  commnets,
  asset_id
}: {
  commnets: Comments;
  asset_id: string;
}) {
  const [{ comments, total }, setComments] = useOptimistic(
    commnets,
    (prv, newState: typeof commnets) => newState
  );
  return (
    <div>
      {comments.map((com) => (
        <div key={com.id} className="w-full rounded-md h-full my-2 bg-gray-800">
          <Suspense fallback={"please wait..."}>
            <CollapsibleComments depth={0} {...com} asset_id={asset_id} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}

function MoreCommnets({
  isPending,
  remaingComments,
  getMoreComments
}: {
  isPending: boolean;
  remaingComments: number;
  getMoreComments: () => void;
}) {
  return (
    <>
      {" "}
      {remaingComments ? (
        <button type="button" onClick={getMoreComments}>
          {remaingComments} more comments
        </button>
      ) : null}
    </>
  );
}

function Replies({
  replies,
  asset_id,
  depth,
  getReplies
}: {
  replies: Comments["comments"][number]["replies"];
  depth: number;
  asset_id: string;
  getReplies: () => void;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [isPending, startTransion] = useTransition();

  if (isPending) return <div>loading...</div>;

  return (
    <div className="my-5">
      {replies?.length && !showReplies ? (
        <button
          type="button"
          onClick={() => {
            startTransion(() => {
              setShowReplies((prv) => !prv);
            });
            getReplies();
          }}
        >
          {replies.length} replies
        </button>
      ) : null}
      {showReplies ? (
        <div className="">
          {replies?.map((reply, index) => {
            return (
              //@ts-ignore

              <CollapsibleComments
                depth={depth + 2}
                {...reply}
                asset_id={asset_id}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function CollapsibleComments({
  asset_id,
  depth,
  ...data
}: CommentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const parentId = useId();

  const [isPending, startTransion] = useTransition();

  const [{ User: user, content, date, id, replies, votes }, setState] =
    useState(data);

  const [optimisticValue, setOptimisticValue] = useOptimistic(
    data,
    (prv, newState: typeof data) => {
      return newState;
    }
  );

  async function getReplies() {
    const comments = await getMoreCommentsFromDB(asset_id, id);
    console.log(comments);
    if (comments) startTransion(() => setState(comments));
  }

  const maxMarginLeft = 100;
  const maxWidth = depth * 5 > maxMarginLeft ? maxMarginLeft : depth * 5;

  const diffInDays = differenceInCalendarDays(new Date(), date);
  const diffInMin = differenceInMinutes(new Date(), date);

  const diffrence = diffInDays < 1 ? `${diffInMin}m ` : `${diffInDays}d`;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 border-l-2"
      style={{
        marginLeft: `${depth}px`,
        maxWidth: `calc(100% - ${depth * 20}px)`
      }}
    >
      <div className="flex items-center justify-start space-x-4 px-4">
        <div>
          <img
            width={40}
            height={40}
            className="rounded-full object-cover object-center"
            src={user?.image ?? ""}
            alt="user profile "
          />
        </div>
        <h4 className="text-sm font-semibold">
          {user?.name} {diffrence}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        <div className="rounded-md px-4 py-3 font-mono text-sm">
          <div className=" p-3">{content}</div>
          <div className="flex items-center">
            <Vote votes={votes} asset_id={asset_id} id={id} />

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
        </div>
        <div id={parentId}></div>
        <Suspense fallback="replies loading">
          <Replies
            getReplies={getReplies}
            asset_id={asset_id}
            depth={depth}
            replies={replies}
          />
        </Suspense>
      </CollapsibleContent>
    </Collapsible>
  );
}
