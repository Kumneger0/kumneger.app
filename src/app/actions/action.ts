'use server'

import { db } from "@/utils/db"
import { revalidatePath } from "next/cache"


export async function getAllComments(asset_id: string) {
    try {
        const comments = await db.post.findUnique({ where: { asset_id }, include: { comments: { include: { User: true } }, } })
        return comments
    } catch (err) {
        console.log(err)
        throw new Error('Failed to get comments')
    }
}


export async function createComment(asset_id: string, content: string, userEmail: string | number) {
    if (typeof userEmail == 'number') throw new Error("user email must be string type")
    try {
        const post = await db.post.findUnique({ where: { asset_id } })
        const user = await db.user.findUnique({ where: { email: userEmail } })
        if (post) {
            const comment = await db.comment.create({ data: { postId: post.id, content, userId: user?.id }, include: { User: true } })
            revalidatePath("/blog")

            return comment
        }

    } catch (err) {
        console.log(err)
        throw new Error('Failed to create comment')
    }

}

export async function changeVote(commentId: number, isUpvote: boolean, userEmail: string | null) {
    if (!userEmail) return
    try {

        const user = await db.user.findUnique({ where: { email: userEmail } })
        if (!user) return

        const vote = db.comment.update({
            where: { id: commentId },
            data: {
                votes: {
                    create: {
                        isUpvote,
                        userId: user?.id
                    }
                }
            }
        })

        return vote

    } catch (err) {
        console.log(err)
    }
}