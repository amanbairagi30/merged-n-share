import React, { useState } from 'react';
import Image from 'next/image';
import { LucideExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Organisations as OrgType } from '@prisma/client';
import GithubIcon from '../app/assets/github.svg';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from './ui/switch';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function OrgCard({
  organisation,
  isApproved,
  setApprovedOrganisations,
  setOrganisations,
}: {
  organisation: OrgType;
  isApproved: boolean;
  setApprovedOrganisations: (orgs: OrgType[]) => void;
  setOrganisations: (orgs: OrgType[]) => void;
}) {
  const login =
    organisation.name.length > 10
      ? `${organisation.name.slice(0, 20)}...`
      : organisation.name;

  const [approved, setApproved] = useState<boolean>(isApproved);

  const handleApproval = async () => {
    const newApprovedState = !approved;
    setApproved(newApprovedState);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/organisation`,
        {
          method: 'POST',
          body: JSON.stringify({
            id: organisation.id,
            name: organisation.name,
            github_url: organisation.github_url,
            avatar_url: organisation.avatar_url,
          }),
        },
      );
      const finalData = await response.json();

      if (finalData.action === 'approved') {
        setApproved(true);
        // @ts-ignore
        setApprovedOrganisations((previousOrgs) => [
          ...previousOrgs,
          organisation,
        ]);
      } else if (finalData.action === 'disapproved') {
        setApproved(!newApprovedState);
        // @ts-ignore
        setApprovedOrganisations((previousOrgs) =>
          // @ts-ignore
          previousOrgs.filter((org) => org.id !== organisation.id),
        );
        // @ts-ignore
        setOrganisations((previousOrgs) =>
          // @ts-ignore
          previousOrgs.filter((org) => org.id !== organisation.id),
        );
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
      setApproved(!newApprovedState);
    }
  };

  return (
    <>
      <div className="relative flex h-[16rem] w-full flex-col items-center justify-center rounded-2xl bg-accent transition-all duration-300 hover:shadow-lg dark:bg-accent/30">
        <div className="mb-4">
          <img
            src={organisation.avatar_url as string}
            alt={`${organisation.name} avatar`}
            className="h-20 w-20 rounded-xl object-cover"
            width={80}
            height={80}
          />
        </div>

        <div className="mb-8 text-center">
          <p className="mb-2 text-lg font-semibold">{login}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-b-2xl bg-background/40 px-4 py-3 backdrop-blur-sm">
          <Link
            href={organisation.github_url ?? ''}
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors duration-200 hover:bg-primary/20"
          >
            <GitHubLogoIcon className="h-5 w-5" />
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
  );
}
