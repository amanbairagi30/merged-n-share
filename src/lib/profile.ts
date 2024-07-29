import prisma from "./db";

export async function getUserProfile(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            pullRequests: {
                include: {
                    org: true,
                }
            },
            contributedOrgs: true,
        },
    })

    return user;
}

export async function updatedUserProfile(e: any) {
    const updatedData = await prisma.user.update({
        where: {
            // @ts-ignore
            id: user?.id
        },
        data: {
            isProfilePublic: e
        }
    })
}