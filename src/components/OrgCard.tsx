import React, { useState } from "react"
import Image from "next/image"
import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Organisations as OrgType } from '@prisma/client';
import GithubIcon from "../app/assets/github.svg";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "./ui/switch";
import { GitHubLogoIcon } from "@radix-ui/react-icons";


export default function OrgCard({ organisation, isApproved, setApprovedOrganisations, setOrganisations }: { organisation: OrgType, isApproved: boolean, setApprovedOrganisations: (orgs: OrgType[]) => void, setOrganisations: (orgs: OrgType[]) => void }) {

    const login = organisation.name.length > 10 ? `${organisation.name.slice(0, 20)}...` : organisation.name;

    const [approved, setApproved] = useState<boolean>(isApproved)

    const handleApproval = async () => {
        const newApprovedState = !approved;
        setApproved(newApprovedState);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/organisation`, {
                method: 'POST',
                body: JSON.stringify({
                    id: organisation.id,
                    name: organisation.name,
                    github_url: organisation.github_url,
                    avatar_url: organisation.avatar_url
                })
            });
            const finalData = await response.json();

            if (finalData.action === "approved") {
                setApproved(true);
                // @ts-ignore
                setApprovedOrganisations((previousOrgs) => [...previousOrgs, organisation]);
            } else if (finalData.action === "disapproved") {
                setApproved(!newApprovedState);
                // @ts-ignore
                setApprovedOrganisations((previousOrgs) =>
                    // @ts-ignore
                    previousOrgs.filter(org => org.id !== organisation.id)
                );
                // @ts-ignore
                setOrganisations((previousOrgs) =>
                    // @ts-ignore
                    previousOrgs.filter(org => org.id !== organisation.id)
                );
            }
        } catch (error) {
            console.error("Error updating approval status:", error);
            setApproved(!newApprovedState);
        }
    }

    return (
        <>
            <div className="w-full rounded-2xl relative bg-accent dark:bg-accent/30 flex items-center justify-center flex-col h-[16rem] transition-all duration-300 hover:shadow-lg">
                <div className="mb-4">
                    <Image
                        src={organisation.avatar_url as string}
                        alt={`${organisation.name} avatar`}
                        className="object-cover w-20 h-20 rounded-xl"
                        width={80}
                        height={80}
                    />
                </div>

                <div className="text-center mb-8">
                    <p className="font-semibold text-lg mb-2">{login}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-background/40 backdrop-blur-sm rounded-b-2xl">
                    <Link
                        href={organisation.github_url ?? ''}
                        target='_blank'
                        className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200'
                    >
                        <GitHubLogoIcon className="w-5 h-5" />
                    </Link>

                    <Switch
                        checked={approved}
                        onCheckedChange={handleApproval}
                        className="data-[state=checked]:bg-primary"
                    />
                </div>
            </div>

            {/* <Card className="w-[300px] bg-[#35355] text-white border-2 border-[#202020]">
                <CardHeader>
                    <CardTitle>{login}</CardTitle>
                </CardHeader>
                <CardContent >
                    <Image
                        src={organisation.avatar_url as string}
                        alt="Image not found"
                        className="object-cover rounded-md"
                        width={250}
                        height={300}
                    />
                </CardContent>
                <CardFooter className="flex justify-between ">
                    <Link href={organisation.github_url ?? ''} target='_blank' className='flex items-center gap-1 text-white p-2 rounded-md '>
                        <GitHubLogoIcon />
                    </Link>

                    <Switch checked={approved} onCheckedChange={handleApproval} className="data-[state=checked]:bg-green-500" id="airplane-mode" />

                </CardFooter>
            </Card> */}
        </>
    )
}
