import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    try {

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID not found" });
        }

        const savedPullRequests = await prisma.pullRequest.findMany({
            where: {
                userId: userId
            },
            include: {
                org: {
                    select: {
                        name: true,
                        avatar_url: true,
                        github_url: true,
                    }
                }
            }
        });

        console.log("Saved pull requests:", savedPullRequests);
        return NextResponse.json({ success: true, pullRequests: savedPullRequests });
    } catch (error) {
        console.error("Error creating pull requests:", error);
        return NextResponse.json({ success: false, message: "Failed to create pull requests" });
    }
}