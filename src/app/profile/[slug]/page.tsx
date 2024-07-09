import { getUserProfile } from '@/lib/profile';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import x from "@/app/assets/x.svg"

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

    const urlUser: any = await getUserProfile(un)
    console.log(urlUser?.image)
    return (
        <div className=' min-h-screen max-h-fit text-white'>
            <div className='max-w-[1280px] mx-auto mt-4 px-2'>
                <div className='border-2 flex items-center justify-between p-2 rounded-md border-[#353535] text-white'>
                    <div className='flex items-center gap-2'>
                        <Image className='w-[2rem] rounded-md h-[2rem]' src={urlUser?.image ?? ''} width='500' height='500' alt='user_avatar' />
                        <p className='font-semibold text-base'>{urlUser?.username}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <GitHubLogoIcon width={20} height={20}/>
                        <LinkedInLogoIcon width={20} height={20}/>
                        <Image className='w-[1.3rem] h-[1.3rem] invert' src={x} width='500' height='500' alt='x'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
