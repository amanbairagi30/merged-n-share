import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { Organisations } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// to approve or disapprove an organisation
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    const { id, name, github_url, avatar_url } = await req.json();

    console.log(session?.user);

    // @ts-ignore
    const userId = session?.user?.id;

    const existingSave = await prisma.user.findFirst({
      where: {
        id: userId,
        savedOrgs: { some: { id: parseInt(id) } },
      },
    });

    if (existingSave) {
      // User has already saved this org, so unsave it
      await prisma.user.update({
        where: { id: userId },
        data: {
          savedOrgs: { disconnect: { id: parseInt(id) } },
        },
      });
      return NextResponse.json({
        success: true,
        msg: 'Organisation unsaved successfully',
        action: 'unsaved',
      });
    } else {
      // User hasn't saved this org, so save it
      // First, ensure the organisation exists
      const org = await prisma.organisations.upsert({
        where: { id: parseInt(id) },
        update: {}, // If it exists, don't update anything
        create: {
          id: parseInt(id),
          name,
          github_url,
          avatar_url,
        },
      });

      // Then, connect the user to the organisation
      await prisma.user.update({
        where: { id: userId },
        data: {
          savedOrgs: { connect: { id: org.id } },
        },
      });
      return NextResponse.json({
        success: true,
        msg: 'Organisation saved successfully',
        action: 'saved',
      });
    }
  } catch (error) {
    console.error('Error creating pull requests:', error);
    return NextResponse.json({ success: false, message: 'Failed' });
  }
}

// to get all the orgnisations
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    //@ts-ignore
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User ID not found',
      });
    }
    //@ts-ignore
    // if (session?.user?.admin == false) {
    //     return NextResponse.json({ success: false, message: "UnAuthorized User" }, { status: 403 });
    // }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { savedOrgs: true },
    });

    if (user) {
      return NextResponse.json(
        { success: true, organisations: user.savedOrgs },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error('Error creating pull requests:', error);
    return NextResponse.json({ success: false, message: 'Failed' });
  }
}
