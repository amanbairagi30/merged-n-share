import { ProfileChart } from '@/components/profile-views-chart';
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth';
import { getUserProfile } from '@/lib/profile'
import { BriefcaseBusiness, Building2Icon, GitMerge } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const username = user?.username;
    const fetchedUser = await getUserProfile(username);

    return (
        <div className='h-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full'>
                <div className='border-2 border-accent group overflow-hidden relative rounded-md p-4 flex flex-col min-h-[150px] h-full border-[#353535] col-span-1'>
                    <div className='flex-1'>
                        <div className='text-sm font-semibold md:text-lg'>Merged PRs</div>
                        <div className='text-4xl md:text-6xl mt-4'>{fetchedUser?.pullRequests?.length}</div>

                        <section className="flex absolute right-2 opacity-35 md:m-0 group-hover:opacity-100 transition-all duration-700 group-hover:bottom-2 -bottom-6 items-center justify-center">
                            <div
                                className="relative flex items-center justify-center w-20 h-20 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                                style={{
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                <div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                                    <GitMerge className="w-14  md:w-20 text-black h-14" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                                    style={{
                                        mixBlendMode: 'soft-light',
                                    }}
                                />

                                <div
                                    className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                                    style={{
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                                    }}
                                />

                                <div
                                    className="absolute inset-0 opacity-30 animate-pulse"
                                    style={{
                                        background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        backgroundSize: '200% 200%',
                                        animation: 'gradient 3s ease infinite',
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                            </div>
                        </section>
                    </div>
                    {/* <Button className='bg-blue-500 border-none w-full mt-4' variant={'outline'}>View/Create</Button> */}
                </div>
                <div className='border-2 border-accent group overflow-hidden relative rounded-md p-4 flex flex-col min-h-[150px] h-full border-[#353535] col-span-1'>
                    <div className='flex-1'>
                        <div className='text-sm font-semibold md:text-lg'>Organisation contributed</div>
                        <div className='text-4xl md:text-6xl mt-4'>{fetchedUser?.contributedOrgs?.length}</div>
                        <div className='bg-blue-500 absolute right-2 opacity-35 group-hover:opacity-100 transition-all duration-700 group-hover:bottom-2 -bottom-6 w-fit h-fit p-4 rounded-md'>
                            <Building2Icon className='text-white' size='50' />
                        </div>
                    </div>
                    {/* <Button className='bg-blue-500 border-none w-full mt-4' variant={'outline'}>View/Create</Button> */}
                </div>
                <div className='border-2 border-accent group overflow-hidden relative rounded-md p-4 flex flex-col min-h-[150px] h-full border-[#353535] col-span-1'>
                    <div className='flex-1'>
                        <div className='text-sm font-semibold md:text-lg'>Opportunity</div>
                        <div className='text-sm flex text-gray-500 items-center justify-center mt-4'>Coming Soon !</div>
                        <div className='bg-blue-500 absolute right-2 opacity-35 group-hover:opacity-100 transition-all duration-700 group-hover:bottom-2 -bottom-6 w-fit h-fit p-4 rounded-md'>
                            <BriefcaseBusiness className='text-white' size='50' />
                        </div>
                    </div>
                    {/* <Button className='bg-blue-500 border-none w-full mt-4' variant={'outline'}>View/Create</Button> */}
                </div>
                <div className='border-2 border-accent pb-4 rounded-md p-4 flex flex-col border-[#353535] col-span-1 md:col-span-2 lg:col-span-3 min-h-100 md:min-h-96 max-h-fit'>
                    <div className='mb-14'>
                        <div className='flex items-center gap-2'>
                            <div className='text-lg font-semibold'>Profile Views</div>
                            <div className='text-[0.6rem] flex font-semibold items-center justify-center w-fit h-fit px-2 py-1 rounded-md text-white bg-green-700'>NEW</div>
                        </div>

                        <div className='text-gray-500 dark:text-gray-400'>Here you can see your public profile view , if made public</div>
                    </div>
                    <ProfileChart />
                </div>
            </div>
        </div>
    )
}