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
        },
    })

    return user;
}