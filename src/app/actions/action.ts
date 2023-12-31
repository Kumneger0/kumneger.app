"use server";

import { Details } from "@/components/commentActions";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function getAllComments(asset_id: string, skip = 0, take = 5) {
  try {
    const post = await db.post.findUnique({ where: { asset_id } });

    const comments = await db.comment.findMany({
      where: {
        postId: post?.id,
        parentCommentId: null
      },
      include: {
        User: true,

        replies: {
          include: {
            replies: {
              include: {
                User: true,
                votes: true
              },
              orderBy: {
                date: "desc"
              },
              take: 3,
              skip
            },
            User: true,
            votes: true
          },
          orderBy: {
            date: "desc"
          },
          take: 3,
          skip
        },
        votes: true
      },
      orderBy: {
        date: "desc"
      },
      take: 5,
      skip
    });

    return comments;
  } catch (err) {
    throw new Error("Failed to get comments");
  }
}

export async function createComment(
  details: { userEmail: string; asset_id: string },
  formData: FormData
) {
  const { userEmail, asset_id } = details;

  if (!userEmail || !asset_id) return;
  const content = formData.get("content") as string;

  if (typeof userEmail == "number")
    throw new Error("user email must be string type");
  try {
    console.time("find post");
    const post = await db.post.findUnique({ where: { asset_id } });
    console.timeEnd("find post");
    console.time("find user");
    const user = await getUser(userEmail);
    console.timeEnd("find user");
    if (post) {
      console.time("create comment");
      const comment = await db.comment.create({
        data: { postId: post.id, content, userId: user?.id },
        include: { User: true }
      });
      console.timeEnd("create comment");
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
  if (!userEmail) return;
  try {
    const user = await getUser(userEmail);

    if (!user) return;
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
    return vote;
  } catch (err) {}
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

  if (!userEmail || !asset_id || !commentId) return;

  const content = formData.get("content") as string;

  if (typeof userEmail == "number")
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
