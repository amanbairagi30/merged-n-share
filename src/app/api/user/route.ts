import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    // @ts-ignore
    const userId = session?.user?.id;
    try {

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID not found" });
        }

        console.log(body);

        if (body.name !== undefined) {
            await prisma.user.updateMany({
                where: {
                    id: userId,
                },
                data: {
                    name: body.name
                }

            })
        } else if (body.isChecked !== undefined) {
            await prisma.user.updateMany({
                where: {
                    id: userId,
                },
                data: {
                    isProfilePublic: body.isChecked
                }

            })
        } else if (body.socialLinks !== undefined) {
            const { x, linkedIn } = body.socialLinks;
            await prisma.user.updateMany({
                where: {
                    id: userId,
                },
                data: {
                    xProfile: x,
                    linkedInProfile: linkedIn
                }

            })
        }

        return NextResponse.json({ success: 'true', message: 'Your name has been updated' }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: 'false', message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const userId = session?.user?.id;
    try {

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID not found" });
        }

        const userData = await prisma.user.findMany({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                githubProfile: true,
                linkedInProfile: true,
                isProfilePublic: true,
                updatedAt: true,
                xProfile: true,
                username: true,
                admin: true,
                createdAt: true,
                pullRequests: true,
                contributedOrgs: {
                    select: {
                        id: true,
                        name: true,
                        avatar_url: true
                    }
                }
            }
        })


        return NextResponse.json({ success: 'true', user: userData, message: 'Your Details have been fetched successfully' }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: 'false', message: 'Something went wrong' }, { status: 500 })
    }
}