"use server";

import { Details } from "@/components/commentActions";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function getAllComments(asset_id: string) {
  try {
    const post = await db.post.findUnique({ where: { asset_id } });

    const comments = await db.comment.findMany({
      where: {
        postId: post?.id,
        parentCommentId: null,
      },
      include: {
        User: true,

        replies: {
          include: {
            replies: {
              include: {
                User: true,
                votes: true,
              },
            },
            User: true,
            votes: true,
          },
        },
        votes: true,
      },
    });

    return comments;
  } catch (err) {
    console.log(err);
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
    const post = await db.post.findUnique({ where: { asset_id } });
    const user = await getUser(userEmail);
    if (post) {
      const comment = await db.comment.create({
        data: { postId: post.id, content, userId: user?.id },
        include: { User: true },
      });
      revalidatePath(`/blog/${asset_id}`);

      console.log(comment);

      return comment;
    }
  } catch (err) {
    console.log(err);
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
        isUpvote: !isUpvote,
      },
    });

    const vote = await db.comment.update({
      where: { id: commentId },
      data: {
        votes: {
          create: {
            isUpvote,
            userId: user?.id,
          },
        },
      },
    });

    revalidatePath(`/blog/${asset_id}`);
    return vote;
  } catch (err) {
    console.log(err);
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
      id,
    },
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
      where: { asset_id: asset_id as string },
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
              postId: post.id,
            },
          },
        },
      });

      revalidatePath(`/blog/${asset_id}`);

      console.log(comment);

      return comment;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create comment");
  }
}

export async function getCommentById(id: number) {
  const comment = await db.comment.findUnique({
    where: {
      id,
    },
    include: {
      User: true,
    },
  });
  return comment;
}
