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

        const updatedUser = await prisma.user.updateMany({
            where: {
                id: userId,
            },
            data: {
                name: body.name
            }

        })

        return NextResponse.json({success: 'true', message: 'Your name has been updated' }, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({success: 'false', message: 'Something went wrong' }, { status: 500 })
    }
}