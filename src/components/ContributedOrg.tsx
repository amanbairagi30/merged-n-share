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
            <div className='flex gap-1'>
                {
                    contributions?.map((item: Organisations, index: number) => {
                        if (index > 7) {
                            return null;
                        }
                        return (
                            <>
                                <Image key={item.id} className='!w-[1.5rem] shadow-lg !h-[1.5rem] rounded-full' src={item?.avatar_url || ''} width='500' height='500' alt='org' />
                            </>
                        )
                    })
                }
                {
                    contributions?.length === 0 && "No contributions yet"
                }
            </div>
        </div>
    )
}
