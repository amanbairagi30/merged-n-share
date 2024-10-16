import { LeaderboardEntry } from '@/util/types'
import { BadgeDollarSign, LucideExternalLink } from 'lucide-react'
import { User } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

interface LeaderboardCardProps {
    leaderboard: LeaderboardEntry,
    currUser: User
}

export default function LeaderboardCard({ leaderboard, currUser }: any) {
    return (
        <div>
            <ul className='mt-[2rem] flex flex-col gap-[1.5rem] items-center'>
                <div className='flex items-end justify-around w-full lg:w-[50%] pb-4 h-80'>
                    {leaderboard.map((user: any, index: number) => {
                        if (index < 3) {
                            const first = index === 0;
                            const second = index === 1;
                            // const third = index === 2;

                            return (
                                <div
                                    key={index}
                                    className={`px-4 relative w-[30%] h-full flex flex-col items-center justify-end ${first ? "order-2" : second ? "order-1" : "order-3"
                                        }`}
                                >
                                    <div className={`absolute ${first ? "-top-14" : second ? "-top-4" : " top-2"} opacity-50 font-semibold bg-gradient-to-b from-primary text-transparent bg-clip-text text-8xl`}>{index + 1} </div>
                                    <div>Rank</div>
                                    {currUser?.id === user?.id && <div className='bg-primary mb-2 text-black font-bold rounded-md text-[0.6rem] px-2 h-fit flex items-center justify-center '>YOU</div>}
                                    <div
                                        className={`border-2 border-primary bg-primary/10 rounded-t-xl flex flex-col items-center py-2 w-fit p-2 ${first ? "h-full" : second ? "h-[85%]" : "h-[75%]"
                                            }`}
                                    >
                                        <div className='w-[7rem] h-[7rem] '>
                                            <Image src={user?.image} className='w-full rounded-lg h-full' width='1500' height='1500' alt='user_image' />
                                        </div>
                                        <div className='text-base mt-2 flex flex-col flex-1 items-center justify-start font-semibold'>
                                            <div className='flex gap-2'>
                                                <p>{user?.name?.split(" ")[0]}</p>
                                                {currUser?.id === user?.id && <div className='bg-blue-500 rounded-md text-[0.6rem] px-2 h-fit flex items-center justify-center '>YOU</div>}
                                            </div>
                                            <div className='rounded-full gap-1 flex items-center'>
                                                <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                                                <span className='text-sm'>{user?.totalPoints}</span>
                                            </div>
                                        </div>
                                        <Link href={`${process.env.NEXT_PUBLIC_URL}/profile/${user?.username}`} target='_blank' className='flex items-center text-xs justify-between bg-primary text-black font-bold w-full py-1 px-2 rounded-md cursor-pointer'>
                                            Profile
                                            <LucideExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>


                {leaderboard.map((user: any, index: number) => {
                    if (index >= 3) {
                        return (
                            // @ts-ignore
                            <li className={`border-2 ${currUser?.id === user?.id ? 'border-primary' : ' '} flex rounded-lg w-full lg:w-[60%] h-fit`} key={user.id}>
                                {/* {user.name || user.username} - {user.totalPoints} - {user.bounties} points */}
                                <div className='w-[7rem] h-[7rem] '>
                                    <Image src={user?.image} className='w-full rounded-l-lg h-full' width='1500' height='1500' alt='user_image' />
                                </div>

                                <div className={`${currUser?.id === user?.id ? ' border-primary' : ''} flex-1 flex flex-col p-2 px-3 h-[7rem]`}>
                                    <div className='text-base flex items-center justify-between font-semibold'>
                                        <div className='flex gap-2'>
                                            <p>{user?.name}</p>
                                            {currUser?.id === user?.id && <div className='bg-primary rounded-md text-[0.6rem] px-2 h-fit flex items-center justify-center text-black'>YOU</div>}
                                        </div>
                                        <Link href={`${process.env.NEXT_PUBLIC_URL}/profile/${user?.username}`} target='_blank' className='flex items-center text-sm cursor-pointer'><LucideExternalLink size={16} /></Link>
                                    </div>
                                    <div className='text-sm flex-1 text-slate-400 font-semibold'>{user?.username}</div>

                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className='mt-2 rounded-full gap-1 flex items-center'>
                                                <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                                                <span className='text-sm'>{user?.totalPoints}</span>
                                            </div>
                                            <div className='mt-2 rounded-full gap-1 flex items-center'>
                                                <BadgeDollarSign size={18} className='text-green-500' />
                                                {/* <span className='text-sm'>{bounty[0]}</span> */}
                                                <span className='text-sm'>{user?.bounties}</span>
                                            </div>
                                        </div>

                                        {/* <div onClick={() => toast.success('Coming Soon !')} className='w-fit px-2 py-1 rounded-sm cursor-pointer bg-blue-500 text-sm'>Hire/Refer</div> */}
                                    </div>
                                </div>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    )
}
