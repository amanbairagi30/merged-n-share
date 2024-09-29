import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Organisations } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// to approve or disapprove an organisation
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    try {


        const { id, name, github_url, avatar_url } = await req.json();

        console.log(session?.user);

        // @ts-ignore
        const userId = session?.user?.id;

        // @ts-ignore
        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID not found" });
        }
        //@ts-ignore
        // if (session?.user?.admin == false) {
        //     return NextResponse.json({ success: false, message: "UnAuthorized User" }, { status: 403 });
        // }

        const organisation = await prisma.organisations.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (organisation) {
            await prisma.organisations.delete({
                where: {
                    id: parseInt(id),
                },
            });
            return NextResponse.json({ success: true, msg: "Organisation Disapproved Successfully", action: "disapproved" });
        } else {
            await prisma.organisations.create({
                data: {
                    id: parseInt(id),
                    name: name,
                    github_url: github_url,
                    avatar_url: avatar_url,
                    contributors: {
                        connect: { id: userId }, // Link the user to the organization
                    },
                },
            });
            return NextResponse.json({ success: true, msg: "Organisation Approved Successfully", action: "approved" });
        }

    } catch (error) {
        console.error("Error creating pull requests:", error);
        return NextResponse.json({ success: false, message: "Failed" });
    }
}


// to get all the orgnisations 
export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    try {
        //@ts-ignore
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID not found" });
        }
        //@ts-ignore
        // if (session?.user?.admin == false) {
        //     return NextResponse.json({ success: false, message: "UnAuthorized User" }, { status: 403 });
        // }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { contributedOrgs: true },
        });

        if (user) {
            return NextResponse.json({ success: true, organisations: user.contributedOrgs }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error creating pull requests:", error);
        return NextResponse.json({ success: false, message: "Failed" });
    }
}