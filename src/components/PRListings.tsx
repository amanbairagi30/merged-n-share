'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Organisations } from '@prisma/client';
import Image from 'next/image';
import PRCard from './PRCard';
import { Badge } from './ui/badge';

export default function PRListings({
  urlUser,
  user,
  pullRequests,
  organisationData,
}: any) {
  const [selectedOrg, setSelectedOrg] = useState('');
  const [isOrgAndPRMatched, setIsOrgAndPRMatched] = useState(false);

  const checkIfAnyPRMatches = () => {
    return urlUser?.pullRequests?.some(
      (item: any) => item.org.id === selectedOrg,
    );
  };

  const filteredPullRequests = selectedOrg
    ? urlUser?.pullRequests?.filter(
        (item: any) => item?.org?.id === selectedOrg,
      )
    : urlUser?.pullRequests;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="my-4 flex items-center justify-center">
          <Badge className="mb-6 rounded-xl bg-accent px-6 py-2 text-sm font-bold text-foreground hover:bg-accent">
            All PRs
          </Badge>
        </div>
        {/* @ts-ignore */}
        <Select onValueChange={(value) => setSelectedOrg(value.id)}>
          <SelectTrigger className="w-full p-4 md:w-[200px]">
            <SelectValue placeholder="Select a Organisation" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Select Orgs</SelectLabel>
              <SelectItem value={' '}>
                <div className="flex items-center gap-2">
                  All ({organisationData.length})
                </div>
              </SelectItem>
              {organisationData &&
                organisationData.map((org: any) => {
                  return (
                    <SelectItem value={org} key={org.id}>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-[1.5rem] w-[1.5rem] rounded-full"
                          src={org?.avatar_url}
                          width="500"
                          height="500"
                          alt="org-img"
                        />
                        <p>{org.name}</p>
                      </div>
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedOrg && !checkIfAnyPRMatches() && (
          <div className="col-span-full text-center">
            No pull requests found for the selected organization.
          </div>
        )}
        {filteredPullRequests?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <PRCard
                user={urlUser}
                // @ts-ignore
                isCurrentUser={urlUser?.id === user?.id}
                PRData={item}
              />
            </div>
          );
        })}

        {/* <div>{!isOrgAndPRMatched && <>Not found</>}</div> */}
      </div>
    </div>
  );
}
