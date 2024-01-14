"use server";

import { Details } from "@/components/commentActions";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { date } from "zod";

// export const dynamic = "force-dynamic";

export async function getAllComments(asset_id: string, skip = 0) {
  try {
    const post = await db.post.findUnique({ where: { asset_id } });

    const comments = await db.comment.findMany({
      where: {
        postId: post?.id,
        parentCommentId: null
      },
      include: {
        User: true,
        votes: true,
        replies: {
          include: {
            parentComment: true,
            post: true,
            replies: {
              include: {
                User: true,
                parentComment: true,
                _count: true,
                post: true,
                votes: true,
                replies: true
              }
            },
            User: true,
            votes: true
          }
        }
      },
      orderBy: {
        id: "desc"
      },
      take: 2,
      skip
    });

    const total = await db.comment.count({
      where: { parentCommentId: null, postId: post?.id }
    });

    return { comments, total };
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Failed to get comments");
  }
}

export async function getMoreTopLevelComments(
  asset_id: string,

  id: number,
  date: Date,
  skip = 0
) {
  try {
    const post = await db.post.findUnique({ where: { asset_id } });

    const comments = await db.comment.findMany({
      where: {
        postId: post?.id,
        parentCommentId: null
      },
      include: {
        User: true,
        votes: true,
        replies: {
          include: {
            parentComment: true,
            post: true,
            replies: {
              include: {
                User: true,
                parentComment: true,
                _count: true,
                post: true,
                votes: true,
                replies: true
              }
            },
            User: true,
            votes: true
          }
        }
      },
      orderBy: {
        id: "desc"
      },
      take: 5,
      skip,
      cursor: {
        id
      }
    });
    return comments;
  } catch (err) {}
}

export async function createComment(
  details: { userEmail: string; asset_id: string },
  formData: FormData
) {
  const { userEmail, asset_id } = details;
  // we return early if either user email or post id is not available
  if (!userEmail || !asset_id) return;

  const content = formData.get("content") as string;

  if (typeof userEmail === "number")
    throw new Error("user email must be string type");
  try {
    // get post id
    const post = await db.post.findUnique({ where: { asset_id } });

    // get user
    const user = await getUser(userEmail);
    if (post && user) {
      // at time we know that both user and post id is not null so we can create comment

      const comment = await db.comment.create({
        data: { postId: post.id, content, userId: user?.id },
        include: { User: true }
      });

      // after creating commnet successfully we can revalidate path so we can refetch and display in ui
      revalidatePath(`/blog/${asset_id}`);

      return comment;
    }
  } catch (err) {
    throw new Error("Failed to create comment");
  }
}

export async function changeVote(
  commentId: number,
  isUpvote: boolean,
  userEmail: string | null,
  asset_id: string
) {
  if (!userEmail) throw new Error("opps we need user emai to update the vote");
  try {
    const user = await getUser(userEmail);

    if (!user) return null;
    await db.vote.deleteMany({
      where: {
        userId: user?.id,
        commentId: commentId,
        isUpvote: !isUpvote
      }
    });

    const vote = await db.comment.update({
      where: { id: commentId },
      data: {
        votes: {
          create: {
            isUpvote,
            userId: user?.id
          }
        }
      }
    });

    revalidatePath(`/blog/${asset_id}`);
    console.log(asset_id);
    return vote;
  } catch (err) {
    return null;
  }
}

export async function getUser(userEmail: string) {
  const user = await db.user.findUnique({ where: { email: userEmail } });
  return user;
}

export async function getUserById(id: string | null) {
  if (!id) return null;
  const user = await db.user.findUnique({
    where: {
      id
    }
  });
  return user;
}

export async function writeReply(details: Details, formData: FormData) {
  const { userEmail, asset_id, commentId } = details;

  if (!userEmail || !asset_id || !commentId)
    throw new Error("incomplete arguments");

  const content = formData.get("content") as string;

  if (typeof userEmail === "number")
    throw new Error("user email must be string type");

  try {
    const post = await db.post.findUnique({
      where: { asset_id: asset_id as string }
    });

    const user = await getUser(userEmail);

    if (post) {
      const comment = await db.comment.update({
        where: { id: commentId },
        data: {
          replies: {
            create: {
              content,
              userId: user?.id,
              postId: post.id
            }
          }
        }
      });

      revalidatePath(`/blog/${asset_id}`);
      console.log("path revalidaed");
      return comment;
    }
  } catch (err) {
    throw new Error("Failed to create comment");
  }
}

export async function getCommentById(id: number) {
  const comment = await db.comment.findUnique({
    where: {
      id
    },
    include: {
      User: true
    }
  });
  return comment;
}

export async function deleteComment({
  asset_id,
  commentId: id,
  userEmail
}: Details) {
  await db.comment.delete({
    where: {
      id
    }
  });
  revalidatePath(`/blog/${asset_id}`);
}

export async function revalidatePathToloadMore(path: string) {
  revalidatePath(path);
}

export async function getMoreCommentsFromDB(
  asset_id: string,
  commentId: number
) {
  try {
    const post = await db.post.findUnique({ where: { asset_id } });
    const comments = await db.comment.findFirst({
      where: {
        postId: post?.id,
        id: commentId
      },
      include: {
        parentComment: true,
        User: true,
        post: true,
        votes: true,

        replies: {
          include: {
            parentComment: true,
            replies: {
              include: {
                User: true,
                post: true,
                parentComment: true,
                votes: true,
                _count: true,
                replies: true
              }
            },
            post: true,
            User: true,
            votes: true
          }
        }
      },
      orderBy: {
        date: "desc"
      }
    });
    console.log(comments);
    return comments;
  } catch (err) {
    return;
  }
}
