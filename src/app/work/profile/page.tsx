import ProfileEditForm, {
  PersonalDetailForm,
} from '@/components/ProfileEditForm';
import ProfileSwitch from '@/components/ProfileSwitch';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getUserProfile, updatedUserProfile } from '@/lib/profile';
import { BadgeDollarSign, ExternalLink, Pencil } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const getPRData = async () => {
    const response = await prisma.pullRequest.findMany({
      where: {
        // @ts-ignore
        userId: user?.id,
      },
      include: {
        org: {
          select: {
            name: true,
            avatar_url: true,
            github_url: true,
          },
        },
      },
    });
    return response;
  };

  // @ts-ignore
  const urlUser = await getUserProfile(user?.username);

  const totalPoints = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
    return pr.prPoint + acc;
  }, 0);

  const totalBounty = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
    return pr.bounty + acc;
  }, 0);

  const prData = await getPRData();

  console.log(prData);

  return (
    <div className="">
      <main className="flex flex-col items-start justify-between rounded-xl border-2 border-accent bg-accent/20">
        <div className="flex flex-col items-center gap-2 p-6">
          <div className="flex items-center gap-4">
            <Image
              className="h-[4rem] w-[4rem] rounded-md md:h-[5rem] md:w-[5rem]"
              src={user?.image ?? ''}
              width="400"
              height="100"
              alt="user_avatar"
            />
            <div className="flex flex-col gap-2">
              <div className="text-lg font-semibold md:text-xl">
                {user?.name}
              </div>
              {/* @ts-ignore */}
              {/* <div className='text-xs'>{user?.username}</div> */}
              <div className="flex gap-2">
                <ProfileEditForm user={user} />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* @ts-ignore */}
                      <Link
                        className="flex items-center gap-2 rounded-lg border-2 bg-accent px-2 py-1"
                        href={`/profile/${user?.username}`}
                        target="_blank"
                      >
                        <p className="text-sm">Public Profile</p>
                        <ExternalLink className="cursor-pointer" size="15" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preview</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          {/* <div className='flex items-center gap-2 w-full'>
                        <div className='mt-2 border-2 border-yellow-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                            <span className='text-xs md:text-sm '>{totalPoints}</span>
                        </div>

                        <div className='mt-2 border-2 border-green-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <BadgeDollarSign size={18} className='text-green-500' />
                            <span className='text-xs md:text-sm '>{totalBounty}</span>
                        </div>
                    </div> */}
        </div>

        <div className="sm:gird-cols-2 mt-4 grid w-full grid-cols-1 gap-3 border-t-2 p-6 lg:grid-cols-4">
          <div className="col-span-1 overflow-hidden rounded-xl bg-accent p-4 dark:bg-muted/80">
            <p className="mb-3 dark:text-gray-400">Email</p>
            <span>{user?.email}</span>
          </div>
          <div className="col-span-1 rounded-xl bg-accent p-4 dark:bg-muted/80">
            <p className="mb-3 dark:text-gray-400">Username</p>
            {/* @ts-ignore */}
            <span>{user?.username}</span>
          </div>
          <div className="col-span-1 rounded-xl bg-accent p-4 dark:bg-muted/80">
            <p className="mb-3 dark:text-gray-400">Merged PRs</p>
            {/* @ts-ignore */}
            <span>{prData.length}</span>
          </div>
          <div className="col-span-1 rounded-xl bg-accent p-4 dark:bg-muted/80">
            <p className="mb-3 dark:text-gray-400">Profile Visibility</p>
            {/* @ts-ignore */}
            <ProfileSwitch />
          </div>
        </div>

        {/* <div className='flex border-2 flex-col md:flex-row gap-6 items-center'>
                    <div>
                        <button className="relative inline-flex h-fit overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                            <div className="inline-flex h-fit w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl">
                                {prData.length} PR merged
                            </div>
                        </button>
                    </div>
                    
                </div> */}
      </main>
      <section className="mt-12 grid grid-cols-1 gap-2 rounded-xl border p-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xl">Personal Details</p>
          <span className="text-sm text-gray-300">
            Add your personal information here
          </span>
        </div>

        <PersonalDetailForm />
      </section>
    </div>
  );
}
