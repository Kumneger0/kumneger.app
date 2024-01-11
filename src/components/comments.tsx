"use client";

import {
  getAllComments,
  getMoreCommentsFromDB,
  getMoreTopLevelComments
} from "@/app/actions/action";
import React, {
  Dispatch,
  Suspense,
  useEffect,
  useId,
  useState,
  useTransition
} from "react";
import { Delete, ReplyComments, Vote } from "./commentActions";
import PostComments from "./writeComments";
import { SetStateAction } from "jotai";

import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote
} from "react-icons/bi";

type Comments = NonNullable<Awaited<ReturnType<typeof getAllComments>>>;

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

    startTransition(() => {
      setComments((prv) => ({
        comments: prv.comments.concat(moreComments),
        total: prv.total
      }));
    });
  }

  const remaingComments = total - comments.length;
  if (isPending) return <div>loading...</div>;

  return (
    <div>
      <div className="w-full flex flex-col justify-center gap-20">
        <div>
          <div className="font-bold text-2xl mx-2">{total} Comments</div>
          {comments.map((com) => (
            <div
              key={com.id}
              className="w-full rounded-md h-full my-2 bg-gray-800"
            >
              <Suspense fallback={"please wait..."}>
                <Comment depth={0} {...com} asset_id={asset_id} />
              </Suspense>
            </div>
          ))}
          <div>
            <MoreCommnets isPending={isPending}>
              {remaingComments ? (
                <button type="button" onClick={getMoreComments}>
                  {remaingComments} more comments
                </button>
              ) : null}
            </MoreCommnets>
          </div>
        </div>
        <div>
          <PostComments asset_id={asset_id} />
        </div>
      </div>
    </div>
  );
};

export default Comments;

function MoreCommnets({
  isPending,
  children
}: {
  isPending: boolean;
  children: React.ReactNode;
}) {
  if (isPending) return <div>loading...</div>;
  return <>{children}</>;
}

async function Comment({ asset_id, depth, ...data }: CommentProps) {
  const parentId = useId();

  const [isPending, startTransion] = useTransition();

  const [{ User: user, content, date, id, replies, votes }, setState] =
    useState<Exclude<typeof data, { asset_id: string; depth: number }>>(data);

  async function getReplies() {
    const comments = await getMoreCommentsFromDB(asset_id, id);
    if (comments) startTransion(() => setState(comments));
  }

  const maxMarginLeft = 100;
  const maxWidth = depth * 5 > maxMarginLeft ? maxMarginLeft : depth * 5;

  return (
    <div
      style={{
        marginLeft: `${
          depth * 5 > maxMarginLeft ? maxMarginLeft : depth * 5
        }px`,
        maxWidth: `${maxWidth}px)`
      }}
      className="w-full  flex flex-col border-l-2 px-2 p-2  maxWidthborder-slate-300  rounded-lg my-5"
    >
      <div className="user flex ">
        <div>
          <img
            width={50}
            height={50}
            className="rounded-full object-cover object-center"
            src={user?.image ?? ""}
            alt="user profile "
          />
        </div>
        <div>
          <div className="">
            {user?.name} {date.toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className="ml-16">
        <div>{content}</div>
        <div className="flex gap-2">
          <Vote votes={votes} asset_id={asset_id} id={id} isUpvote={true}>
            <BiUpvote className="w-7 h-7 text-white" />
          </Vote>
          <Vote votes={votes} asset_id={asset_id} id={id} isUpvote={false}>
            <BiDownvote className="w-7 h-7 text-white" />
          </Vote>
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
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div id={parentId}></div>
      </div>
      <Suspense fallback="replies loading">
        <Replies
          getReplies={getReplies}
          asset_id={asset_id}
          depth={depth}
          replies={replies}
        />
      </Suspense>
    </div>
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
    <div>
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
            return <Comment depth={depth + 1} {...reply} asset_id={asset_id} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
