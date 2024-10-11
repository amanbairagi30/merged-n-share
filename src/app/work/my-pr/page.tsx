"use client";
import PRCard from '@/components/PRCard';
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Info, Loader, Search } from 'lucide-react';
import { Organisations as OrgType } from '@prisma/client';
import { toast } from 'sonner';
import Image from 'next/image';
import { updateUserContributedOrgs } from '@/app/actions/userAction';
import { Input } from '@/components/ui/input';


export default function MyPR() {
    const session = useSession();
    const [prdata, setPrData] = useState<any[]>([]);
    const [organisations, setOrganisations] = useState<OrgType[]>([]);
    const [fetchedMergedPRData, setFetchedMergedPRData] = useState<any[]>([]);
    const [selectedOrgData, setSelectedOrgData] = useState({ id: '', name: '', avatar: '', github_url: '' });
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [showFetchedMergedPRDialog, setShowFetchedMergedPRDialog] = useState(false);
    const user = session?.data?.user;

    // console.log(selectedOrgData);

    const handleFetchPRDetails = async () => {
        if (!user || !selectedOrgData?.name) {
            toast.warning("Select the organisation and then proceed")
            return;
        }
        setIsLoading(true);
        setShowFetchedMergedPRDialog(true)
        //@ts-ignore
        const response = await fetch(`https://api.github.com/search/issues?q=type:pr+author:${user?.username}+org:${selectedOrgData?.name}+is:merged`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`
            }
        })
        setIsLoading(false);

        const finalData = await response.json();
        if (Number(finalData.status) === 422) {
            // console.log(finalData.errors[0].message);
            toast.error("Hi : ", finalData.errors[0].message);
            return;
        }


        const mergedPRsData = await Promise.all(finalData?.items?.map(async (pr: any, index: number) => {
            //@ts-ignore
            if (user?.username === pr.user.login) {
                const prDetails = {
                    prURL: pr.html_url,
                    prTitle: pr.title,
                    prNumber: pr.number,
                    repoURL: pr.repository_url,
                    userName: pr.user.login,
                    avatar: pr.user.avatar_url,
                    commentURL: pr.comments_url,
                    organisationId: selectedOrgData.id,
                    isVerified: true,
                    mergedAt: pr.pull_request.merged_at,
                    body: pr.body,
                    draft: pr.draft,
                    bounty: null
                };

                const commentsResponse = await fetch(pr.comments_url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`
                    }
                });
                const commentsData = await commentsResponse.json();

                const hkiratComments = commentsData?.filter((comment: any) => comment.user.login === "hkirat").map((item: any) => {
                    // console.log(item.body)
                    if (isBountyComment(item.body)) {
                        return extractAmount(item.body);
                    }
                    return null;
                }).filter((amount: any) => amount !== null);

                // console.log(hkiratComments)
                prDetails.bounty = hkiratComments;

                return prDetails;
            } else {
                return;
            }
        }).filter((pr: any) => pr !== undefined));

        setIsLoading(false);
        setFetchedMergedPRData(mergedPRsData);
        // console.log(mergedPRsData);
    }



    useEffect(() => {
        getAllPullrequests();

        /* to fetch the organisations for the dropdown */
        const fetchOrganisations = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/organisation`, {
                method: "GET",
            })
            const resp = await response.json();
            if (resp.success) {
                // console.log({ resp })
                setOrganisations(resp.organisations)
            }
        }
        fetchOrganisations();
    }, [])

    const getAllPullrequests = async () => {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pr`, {
            method: "GET",
        })
        const resp = await response.json();
        if (resp.success) {
            // console.log("fetched PRs suyccessfully");
            // console.log(resp.pullRequests);
            setPrData(resp.pullRequests)
            setIsLoading(false);
        }
        setIsLoading(false);
    }
    const isBountyComment = (comment: string) => {
        return /\/bounty\s+(\$?\d+|\d+\$)/i.test(comment);
    };

    const extractAmount = (comment: string): number | null => {
        // console.log(comment);
        const bountyExtractor = /\/bounty\s+\$?(\d+)/i;
        const match = comment.match(bountyExtractor);
        return match ? parseInt(match[1]) : null;
    };

    const savePRsInDatabase = async (prs: any[]) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pr`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prs }),
        })

        const resp = await response.json();
        const orgsToUpdate = prs.map(pr => pr.organisationId);
        // @ts-ignore
        await updateUserContributedOrgs(user?.id, orgsToUpdate);

        if (resp.success) {
            toast.success("Saved to DB");
        }
    }

    const newMergedPRData = fetchedMergedPRData.filter((pr: any) => {
        return !prdata.some(savedPR => savedPR?.prNumber === pr?.prNumber && savedPR?.repoURL === pr?.repoURL);
    })
    // console.log(newMergedPRData);
    // console.log(fetchedMergedPRData);

    return (
        <div className="flex flex-col items-start font-normal relative w-full">
            <div className='h-full w-full flex flex-col gap-4 rounded-l-[12px]'>
                <div className='flex p-4 rounded-xl bg-gradient-to-r from-secondary via-bg-secondary/80 to-transparent items-center justify-between '>
                    <div>Merged PRs({prdata?.length})</div>
                    <div className="flex gap-2 items-center">

                        {/* @ts-ignore */}
                        <Select onValueChange={(e) => setSelectedOrgData({ id: e?.id, name: e?.name, avatar: e?.avatar_url, github_url: e?.github_url })}>
                            <SelectTrigger className="min-w-[180px] max-w-full p-4 bg-background/40 text-foreground">
                                <SelectValue placeholder="Select a Organisation" />
                            </SelectTrigger>
                            <SelectContent className='bg-background text-foreground'>
                                <SelectGroup>
                                    <SelectLabel>Select</SelectLabel>
                                    {
                                        organisations && organisations.map((org: any) => {
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
                        <Button onClick={() => handleFetchPRDetails()} className='bg-primary w-[8rem]'>Fetch</Button>
                        <Dialog open={showFetchedMergedPRDialog} onOpenChange={setShowFetchedMergedPRDialog}>
                            <DialogContent className="overflow-auto h-fit">
                                <DialogHeader>
                                    <DialogTitle>Fetch PRs</DialogTitle>
                                    <DialogDescription>
                                        Fetch all of your merged PRs from
                                    </DialogDescription>
                                </DialogHeader>
                                <div className={`h-[15rem] ${isLoading ? "flex items-center justify-center" : ""}  overflow-auto`}>
                                    <div className='h-full'>
                                        {isLoading ?

                                            <div className='flex h-full items-center justify-center gap-2'>
                                                <Loader className='animate-spin' />
                                                <span className='text-sm font-semibold'>Hang Tight ! Getting your PRs</span>
                                            </div>
                                            :
                                            <div className='h-full'>
                                                {newMergedPRData.length > 0 ?
                                                    <>
                                                        <div className='font-semibold'>Total Merged PRs : {newMergedPRData.length}</div>

                                                        <div className='flex flex-col'>

                                                            {newMergedPRData.map((item, index) => {
                                                                return (
                                                                    <div key={`pr-${index}-glimpse`} className='mt-4 border-2 border-black rounded-lg font-semibold px-4 py-2'>

                                                                        #{item?.prNumber} in {item?.repoURL.split("/")[item.repoURL.split("/").length - 1]}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </>
                                                    :
                                                    <div className='font-extrabold h-full flex items-center justify-center text-center'>

                                                        {/*@ts-ignore */}
                                                        <p>No new merged PR found in this organization for <span className=' italic'>{user?.username}</span></p>
                                                    </div>
                                                }
                                            </div>}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button disabled={newMergedPRData.length === 0} onClick={() => savePRsInDatabase(fetchedMergedPRData)} type="submit">Save PRs to DB</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className='flex items-center border-2 px-4 py-1 rounded-md w-full max-w-md mt-4'>
                    <Search className='w-4 h-4' />
                    <Input className='w-full placeholder:text-opacity-10 border-none' placeholder='Search for PR' />
                </div>

                {/* PR cards */}
                {isLoading ? (
                    <div className='flex w-full h-[80vh] gap-2 items-center justify-center'>
                        <Loader className='animate-spin' />
                        <span className='text-xs'>Fetching your PRs from DB</span>
                    </div>
                ) : (
                    prdata && prdata.length > 0 ? (
                        <div className='grid grid-cols-1 lg:grid-cols-2 py-2 h-full flex-wrap gap-4'>
                            {prdata.map((item, index) => (
                                <PRCard key={index} user={user} PRData={item} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex w-full h-[80vh] gap-2 items-center justify-center'>
                            {/* <Loader className='animate-spin' /> */}
                            <span className='text-sm md:w-[40%] text-center'>No PR data from DB , you can fetch your new merged PR by selecting organisation and then save it to DB</span>
                        </div>
                    )
                )}

            </div>


        </div>
    )
}
