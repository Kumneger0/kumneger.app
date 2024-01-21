"use client";
import {
  getAllComments,
  getMoreCommentsFromDB,
  getUser
} from "@/app/actions/action";
import { formatDistanceToNow } from "date-fns";
import React, {
  Suspense,
  startTransition,
  useEffect,
  useId,
  useOptimistic,
  useState,
  useTransition
} from "react";
import { Delete, ReplyComments, Vote } from "./commentActions";
import PostComments from "./writeComments";

import { ChevronsUpDown } from "lucide-react";

type User = Awaited<ReturnType<typeof getUser>> | null;

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export const CommnetsContext = React.createContext<{
  comments: Comments;
  setComments: (action: Comments) => void;
  user: User;
} | null>(null);

export type Comments = NonNullable<Awaited<ReturnType<typeof getAllComments>>>;

type CommentProps = Comments["comments"][number] & {
  asset_id: string;
  depth: number;
};

export function CommnetsWrapper({
  commnets,
  asset_id
}: {
  commnets: Comments;
  asset_id: string;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [c, setComments] = useOptimistic(
    commnets,
    (prv, newState: typeof commnets) => newState
  );

  return (
    <>
      <CommnetsContext.Provider value={{ comments: c, setComments, user }}>
        <div className="my-5">
          {commnets.comments.map((com) => (
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
            <MoreCommnets />
          </Suspense>
        </div>
        <div>
          <PostComments asset_id={asset_id} />
        </div>
      </CommnetsContext.Provider>
    </>
  );
}

function MoreCommnets() {
  const {
    comments: { comments, total },
    setComments
  } = React.useContext(CommnetsContext)!;

  const remaingComments = total - comments.length;

  return (
    <>
      {" "}
      {remaingComments ? (
        <button type="button">{remaingComments} more comments</button>
      ) : null}
    </>
  );
}

async function getReplies(asset_id: string, id: number) {
  const comments = await getMoreCommentsFromDB(asset_id, id);
  return comments;
}

function Replies({
  asset_id,
  depth,
  commnetId,
  totalReplies
}: {
  depth: number;
  asset_id: string;
  commnetId: number;
  totalReplies: number;
}) {
  type Reples = NonNullable<Awaited<ReturnType<typeof getReplies>>>["replies"];

  console.log(totalReplies);

  const [replies, setReplies] = useState<Reples>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [isPending, startTransion] = useTransition();

  useEffect(() => {
    if (!showReplies) return;
    (() =>
      getReplies(asset_id, commnetId).then((commet) =>
        startTransion(() => setReplies((prv) => commet?.replies ?? prv))
      ))();
  }, [showReplies]);

  if (isPending) return <div>loading...</div>;

  console.log("now");

  return (
    <div className="my-5">
      {totalReplies && !showReplies ? (
        <button
          type="button"
          onClick={() => {
            startTransion(() => {
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

  console.log(content, replies.length);
  console.log(data.content, data.replies.length);

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
        <div id={parentId} />
        <Suspense fallback="replies loading">
          <Replies
            key={replies.length}
            totalReplies={replies.length}
            asset_id={asset_id}
            depth={depth}
            commnetId={id}
          />
        </Suspense>
      </CollapsibleContent>
    </Collapsible>
  );
}
