'use client'
import React, { useEffect, useRef, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { changeVote, createComment, getAllComments } from '@/app/actions/action'



function Comments({ asset_id }: { asset_id: string }) {
    const session = useSession()
    const commetRef = useRef<HTMLInputElement>(null)
    const [comments, setComments] = useState<Awaited<ReturnType<typeof getAllComments>>>()


    useEffect(() => {
        const fetchComments = async () => {
            const comments = await getAllComments(asset_id)
            setComments(comments)

        }

        fetchComments()
    }, [])

    console.log(comments)
    console.log(session)

    const organizedComments = comments?.comments.map(({ User, content, id, parentCommentId, }) => {
        return {
            content,
            user: User,
            id,
            parentCommentId
        }

    })



    return (
        <div>
            {session.data?.user ? <div>
                <div className='w-full flex flex-col justify-center gap-20'>
                    <div>
                        <div className='font-bold text-2xl mx-2'>Comments</div>
                        {organizedComments?.length ? organizedComments.map(({ content, user, id }, index) => {
                            return <div className='w-full flex flex-col border shadow-sm rounded-lg my-5 shadow-black' key={index}>
                                <div className='user flex'>
                                    <div>
                                        <img width={50} height={50} className='rounded-full object-cover object-center' src={user?.image ?? ''} />
                                    </div>
                                    <div>
                                        <div className=''>{user?.name}</div>
                                    </div>
                                </div>
                                <div className='ml-16'>
                                    <div>
                                        {content}
                                    </div>
                                    <div className='flex gap-4'>
                                        <button onClick={async () => {
                                            const vote = await changeVote(id, true, session.data.user?.email ?? null)
                                            console.log(vote)
                                        }} >like</button>
                                        <button onClick={async () => {
                                            const vote = await changeVote(id, false, session.data.user?.email ?? null)
                                            console.log(vote)
                                        }} >dislike</button>
                                        <button  >reply</button>
                                    </div>
                                </div>
                            </div>
                        }) : <>
                            <div>no comments</div>
                        </>}
                    </div>
                    <div>
                        <input ref={commetRef} type="text" className='p-3 rounded-md text-black' placeholder={`write you comment as ${session.data.user.name}`} />
                        <button onClick={async () => {
                            const value = commetRef.current?.value
                            if (value) {

                                const result = await createComment(asset_id, value, session.data.user?.email ?? 0)
                                console.log(result)
                            }
                        }}>post</button>
                    </div>

                </div>
            </div> : <div>
                to post comments you should have to
                <button onClick={() => signIn()}>
                    signIn

                </button>
            </div>}
        </div>
    )
}

export default Comments