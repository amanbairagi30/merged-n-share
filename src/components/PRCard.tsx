import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BadgeDollarSign, EllipsisVertical, Link2, LucideExternalLink } from 'lucide-react';
import Link from 'next/link';
import PointIcon from "../app/assets/point.png";
import Image from 'next/image';

export default function PRCard({ user, PRData }: any) {
    const { prURL,
        mergedAt,
        prTitle,
        prNumber,
        repoURL,
        bounty,
        avatar,
        prPoint,
        userName,
        commentURL,
        isVerified,
        body,
        draft
    } = PRData;

    const renderPRQualityViaBounty = (bt: any) => {
        console.log(typeof bt)
        const bountyAmount = Number(typeof bt === 'string' && bt.replace("$",""));
        if(bountyAmount === 0 || !bountyAmount) {
            return {
                textColor: "text-gray-500",
                bgColor: "bg-gray-500",
                text: "Begineer"
            }
        }
        else if (bountyAmount > 0 && bountyAmount <= 30) {
            return {
                textColor: "text-gray-500",
                bgColor: "bg-gray-500",
                text: "Basic"
            }
        } else if (bountyAmount > 30 && bountyAmount <= 60) {
            return {
                textColor: "text-yellow-500",
                bgColor: "bg-yellow-500",
                text: "Decent"
            }
        } else if (bountyAmount > 60 && bountyAmount <= 80) {
            return {
                textColor: "text-yellow-500",
                bgColor: "bg-yellow-500",
                text: "Good"
            }
        } else if (bountyAmount > 80 && bountyAmount <= 150) {
            return {
                textColor: "text-orange-500",
                bgColor: "bg-orange-500",
                text: "Great"
            }
        } else if (bountyAmount > 150 && bountyAmount <= 250) {
            return {
                textColor: "text-purple-500",
                bgColor: "bg-purple-500",
                text: "Excellent"
            }
        } else if (bountyAmount > 250 && bountyAmount <= 500) {
            return {
                textColor: "text-green-500",
                bgColor: "bg-green-500",
                text: "Outstanding"
            }
        } else if (bountyAmount > 500) {
            return {
                textColor: "text-green-500",
                bgColor: "bg-green-500",
                text: "Exceptional"
            }
        }
    }

    return (
        <>
            <div className='border-2 border-slate-800 hover:transition-all hover:duration-700 hover:ease-linear hover:border-blue-500 hover:border-2 bg-[#101010] flex flex-col cursor-pointer rounded-lg h-[20rem] p-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 items-center'>
                            <span className='font-semibold text-lg border-r-2 pr-2'>code100x</span>
                            <span className='text-xs opacity-75'>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(mergedAt)).replace(/(^\w{3})/, (match) => match.toUpperCase())}</span>
                        </div>

                        {/* <div className='text-xs font-semibold opacity-75'>Merged on : Apr 1, 2024</div> */}
                    </div>
                    <div className="!w-[2.5rem]  rounded-full flex items-center p-[0.2rem]  justify-center !h-[2.5rem]">
                        <Avatar>
                            <AvatarImage className='rounded-full' src={avatar || ''} alt="@shadcn" />
                            <AvatarFallback className='bg-[#fff]!w-[2.5rem]  rounded-full flex items-center p-[0.2rem]  justify-center !h-[2.5rem] text-black'>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className='mt-4  flex-1'>
                    <div className='mb-2 flex items-center gap-2'>
                        <span className='flex items-center gap-1 text-sm'>{repoURL.split("/")[repoURL.split("/").length - 1]}</span>
                        <span className='text-md opacity-75'>#{prNumber}</span>
                    </div>
                    <span className='text-2xl font-[600]'>{prTitle.slice(0, 40)}...</span>
                    <div className='flex items-center gap-2'>
                        <div className='mt-2 border-2 border-yellow-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                            <Image width='400' height='400' className='w-[1rem] h-[1rem]' src="https://img.icons8.com/3d-fluency/94/dollar-coin.png" alt="coin-image" />
                            <span className='text-sm'>{prPoint}</span>
                        </div>
                        {
                            bounty.length !== 0 && (
                                <div className='mt-2 border-2 border-green-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                                    <BadgeDollarSign size={18} className='text-green-500' />
                                    {/* <span className='text-sm'>{bounty[0]}</span> */}
                                    <span className='text-sm'>{bounty}</span>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* <div className='flex gap-2 flex-wrap basis-1'>
                    <div className='text-xs h-fit w-fit rounded-full border-2 px-3 py-1'>
                        Next.Js
                    </div>
                    <div className='text-xs h-fit w-fit rounded-full border-2 px-3 py-1'>
                        React.JS
                    </div>
                    <div className='text-xs h-fit w-fit rounded-full border-2 px-3 py-1'>
                        PostgresSQL
                    </div>
                    <div className='text-xs h-fit w-fit rounded-full border-2 px-3 py-1'>
                        MongoDB
                    </div>
                    <div className='text-xs h-fit w-fit rounded-full border-2 px-3 py-1'>
                        Prisma
                    </div>
                    <div className='text-xs h-fit w-fit rounded-full border-2 px-3 py-1'>
                        Excellent
                    </div>
                </div> */}
                <div className='mt-4 flex items-center justify-between '>
                    <div className={`text-sm h-fit w-fit rounded-full ${renderPRQualityViaBounty(bounty)?.textColor} font-bold flex items-center gap-2`}>
                        <div className={`h-[0.5rem]  rounded-full w-[0.5rem] ${renderPRQualityViaBounty(bounty)?.bgColor} `}></div>
                        {renderPRQualityViaBounty(bounty)?.text}
                    </div>
                    <div  className='flex underline items-center gap-2'>
                        <Link href={prURL} target='_blank' className='flex items-center gap-1'>PR <LucideExternalLink size={15} /></Link>
                        <span className=''><EllipsisVertical /></span>
                    </div>
                </div>
            </div>

        </>
    )
}
