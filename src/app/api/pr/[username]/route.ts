import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  try {
    if (!username) {
      return NextResponse.json({
        success: false,
        message: 'Please correctly type the username and retry again!',
      });
    }

    const userData = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        contributedOrgs: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        pullRequests: {
          select: {
            prURL: true,
            avatar: true,
            mergedAt: true,
            id: true,
            prNumber: true,
            repoURL: true,
            body: true,
            prTitle: true,
            userName: true,
            org: {
              select: {
                id: true,
                name: true,
                avatar_url: true,
                github_url: true,
              },
            },
          },
        },
      },
    });
    if (!userData) {
      return NextResponse.json({
        success: true,
        message: "We can't find any user with this username in the database",
      });
    }

    if (userData?.pullRequests.length === 0) {
      return NextResponse.json({
        success: true,
        message:
          'No Pull requests found for this username , try saving the new prs from my-pr section in Merged&Share',
      });
    }

    return NextResponse.json({
      success: true,
      userData: userData,
      message: 'Merged PRs with this  username has been found successfully  ',
    });
  } catch (error) {
    console.error('Error creating pull requests:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create pull requests',
    });
  }
}
