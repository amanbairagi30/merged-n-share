/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

import { cn } from '@/lib/utils';

type Avatar = {
  img: string;
  href: string;
};

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      {avatarUrls.map((item, index) => (
        <img
          key={index}
          className="h-10 w-10 cursor-pointer rounded-full shadow-xl"
          src={item.img}
          width={40}
          onClick={() => window.open(item.href, '_blank')}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      <a className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary text-center text-xs font-medium text-white dark:border-primary dark:bg-primary dark:text-black">
        +{numPeople}
      </a>
    </div>
  );
};

export default AvatarCircles;
