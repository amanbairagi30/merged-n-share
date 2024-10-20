'use client';
import { Organisations } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface ContributionType {
  contributions: Organisations[];
}

export default function ContributedOrg({ contributions }: ContributionType) {
  return (
    <div>
      <div className="flex gap-1">
        {contributions?.map((item: Organisations, index: number) => {
          if (index > 7) {
            return null;
          }
          return (
            <>
              <img
                key={item.id}
                className="!h-[1.5rem] !w-[1.5rem] rounded-full shadow-lg"
                src={item?.avatar_url || ''}
                width="500"
                height="500"
                alt="org"
              />
            </>
          );
        })}
        {contributions?.length === 0 && 'No contributions yet'}
      </div>
    </div>
  );
}
