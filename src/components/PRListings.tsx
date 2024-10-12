'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Organisations } from '@prisma/client';
import Image from 'next/image';
import PRCard from './PRCard';

export default function PRListings({ urlUser, user, pullRequests, organisationData }: any) {
    const [selectedOrg, setSelectedOrg] = useState('')
    const [isOrgAndPRMatched, setIsOrgAndPRMatched] = useState(false)

    const checkIfAnyPRMatches = () => {
        return urlUser?.pullRequests?.some((item: any) => item.org.id === selectedOrg)
    }

    const filteredPullRequests = selectedOrg ? urlUser?.pullRequests?.filter((item: any) => item.org.id === selectedOrg) : urlUser?.pullRequests;


    return (
        <div>
            <div className="flex gap-2 ">
                {/* @ts-ignore */}
                <Select onValueChange={(value) => setSelectedOrg(value.id)}>
                    <SelectTrigger className="w-[200px] p-4 ">
                        <SelectValue placeholder="Select a Organisation" />
                    </SelectTrigger>
                    <SelectContent className=''>
                        <SelectGroup>
                            <SelectLabel>Select Orgs</SelectLabel>
                            <SelectItem value={' '}>
                                <div className='flex items-center gap-2'>
                                   All ({organisationData.length}) 
                                </div>
                            </SelectItem>
                            {
                                organisationData && organisationData.map((org: any) => {
                                    return (
                                        <SelectItem value={org} key={org.id}>
                                            <div className='flex items-center gap-2'>
                                                <Image className='w-[1.5rem] rounded-full h-[1.5rem]' src={org?.avatar_url} width='500' height='500' alt='org-img' />
                                                <p>{org.name}</p>
                                            </div>
                                        </SelectItem>
                                    )
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>

                {selectedOrg && !checkIfAnyPRMatches() && (
                    <div className="col-span-full text-center">
                        No pull requests found for the selected organization.
                    </div>
                )}
                {
                    filteredPullRequests?.map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                            >
                                <PRCard
                                    user={urlUser}
                                    // @ts-ignore
                                    isCurrentUser={urlUser?.id === user?.id}
                                    PRData={item}
                                />
                            </div>
                        )
                    })
                }

                {/* <div>{!isOrgAndPRMatched && <>Not found</>}</div> */}
            </div>
        </div>
    )
}
