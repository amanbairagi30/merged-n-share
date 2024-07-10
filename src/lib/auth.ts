import { AuthOptions, Profile, SessionStrategy } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"
import { Adapter } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"

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
        async jwt({ token, user, account, profile }: any) {
            if (account?.provider === "github" && profile && 'login' in profile) {
                token.username = profile.login as string;
            }
            console.log("JWT callback - Token:", token);
            return token;
        },
        async session({ session, token }: { session: any, token: JWT }): Promise<any> {
            console.log("Session callback - Token:", token);
            if (token.sub) {
                try {
                    const user = await prisma.user.update({
                        where: { id: token.sub },
                        data: { username: token.username as string },
                    });
                    console.log("Updated user:", user);
                    
                    session.user.id = user.id;
                    session.user.admin = user.admin;
                    session.user.username = user.username;
                    session.user.name = user.name;
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            }
            console.log("Session callback - Final session:", session);
            return session;
        },
    }
}