import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Organisations } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// to approve or disapprove an organisation
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    try {
        

        const {id,name,github_url,avatar_url} = await req.json();

        console.log(session?.user);

        // @ts-ignore
        if (!session?.user?.id) {
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
            return NextResponse.json({ success: true, msg: "Organisation Disapproved Successfully",action:"disapproved"});
        } else {
            await prisma.organisations.create({
                data: {
                    id: parseInt(id),
                    name: name,
                    github_url:github_url,
                    avatar_url:avatar_url
                },
            });
            return NextResponse.json({ success: true, msg: "Organisation Approved Successfully",action:"approved"});
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

        const organisations = await prisma.organisations.findMany();

        if (organisations) {
            return NextResponse.json({ success: true, organisations},{status:200});
        }
    } catch (error) {
        console.error("Error creating pull requests:", error);
        return NextResponse.json({ success: false, message: "Failed" });
    }
}