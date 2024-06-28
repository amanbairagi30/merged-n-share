import { AuthOptions, SessionStrategy } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"
import { Adapter } from "next-auth/adapters"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/auth",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" as SessionStrategy },
    callbacks: {
        async jwt({ token , profile}: any) {
            if(profile){
                token.username = profile.login;
            }
            console.log("Profile login : ",profile?.login)
            console.log("username : ",token.username)
            return token;
        },
        async session({ session, token }: any) {
            const user = await prisma.user.findUnique({
                where: {
                    id: token.sub,
                },
            });
            if (token) {
                session.accessToken = token.accessToken;
                session.user.id = token.sub;
                session.user.admin = user?.admin;
                session.user.username = token.username
            }
            return session;
        },
    },

}
