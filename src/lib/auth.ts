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
        async signIn({ user, account, profile }: any) {
            console.log("SignIn callback - User:", user);
            console.log("SignIn callback - Account:", account);
            console.log("SignIn callback - Profile:", profile);

            if (account?.provider === "github" && profile && 'login' in profile) {
                try {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { username: profile.login as string },
                    });
                    console.log("Updated user with username:", profile.login);
                } catch (error) {
                    console.error("Error updating user:", error);
                    // Continue sign-in process even if update fails
                }
            }
            return true;
        },
        async jwt({ token, user, account, profile }:any){
            if (profile && 'login' in profile) {
                token.username = profile.login as string;
            }
            console.log("JWT callback - Token:", token);
            return token;
        },
        async session({ session, token }: { session: any, token: JWT }): Promise<any> {
            console.log("Session callback - Token:", token);
            const user = await prisma.user.findUnique({
                where: {
                    id: token.sub,
                },
            });
            console.log("Session callback - User from DB:", user);
            if (user) {
                session.user.id = user.id;
                session.user.admin = user.admin;
                session.user.username = user.username;
            }
            console.log("Session callback - Final session:", session);
            return session;
        },
    }
}
