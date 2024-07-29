'use client'
import { Organisations } from '@prisma/client';
import Image from 'next/image';
import React from 'react'

interface ContributionType {
    contributions: Organisations[]
}

export default function ContributedOrg({ contributions }: ContributionType) {
    return (
        <div>
            <button className="relative inline-flex h-fit overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                <div className="inline-flex gap-2 h-fit w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl">
                    <p className='hidden md:block'>Contirbuted in {contributions?.length}+ orgs</p>
                    <p className='block md:hidden'>Orgs</p>
                    <div className='flex gap-1'>
                        {
                            contributions?.map((item: Organisations, index: number) => {
                                if (index > 2) {
                                    return null;
                                }
                                return (
                                    <Image className='!w-[1.5rem] !h-[1.5rem] rounded-full' src={item?.avatar_url || ''} width='500' height='500' alt='org' />
                                )
                            })
                        }
                    </div>
                </div>
            </button>
        </div>
    )
}
