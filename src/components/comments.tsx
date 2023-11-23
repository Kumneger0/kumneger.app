'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

function Comments() {
    const session = useSession()
    console.log(session)
    return (
        <div>
            {session.data?.user ? <div>

                {session.data.user.name}
                <button onClick={() => signOut()}>Sign Out</button>
            </div> : <div>
                <button onClick={() => signIn()}>sign in</button>
            </div>}
        </div>
    )
}

export default Comments