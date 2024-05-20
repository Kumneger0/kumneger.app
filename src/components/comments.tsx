"use client";
import {
  getAllComments,
  getMoreCommentsFromDB,
  getMoreTopLevelComments
} from "@/app/actions/action";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { formatDistanceToNow } from "date-fns";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useId,
  useState,
  useTransition
} from "react";

import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

import { ChevronsUpDown } from "lucide-react";
import { Delete, ReplyComments, Vote } from "./commentActions";
import PostComments from "./writeComments";

export type Comments = NonNullable<Awaited<ReturnType<typeof getAllComments>>>;

type CommentProps = Comments["comments"][number] & {
  asset_id: string;
  depth: number;
};

export function CommentsWrapper({
  comments,
  asset_id
}: {
  comments: Comments;
  asset_id: string;
}) {
  const [moreComments, setMoreComments] = useState<Comments["comments"]>([]);



 

  return (
    <>
      <div className="my-5">
        {comments.comments.map((com) => (
          <div
            key={com.id}
            className="w-full rounded-md h-full my-2 bg-gray-800"
          >
            <Suspense fallback={"please wait..."}>
              <CollapsibleComments depth={0} {...com} asset_id={asset_id} />
            </Suspense>
          </div>
        ))}
        {moreComments?.map((com) => (
          <div
            key={com.id}
            className="w-full rounded-md h-full my-2 bg-gray-800"
          >
            <Suspense fallback={"please wait..."}>
              <CollapsibleComments depth={0} {...com} asset_id={asset_id} />
            </Suspense>
          </div>
        ))}
      </div>
      <div className="my-5">
        <Suspense fallback={"please wait..."}>
          <MoreComments
            setMoreComments={setMoreComments}
            asset_id={asset_id}
            currentlyLoadedCommentsCount={
              comments.comments.length + moreComments.length
            }
            lastCommentId={comments.comments.at(-1)?.id ?? null}
            total={comments.total}
          />
        </Suspense>
      </div>
      <div>
        <PostComments asset_id={asset_id} />
      </div>
    </>
  );
}




function MoreComments({
  asset_id,
  currentlyLoadedCommentsCount,
  total,
  lastCommentId,
  setMoreComments
}: {
  asset_id: string;
  currentlyLoadedCommentsCount: number;
  total: number;
  lastCommentId: number | null;
  setMoreComments: Dispatch<SetStateAction<Comments["comments"]>>;
}) {
  const remainComments = total - currentlyLoadedCommentsCount;

  const [isPending, startTransition] = useTransition();

  const fetchMoreComments = async (asset_id: string, lastCommentId: number) => {
    const moreComments = await getMoreTopLevelComments(asset_id, lastCommentId);
    if (!moreComments) return;
    moreComments.shift();
    //@ts-ignore
    startTransition(() => setMoreComments(moreComments));
  };

  if (isPending) return <div>loading more comments</div>;

  return (
    <div>
      {!!remainComments && remainComments > 0 && (
        <Button
          onClick={() =>
            lastCommentId && fetchMoreComments(asset_id, lastCommentId)
          }
          type="button"
          variant={"destructive"}
        >
          {remainComments} more
        </Button>
      )}{" "}
    </div>
  );
}

const getReplies = async (asset_id: string, id: number) =>
  await getMoreCommentsFromDB(asset_id, id);

function Replies({
  asset_id,
  depth,
  commentId,
  totalReplies
}: {
  depth: number;
  asset_id: string;
  commentId: number;
  totalReplies: number;
}) {
  type TReplies = NonNullable<
    Awaited<ReturnType<typeof getReplies>>
  >["replies"];

  const [replies, setReplies] = useState<TReplies>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!showReplies) return;
    (() =>
      getReplies(asset_id, commentId).then((comment) =>
        startTransition(() =>
          setReplies((prv: TReplies) => comment?.replies ?? prv)
        )
      ))();
  }, [showReplies, totalReplies]);

  if (isPending) return <div>loading...</div>;

  return (
    <div className="my-5">
      {totalReplies && !showReplies ? (
        <button
          type="button"
          onClick={() => {
            startTransition(() => {
              setShowReplies((prv) => !prv);
            });
          }}
        >
          {totalReplies} replies
        </button>
      ) : null}
      {showReplies ? (
        <div className="">
          {replies?.map((reply, index) => {
            return (
              //@ts-ignore

              <CollapsibleComments
                key={index}
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

  const { User: user, content, date, id, replies, votes } = data;

  let commentString;
  try {
    commentString = stateToHTML(convertFromRaw(JSON.parse(content)));
  } catch (err) {
    commentString = content;
  }

  const timeDifference = formatDistanceToNow(new Date(date), {
    addSuffix: false
  });

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
          {user?.name}{" "}
          <span className="text-[0.8em] text-sm font-normal">
            {timeDifference}
          </span>
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
          <div
            className=" p-3"
            dangerouslySetInnerHTML={{ __html: commentString }}
          />
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
        <div id={parentId} />
        <Suspense fallback="replies loading">
          <Replies
            key={replies.length}
            totalReplies={replies.length}
            asset_id={asset_id}
            depth={depth}
            commentId={id}
          />
        </Suspense>
      </CollapsibleContent>
    </Collapsible>
  );
}
