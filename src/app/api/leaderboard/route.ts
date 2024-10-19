import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const leaderboard = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        linkedInProfile: true,
        xProfile: true,
        pullRequests: {
          where: {
            isVerified: true,
          },
          select: {
            prPoint: true,
            bounty: true,
          },
        },
      },
    });

    const leaderBoardWithTotalPoints = leaderboard.map((user) => ({
      ...user,
      totalPoints: user.pullRequests.reduce((acc, pr) => acc + pr.prPoint, 0),
      bounties: user.pullRequests.reduce(
        (acc, pr) => acc + (pr?.bounty ? pr?.bounty : 0),
        0,
      ),
    }));

    leaderBoardWithTotalPoints.sort((a, b) => b.totalPoints - a.totalPoints);
    return NextResponse.json({
      success: true,
      data: leaderBoardWithTotalPoints,
      message: 'Leaderboard sorted and fetched successfully',
    });
  } catch (error) {
    console.error('Error fetch leaderboard:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create pull requests',
    });
  }
}
