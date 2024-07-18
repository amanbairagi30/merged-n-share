import ProfileEditForm, { PersonalDetailForm } from '@/components/ProfileEditForm';
import ProfileSwitch from '@/components/ProfileSwitch';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db';
import { updatedUserProfile } from '@/lib/profile';
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

    const prData = await getPRData();

    console.log(prData);

    return (
        <div className='text-white'>
            <main className='flex border-b border-[#35353588] pb-6 items-start justify-between'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='flex items-start gap-2'>
                        <Image className='w-[2rem] h-[2rem] rounded-md' src={user?.image ?? ''} width='400' height='100' alt='user_avatar' />
                        <div>
                            <div className='text-sm font-semibold'>{user?.name}</div>
                            {/* @ts-ignore */}
                            <div className='text-xs text-gray-400'>{user?.username}</div>
                        </div>
                        <div className='flex gap-2'>
                            <ProfileEditForm user={user} />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {/* @ts-ignore */}
                                        <Link href={`/profile/${user?.username}`} target='_blank'>
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
                    <div className='flex items-center gap-2 w-full'>
                        <div className='mt-2 border-2 border-yellow-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                            <span className='text-xs md:text-sm '>1000</span>
                        </div>

                        <div className='mt-2 border-2 border-green-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <BadgeDollarSign size={18} className='text-green-500' />
                            {/* <span className='text-sm'>{bounty[0]}</span> */}
                            <span className='text-xs md:text-sm '>$4000</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-6 items-center'>
                    <div>
                        <button className="relative inline-flex h-fit overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                            <div className="inline-flex h-fit w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl">
                                {prData.length} PR merged
                            </div>
                        </button>
                    </div>
                    <ProfileSwitch />
                </div>
            </main>
            <section className='mt-4'>
                <div className=''>Personal Details</div>

               <PersonalDetailForm />
            </section>
        </div>
    )
}
