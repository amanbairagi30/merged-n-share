'use server';

import prisma from '@/lib/db';

export async function updateUserContributedOrgs(userId: any, orgIds: any[]) {
  try {
    const connectData = orgIds.map((orgId: any) => ({ id: orgId }));

    await prisma.user.update({
      where: { id: userId },
      data: {
        contributedOrgs: {
          connect: connectData,
        },
      },
    });
  } catch (error) {
    console.error('Error updating user contributed orgs:', error);
    throw new Error('Failed to update user contributed organizations');
  }
}
