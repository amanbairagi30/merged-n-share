import ProfileEditForm, { PersonalDetailForm } from '@/components/ProfileEditForm';
import ProfileSwitch from '@/components/ProfileSwitch';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db';
import { getUserProfile, updatedUserProfile } from '@/lib/profile';
import { BadgeDollarSign, ExternalLink, Pencil } from 'lucide-react';
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;


    const getPRData = async () => {
        const response = await prisma.pullRequest.findMany({
            where: {
                // @ts-ignore
                userId: user?.id
            },
            include: {
                org: {
                    select: {
                        name: true,
                        avatar_url: true,
                        github_url: true,
                    }
                }
            }
        });
        return response;
    }

    // @ts-ignore
    const urlUser = await getUserProfile(user?.username)


    const totalPoints = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
        return pr.prPoint + acc
    }, 0);

    const totalBounty = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
        return pr.bounty + acc
    }, 0);

    const prData = await getPRData();

    console.log(prData);

    return (
        <div className=''>
            <main className='flex flex-col border-2 rounded-xl bg-accent/20 border-accent  items-start justify-between'>
                <div className='flex flex-col items-center gap-2 p-6'>
                    <div className='flex items-center gap-4'>
                        <Image className='w-[4rem] md:w-[5rem] h-[4rem] md:h-[5rem] rounded-md' src={user?.image ?? ''} width='400' height='100' alt='user_avatar' />
                        <div className='flex flex-col gap-2'>
                            <div className=' text-lg md:text-xl font-semibold'>{user?.name}</div>
                            {/* @ts-ignore */}
                            {/* <div className='text-xs'>{user?.username}</div> */}
                            <div className='flex gap-2'>
                                <ProfileEditForm user={user} />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            {/* @ts-ignore */}
                                            <Link className='border-2 bg-accent rounded-lg flex items-center gap-2 px-2 py-1' href={`/profile/${user?.username}`} target='_blank'>
                                                <p className='text-sm'>Preview</p>
                                                <ExternalLink className='cursor-pointer' size='15' />
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

                <div className='w-full grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-4 gap-3 border-t-2 mt-4 p-6'>
                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 overflow-hidden rounded-xl'>
                        <p className='text-gray-400 mb-3'>Email</p>
                        <span>{user?.email}</span>
                    </div>
                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                        <p className='text-gray-400 mb-3'>Username</p>
                        {/* @ts-ignore */}
                        <span>{user?.username}</span>
                    </div>
                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                        <p className='text-gray-400 mb-3'>Merged PRs</p>
                        {/* @ts-ignore */}
                        <span>{prData.length}</span>
                    </div>
                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                        <p className='text-gray-400 mb-3'>Profile Visibility</p>
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
            <section className='mt-12 border-2 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl p-6'>
                <div className=' flex flex-col gap-2 '>
                    <p className='text-xl'>Personal Details</p>
                    <span className='text-sm text-gray-300'>Add your personal information here</span>
                </div>

                <PersonalDetailForm />
            </section>
        </div>
    )
}
