"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function getAllComments(asset_id: string) {
  try {
    const comments = await db.post.findUnique({
      where: { asset_id },
      include: { comments: { include: { User: true, votes: true } } },
    });
    return comments;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get comments");
  }
}

export async function createComment(
  asset_id: string,
  content: string,
  userEmail: string | number
) {
  if (typeof userEmail == "number")
    throw new Error("user email must be string type");
  try {
    const post = await db.post.findUnique({ where: { asset_id } });
    const user = await getUserID(userEmail);
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
    const user = await getUserID(userEmail);

    if (!user) return;
    const comment = await db.vote.delete({
      where: { userId: user.id, id: commentId },
    });
    console.log(comment);
    const vote = db.comment.update({
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

export async function getUserID(userEmail: string) {
  const user = await db.user.findUnique({ where: { email: userEmail } });
  return user;
}
