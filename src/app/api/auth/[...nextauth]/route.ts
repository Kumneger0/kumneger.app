import NextAuth from "next-auth"
import Github from "next-auth/providers/github"




const providers = [

    Github({ clientId: '', clientSecret: "" }),
]

const handler = NextAuth({
    providers
})

export { handler as GET, handler as POST }
