import { getUserProfile } from '@/lib/profile';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import x from "@/app/assets/x.svg"
import { BadgeDollarSign, Lock, User } from 'lucide-react';
import PRCard from '@/components/PRCard';
import { PullRequest } from '@prisma/client';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import prisma from '@/lib/db';
import PRListings from '@/components/PRListings';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const urlUser: any = await getUserProfile(params.slug)
    if (!urlUser) return {}
    console.log(urlUser)


    return {
        title: `${urlUser?.name}'s Open Source Contributions`,
        description: urlUser?.bio || `Check out ${urlUser?.name}'s open source contributions`,
        openGraph: {
            title: `${urlUser?.name}'s Open Source Contributions`,
            description: urlUser?.bio || `Check out ${urlUser?.name}'s open source contributions`,
            images: [{ url: urlUser?.image || '/default-profile.jpg' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${urlUser?.name}'s Open Source Contributions`,
            description: urlUser?.bio || `Check out ${urlUser?.name}'s open source contributions`,
            images: [urlUser?.image || '/default-profile.jpg'],
        },
    }
}

export default async function PublicProfilePage({ params }: any) {
    const un = params.slug;
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const urlUser: any = await getUserProfile(un)
    console.log(urlUser?.image)

    const organisationData = await prisma.organisations.findMany({
        select: {
            name: true,
            id: true,
            pullRequests: true,
            github_url: true,
            avatar_url: true,
        }
    })

    console.log(organisationData)

    if (!urlUser) {
        return (
            <div className='h-screen w-screen border-2 border-transparent text-white'>
                <div className='max-w-[800px] flex flex-col rounded-lg items-center justify-center p-[2.5rem] border-2 border-[#353535] mx-auto mt-[5rem]'>
                    404 - Not found
                    <p>There is no user with this username</p>
                </div>
            </div>
        )
    }

    // @ts-ignore
    if (!urlUser.isProfilePublic && urlUser?.id !== user?.id) {
        return (
            <>
                <div className='h-screen w-screen border-2 border-transparent text-white'>
                    <div className='max-w-[800px] flex flex-col rounded-lg items-center justify-center p-[2.5rem] border-2 border-[#353535] mx-auto mt-[5rem]'>
                        <Lock size={30} className='my-4' />
                        <header className="flex items-center border-neutral-900 justify-between">
                            <aside className="flex items-center gap-[10px]">
                                <p className="text-neutral-100 text-xl font-extrabold">Merged<span className="text-blue-500">&</span>Share</p>
                            </aside>
                        </header>
                        <div className='flex flex-col items-center justify-center mt-4'>
                            <div>This person&apos;s profile is private</div>
                            <div>React out : {urlUser?.email}</div>
                        </div>

                        <p className='my-[1rem]'>or</p>

                        <button className='flex items-center hover:bg-blue-600 justify-center bg-blue-500 w-fit h-fit rounded-lg py-[1rem] px-[2.5rem]'>Request to make it public</button>
                    </div>
                </div>
            </>
        )
    }



    const totalPoints = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
        return pr.prPoint + acc
    }, 0);

    const totalBounty = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
        return pr.bounty + acc
    }, 0);

    return (
        <div className=' min-h-screen max-h-fit text-white'>
            <div className='max-w-[1280px] mx-auto mt-4 px-2'>
                <div className='border-2 flex items-center justify-between p-2 rounded-md border-[#353535] text-white'>
                    <div className='flex items-center gap-2'>
                        <Image className='w-[2rem] rounded-md h-[2rem]' src={urlUser?.image ?? ''} width='500' height='500' alt='user_avatar' />
                        <p className='font-semibold text-base'>{urlUser?.username}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link href={`https://github.com/${urlUser?.username}`} target='_blank'>
                            <GitHubLogoIcon width={20} height={20} />
                        </Link>
                        <Link href={urlUser?.linkedInProfile} target='_blank'>
                            <LinkedInLogoIcon width={20} height={20} />
                        </Link>
                        <Link href={urlUser?.xProfile} target='_blank'>
                            <Image className='w-[1.3rem] h-[1.3rem] invert' src={x} width='500' height='500' alt='x' />
                        </Link>
                    </div>
                </div>

                <div className='px-2 my-8 border-b-2 pb-6 border-[#35353578]'>
                    <div className='text-sm flex items-center justify-between gap-2 text-gray-400'>
                        <p>Hi ! This is</p>
                        <div>
                            <button className="relative inline-flex h-fit overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                                <div className="inline-flex gap-2 h-fit w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl">
                                    <p className='hidden md:block'>Contirbuted in {10}+ orgs</p>
                                    <p className='block md:hidden'>Orgs</p>
                                    <div className='flex gap-1'>
                                        <Image className='!w-[1.5rem] !h-[1.5rem] rounded-full' src={urlUser?.image} width='500' height='500' alt='org' />
                                        <Image className='!w-[1.5rem] !h-[1.5rem] rounded-full' src={urlUser?.image} width='500' height='500' alt='org' />
                                        <Image className='!w-[1.5rem] !h-[1.5rem] rounded-full' src={urlUser?.image} width='500' height='500' alt='org' />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='text-[2.5rem] flex flex-col leading-[2.2rem] my-2 font-semibold'>
                        <p>{urlUser.name}</p>
                        <div>
                            <button className="relative inline-flex h-fit overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                                <div className="inline-flex h-fit w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl">
                                    #7 ranked among 89+ contributers in code100x
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 w-full'>
                        <div className='mt-2 border-2 border-yellow-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                            <span className='text-xs md:text-sm '>{totalPoints}</span>
                        </div>

                        <div className='mt-2 border-2 border-green-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <BadgeDollarSign size={18} className='text-green-500' />
                            {/* <span className='text-sm'>{bounty[0]}</span> */}
                            <span className='text-xs md:text-sm '>{totalBounty}</span>
                        </div>
                    </div>
                </div>
                <div className='px-2 '>
                    <div className='flex my-4 justify-between items-center'>
                        <p>Merged PRs</p>
                        {/* <h1 className='text-gray-300 '>List of PR got merged of {urlUser?.name}</h1> */}
                        <p>Total {urlUser?.pullRequests.length} merged PRs</p>


                    </div>
                    <PRListings
                        urlUser={urlUser}
                        user={user}
                        organisationData={organisationData}
                    />
                </div>

            </div>
        </div>
    )
}
