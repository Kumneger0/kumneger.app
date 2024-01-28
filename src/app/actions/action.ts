"use server";

import { Details } from "@/components/commentActions";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

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
      take: 5,
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
                votes: {
                  select: {
                    isUpvote: true,
                    comment: true,
                    date: true,
                    commentId: true,
                    id: true,
                    userEmail: true,
                    userId: true,
                    User: { select: { email: true } }
                  }
                },
                replies: true
              }
            },
            User: true,
            votes: {
              select: {
                isUpvote: true,
                comment: true,
                date: true,
                commentId: true,
                id: true,
                userEmail: true,
                userId: true,
                User: { select: { email: true } }
              }
            }
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
  if (!userEmail || !asset_id) throw new Error("there was an error occured");

  const content = formData.get("content") as string;

  if (typeof userEmail === "number")
    throw new Error("user email must be string type");
  try {
    const post = await db.post.findUnique({ where: { asset_id } });

    const user = await getUser(userEmail);
    if (post && user) {
      const comment = await db.comment.create({
        data: { postId: post.id, content, userId: user?.id },
        include: {
          User: true,
          parentComment: true,
          post: true,
          votes: true,
          replies: true
        }
      });

      revalidatePath(`/blog/${asset_id}`);
      console.log("commnet created", comment);
      return comment;
    }
  } catch (err) {
    console.log(err);
    return null;
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

    if (!user) return new Error("user not founds");

    const existingVote = await db.vote.findFirst({
      where: {
        userId: user?.id,
        commentId: commentId
      }
    });

    if (existingVote) {
      await db.vote.delete({
        where: {
          id: existingVote.id
        }
      });
    }

    // Create a new vote
    const vote = await db.vote.create({
      data: {
        isUpvote,
        userEmail,
        commentId,
        userId: user?.id
      }
    });

    revalidatePath(`/blog/${asset_id}`);
    return vote;
  } catch (err) {
    console.log(err);
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
        },
        select: {
          content: true,
          parentCommentId: true,
          replies: true,
          userId: true,
          votes: true
        }
      });

      revalidatePath(`/blog/${asset_id}`);
      console.log("path revalidaed");
      return comment;
    }
  } catch (err) {
    console.log(err);
    return null;
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
                votes: {
                  select: {
                    isUpvote: true,
                    comment: true,
                    date: true,
                    commentId: true,
                    id: true,
                    userEmail: true,
                    userId: true,
                    User: { select: { email: true } }
                  }
                },
                _count: true,
                replies: true
              }
            },
            post: true,
            User: true,
            votes: {
              select: {
                isUpvote: true,
                comment: true,
                date: true,
                commentId: true,
                id: true,
                userEmail: true,
                userId: true,
                User: { select: { email: true } }
              }
            }
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
