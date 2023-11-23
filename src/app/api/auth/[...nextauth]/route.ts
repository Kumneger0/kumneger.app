import NextAuth from "next-auth"
import Github from "next-auth/providers/github"




const providers = [

    Github({ clientId: '4c88d69a0f7ac9ddfafb', clientSecret: "dc840028bff800968f28de1057be18a0cd1f873f" }),
]

const handler = NextAuth({
    providers
})

export { handler as GET, handler as POST }