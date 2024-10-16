import { getUserProfile } from '@/lib/profile';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import x from "@/app/assets/x.svg"
import { BadgeDollarSign, Lock, LockIcon, Rss, User } from 'lucide-react';
import PRCard from '@/components/PRCard';
import { Organisations, PullRequest } from '@prisma/client';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import prisma from '@/lib/db';
import PRListings from '@/components/PRListings';
import Link from 'next/link';
import ContributedOrg from '@/components/ContributedOrg';
import RequestAccessButton from '@/components/RequestAccessButton';
import MarketingNavbar from '@/components/fixed-marketing-navbar';
import { Badge } from '@/components/ui/badge';
import X from '@/components/svgs/x';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import HomeButton from '@/components/home-button';
import ProfileView from '@/components/profile-view';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const urlUser: any = await getUserProfile(params.slug)
    if (!urlUser) return {}
    console.log(urlUser)

    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/api/og-images/public-profile`)
    ogUrl.searchParams.set("username", urlUser?.username)
    ogUrl.searchParams.set("name", urlUser?.name)
    ogUrl.searchParams.set("org", urlUser?.contributedOrgs?.length)
    ogUrl.searchParams.set("pr", urlUser?.pullRequests?.length)

    return {
        title: `${urlUser?.name}'s Open Source Contributions`,
        description: urlUser?.bio || `Check out ${urlUser?.name}'s open source contributions`,
        openGraph: {
            title: `${urlUser?.name}'s Open Source Contributions`,
            description: urlUser?.bio || `Check out ${urlUser?.name}'s open source contributions`,
            images: ogUrl?.toString(),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${urlUser?.name}'s Open Source Contributions`,
            description: urlUser?.bio || `Check out ${urlUser?.name}'s open source contributions`,
            images: ogUrl?.toString(),
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

    console.log(organisationData);

    if (!urlUser) {
        return (
            <div className='h-screen'>
                <MarketingNavbar />
                <div className='flex flex-col justify-between h-full'>
                    <div className=''>
                        <div className='h-80 border-b-2 bg-accent/50'></div>
                        <div className='h-fit pt-16 md:pt-24 mb-12 rounded-b-2xl min-h-[10rem] max-w-7xl mx-auto relative'>
                            <div className='border shadow-2xl rounded-xl absolute left-[50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[40%] bg-accent -top-[10rem] min-h-[20rem] max-h-fit p-4'>
                                <div className='flex flex-col items-center justify-center gap-2'>
                                    <div className='bg-primary/20 border-2 my-4 w-[4.5rem] md:!w-[5.5rem] h-fit md:h-fit p-2 rounded-md flex items-center justify-center border-primary'>
                                        <span className='font-secondary text-3xl'>404</span>
                                    </div>
                                    {/* <Image className='w-[4.5rem] md:w-[5.5rem] h-[4.5rem] md:h-[5.5rem] rounded-md' src={urlUser?.image ?? ''} width='400' height='100' alt='user_avatar' /> */}
                                    <div className='flex text-center flex-col w-full'>
                                        {/* <h2 className='text-xs'>Hi , This is </h2> */}
                                        <div className=' text-lg md:text-2xl lg:text-3xl font-semibold'>Profile Not Found</div>
                                        <p className='mt-6 text-lg dark:text-gray-300'>
                                            We tried our best but we couldn&apos;t find the user contributions and other details associated with the username <strong className='italic'>{un}</strong>
                                        </p>
                                    </div>
                                    <HomeButton />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='max-w-[1440px] mx-auto w-full px-4 my-12'>
                        <Footer />
                    </div>
                </div>

            </div>
        )
    }

    // @ts-ignore
    if (!urlUser.isProfilePublic && urlUser?.id !== user?.id) {
        return (
            <>
                <div className='h-screen'>
                    <MarketingNavbar />
                    <div className='flex flex-col justify-between h-full'>
                        <div className=''>
                            <div className='h-48 border-b-2 bg-accent/50'></div>
                            <div className=' border-b-2 h-fit pt-16 md:pt-24 mb-12 border-l-2 border-r-2 rounded-b-2xl min-h-[10rem] max-w-7xl mx-auto relative'>
                                <div className='border shadow-2xl rounded-xl absolute left-[50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[50%] bg-accent -top-[3.5rem] h-fit p-4'>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-primary/20 border-2 w-[4.5rem] md:!w-[5.5rem] h-[4.5rem] md:h-[5.5rem] rounded-md flex items-center justify-center border-primary'>
                                            <LockIcon className='w-10 h-10 text-primary' />
                                        </div>
                                        {/* <Image className='w-[4.5rem] md:w-[5.5rem] h-[4.5rem] md:h-[5.5rem] rounded-md' src={urlUser?.image ?? ''} width='400' height='100' alt='user_avatar' /> */}
                                        <div className='flex flex-col w-[85%] md:gap-2'>
                                            {/* <h2 className='text-xs'>Hi , This is </h2> */}
                                            <div className=' text-lg md:text-2xl lg:text-3xl font-semibold'>{urlUser?.name}</div>
                                            <p className='leading-[20px] text-sm  dark:text-gray-300'>This profile has been made private by the owner of this profile , To see this profile please contact the owner of this profile </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full blur-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   p-6'>
                                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 overflow-hidden rounded-xl'>
                                        <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Contributed Orgs ({urlUser?.contributedOrgs?.length})</p>
                                        <span>Private</span>
                                    </div>
                                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                                        <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Merged PRs</p>
                                        {/* @ts-ignore */}
                                        <span>Private</span>
                                    </div>
                                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                                        <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Username</p>
                                        {/* @ts-ignore */}
                                        <span>Private</span>
                                    </div>
                                    <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                                        <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Email</p>
                                        {/* @ts-ignore */}
                                        <span>Private</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='max-w-[1440px] mx-auto p-4 rounded-xl'>

                            {/* <div className='mt-12 flex gap-2 border-2 p-4 rounded-xl'>
                            <Rss className='w-6 h-6 -rotate-90' />
                            <div className='flex flex-col gap-2'>
                                <p>Request</p>
                                <span>You can aslo request the user to make their profile public by pinging them </span>
                            </div>
                        </div> */}
                        </div>

                        <div className='max-w-[1440px] mx-auto w-full px-4 my-12'>
                            <Footer />
                        </div>
                    </div>

                </div>
            </>
        )
    }

    console.log(urlUser?.contributedOrgs)


    const totalPoints = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
        return pr.prPoint + acc
    }, 0);

    const totalBounty = urlUser?.pullRequests?.reduce((acc: any, pr: any) => {
        return pr.bounty + acc
    }, 0);

    return (
        <>
            <ProfileView userId={urlUser.id} currentUserId={user?.id} />
            {
                (urlUser?.id === user?.id && !urlUser.isProfilePublic) ? (

                    <div className='border-2 bg-primary/10 text-center p-4'>
                        Hi <strong>{user?.name}</strong> , When your profile is <strong>private</strong>, only you can see this page , while others will <strong>not be able</strong> to access this page
                    </div>
                ) : (
                    <MarketingNavbar />
                )
            }
            <div className=' min-h-screen max-h-fit'>
                <div className='h-48 border-b-2 bg-accent/50'></div>
                <div className=' border-b-2 h-fit pt-16 md:pt-24 mb-12 border-l-2 border-r-2 rounded-b-2xl min-h-[10rem] max-w-7xl mx-auto relative'>
                    <div className='border shadow-2xl rounded-xl absolute left-[50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[50%] bg-accent -top-[3.5rem] h-fit p-4'>
                        <div className='flex items-center gap-4'>
                            <Image className='w-[4.5rem] md:w-[5.5rem] h-[4.5rem] md:h-[5.5rem] rounded-md' src={urlUser?.image ?? ''} width='400' height='100' alt='user_avatar' />
                            <div className='flex flex-col gap-2'>
                                <div>
                                    {/* <h2 className='text-xs'>Hi , This is </h2> */}
                                    <div className=' text-lg md:text-2xl lg:text-3xl font-semibold'>{urlUser?.name}</div>
                                </div>
                                {/* @ts-ignore */}
                                {/* <div className='text-xs'>{user?.username}</div> */}
                                <div className='flex items-center gap-4'>
                                    <Link href={`https://github.com/${urlUser?.username}`} target='_blank'>
                                        <Badge className='flex gap-2 items-center'>
                                            <span className='hidden sm:block'>Github</span>
                                            <GitHubLogoIcon className='w-5 h-5' />
                                        </Badge>
                                    </Link>
                                    {
                                        urlUser?.linkedInProfile &&
                                        <Link href={urlUser?.linkedInProfile || ''} target='_blank'>
                                            <Badge className='flex gap-2 items-center'>
                                                <span className='hidden sm:block'>LinkedIn</span>
                                                <LinkedInLogoIcon className='w-5 h-5' />
                                            </Badge>
                                        </Link>
                                    }

                                    {
                                        urlUser?.xProfile &&
                                        <Link href={urlUser?.xProfile || ''} target='_blank'>
                                            <Badge className='flex gap-2 items-center'>
                                                <span className='hidden sm:block'>Twitter / X</span>
                                                <X className='w-5 h-5' />
                                                {/* <Image className='w-[1.2rem] h-[1.2rem]' src={x} width='500' height='500' alt='x' /> */}
                                            </Badge>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   p-6'>
                        <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 overflow-hidden rounded-xl'>
                            <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Contributed Orgs ({urlUser?.contributedOrgs?.length})</p>
                            <ContributedOrg
                                contributions={urlUser?.contributedOrgs}
                            />
                        </div>
                        <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                            <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Merged PRs</p>
                            {/* @ts-ignore */}
                            <span>{urlUser?.pullRequests.length}</span>
                        </div>
                        <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                            <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Username</p>
                            {/* @ts-ignore */}
                            <span>{user?.username}</span>
                        </div>
                        <div className='bg-accent col-span-1 dark:bg-muted/80 p-4 rounded-xl'>
                            <p className='text-gray-600 dark:text-gray-400 mb-3 font-extrabold'>Email</p>
                            {/* @ts-ignore */}
                            <span>{urlUser?.email}</span>
                        </div>
                    </div>
                </div>

                <div className='max-w-[1440px] mx-auto p-4 rounded-xl'>
                    <PRListings
                        urlUser={urlUser}
                        user={user}
                        organisationData={urlUser?.contributedOrgs}
                    />
                </div>

                <div className='max-w-[1440px] mx-auto px-4 my-12'>
                    <Footer />
                </div>

                {/* <div className='max-w-[1280px] mx-auto mt-4 px-2'>
                <div className='border-2 flex items-center justify-between p-2 rounded-md border-accent '>
                    <div className='flex items-center gap-2'>
                        <Image className='w-[2rem] rounded-md h-[2rem]' src={urlUser?.image ?? ''} width='500' height='500' alt='user_avatar' />
                        <p className='font-semibold text-base'>{urlUser?.username}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link href={`https://github.com/${urlUser?.username}`} target='_blank'>
                            <GitHubLogoIcon width={20} height={20} />
                        </Link>
                        {
                            urlUser?.linkedInProfile &&
                            <Link href={urlUser?.linkedInProfile || ''} target='_blank'>
                                <LinkedInLogoIcon width={20} height={20} />
                            </Link>
                        }

                        {
                            urlUser?.xProfile &&
                            <Link href={urlUser?.xProfile || ''} target='_blank'>
                                <Image className='w-[1.3rem] h-[1.3rem] invert' src={x} width='500' height='500' alt='x' />
                            </Link>
                        }
                    </div>
                </div>

                <div className='px-2 my-8 border-b-2 pb-6 border-[#35353578]'>
                    <div className='text-sm flex items-center justify-between gap-2 text-gray-400'>
                        <p>Hi ! This is</p>
                        <div>
                            <ContributedOrg
                                contributions={urlUser?.contributedOrgs}
                            />
                        </div>
                    </div>
                    <div className='text-[2.5rem] flex flex-col leading-[2.2rem] my-2 font-semibold'>
                        <p>{urlUser.name}</p>
                      
                    </div>
                    <div className='flex items-center gap-2 w-full'>
                        <div className='mt-2 border-2 border-yellow-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                            <span className='text-xs md:text-sm '>{totalPoints}</span>
                        </div>

                        <div className='mt-2 border-2 border-green-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <BadgeDollarSign size={18} className='text-green-500' />
                            <span className='text-xs md:text-sm '>{totalBounty}</span>
                        </div>
                    </div>
                </div>
                <div className='px-2 '>
                    <div className='flex my-4 justify-between items-center'>
                        <p>Merged PRs</p>
                        <p>Total {urlUser?.pullRequests.length} merged PRs</p>


                    </div>
                    <PRListings
                        urlUser={urlUser}
                        user={user}
                        organisationData={organisationData}
                    />
                </div>

            </div> */}
            </div>
        </>
    )
}
