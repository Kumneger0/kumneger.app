import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

import * as z from 'zod'


import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/utils/db"

const GITHUBCLIENTID = process.env.GITHUBCLIENTID
const GITHUBCLIENTSECRET = process.env.GITHUBCLIENTSECRET

const schema = z.object({ clientId: z.string().min(1), clientSecret: z.string() })

const providers = []

try {
    schema.parse({ clientId: GITHUBCLIENTID, clientSecret: GITHUBCLIENTSECRET })
    providers.push(Github({ clientId: GITHUBCLIENTID!, clientSecret: GITHUBCLIENTSECRET! }))
} catch (err) {
    throw new Error('Invalid GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET')
}



const handler = NextAuth({
    adapter: PrismaAdapter(db),
    providers
})

export { handler as GET, handler as POST }