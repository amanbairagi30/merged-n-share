import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { PullRequest } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function getPRPointsByBounty(bt: string) {
    const bountyAmount = Number(typeof bt === 'string' && bt.replace("$", ""));
    if (bountyAmount === 0 || !bountyAmount) {
        return 1;
    } else if (bountyAmount > 0 && bountyAmount <= 30) {
        return 10;
    } else if (bountyAmount > 30 && bountyAmount <= 60) {
        return 20;
    } else if (bountyAmount > 60 && bountyAmount <= 80) {
        return 30;
    } else if (bountyAmount > 80 && bountyAmount <= 150) {
        return 40;
    } else if (bountyAmount > 150 && bountyAmount <= 250) {
        return 50;
    } else if (bountyAmount > 250 && bountyAmount <= 500) {
        return 60;
    } else if (bountyAmount > 500) {
        return 70;
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const userId = session?.user?.id;
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
                        avatar_url : true,
                        github_url : true,
                    }
                }
            }
        });

        console.log("Saved pull requests:", savedPullRequests);
        return NextResponse.json({ success: true, pullRequests: savedPullRequests });
    } catch (error) {
        console.error("Error creating pull requests:", error);
        return NextResponse.json({ success: true, message: "Failed to create pull requests" });
    }
    return NextResponse.json({ message: "Working" });
}
export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const session = await getServerSession(authOptions);

    const pullRequestsData = body.prs.map((prData: any) => {
        const pointPerPRWrtBounty = getPRPointsByBounty(prData.bounty[0]);
        return {
            prURL: prData.prURL,
            prTitle: prData.prTitle,
            prNumber: prData.prNumber,
            repoURL: prData.repoURL,
            userName: prData.userName,
            avatar: prData.avatar,
            commentURL: prData.commentURL,
            isVerified: prData.isVerified,
            mergedAt: prData.mergedAt,
            body: prData.body,
            draft: prData.draft,
            bounty: prData.bounty[0],
            prPoint: pointPerPRWrtBounty,
            orgId: prData.organisationId,
            //@ts-ignore
            userId: session?.user?.id
        }
    });
    try {
        const existingPRs = await prisma.pullRequest.findMany({
            where: {
                prNumber: { in: pullRequestsData.map((pr: PullRequest) => pr.prNumber) },
                //@ts-ignore
                userId: session?.user?.id
            }
        });

        // TO FIX : Edge case missing : when a user have a PR ex : #120 merged in repo 1 and #120 merged in repo 2 then below logic can't handle it .
        const newPullRequestsData = pullRequestsData.filter((prData: PullRequest) => {
            return !existingPRs.some(existingPR => existingPR.prNumber === prData.prNumber && existingPR.repoURL === prData.repoURL);
        });

        if (newPullRequestsData.length > 0) {
            const createdPullRequests = await prisma.pullRequest.createMany({
                data: newPullRequestsData
            });

            console.log("Pull requests created:", createdPullRequests);
            return NextResponse.json({ success: true, message: "Pull requests created successfully" });
        } else {
            console.log("No new pull requests to create");
            return NextResponse.json({ success: false, message: "No new pull requests to create" });
        }
    } catch (error) {
        console.error("Error creating pull requests:", error);
        return NextResponse.json({ success: true, message: "Failed to create pull requests" });
    }
}