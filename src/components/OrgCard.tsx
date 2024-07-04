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


export default function OrgCard({ organisation, isApproved, setApprovedOrganisations, setOrganisations }: { organisation: OrgType, isApproved: boolean, setApprovedOrganisations: (orgs: OrgType[]) => void, setOrganisations: (orgs: OrgType[]) => void }) {

    const login = organisation.name.length > 10 ? `${organisation.name.slice(0, 20)}...` : organisation.name;

    const [approved, setApproved] = useState<boolean>(isApproved)

    const handleApproval = async () => {

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
            setApproved(false);
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
    }

    return (
        <Card className="w-[300px] border-none">
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
                <Link href={organisation.github_url ?? ''} target='_blank' className='flex items-center gap-1  bg-white p-2 rounded-md '>
                    <Image src={GithubIcon.src} className="w-5 h-5 mr-2" alt="Github Icon" width={25} height={25} />
                    <LucideExternalLink size={15} />
                </Link>

                <Switch checked={approved} onCheckedChange={handleApproval} className="data-[state=checked]:bg-green-500" id="airplane-mode" />

            </CardFooter>
        </Card>
    )
}
