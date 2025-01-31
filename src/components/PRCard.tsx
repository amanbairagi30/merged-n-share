import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  CalendarDaysIcon,
  GitFork,
  GitMerge,
  LucideExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import PointIcon from '../app/assets/point.png';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import PrDeleteButton from './pr-delete-button';

export default function PRCard({
  user,
  getAllPullrequests,
  isCurrentUser,
  PRData,
}: any) {
  const {
    prURL,
    mergedAt,
    prTitle,
    prNumber,
    repoURL,
    bounty,
    avatar,
    prPoint,
    org,
    userName,
    commentURL,
    isVerified,
    body,
    draft,
    id,
  } = PRData;

  const renderPRQualityViaBounty = (bountyAmount: any) => {
    // console.log(typeof bt)
    // const bountyAmount = Number(typeof bt === 'string' && bt.replace("$", ""));
    if (bountyAmount === 0 || !bountyAmount) {
      return {
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-500',
        text: 'Begineer',
      };
    } else if (bountyAmount > 0 && bountyAmount <= 30) {
      return {
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-500',
        text: 'Basic',
      };
    } else if (bountyAmount > 30 && bountyAmount <= 60) {
      return {
        textColor: 'text-yellow-500',
        bgColor: 'bg-yellow-500',
        text: 'Decent',
      };
    } else if (bountyAmount > 60 && bountyAmount <= 80) {
      return {
        textColor: 'text-yellow-500',
        bgColor: 'bg-yellow-500',
        text: 'Good',
      };
    } else if (bountyAmount > 80 && bountyAmount <= 150) {
      return {
        textColor: 'text-orange-500',
        bgColor: 'bg-orange-500',
        text: 'Great',
      };
    } else if (bountyAmount > 150 && bountyAmount <= 250) {
      return {
        textColor: 'text-purple-500',
        bgColor: 'bg-purple-500',
        text: 'Excellent',
      };
    } else if (bountyAmount > 250 && bountyAmount <= 500) {
      return {
        textColor: 'text-green-500',
        bgColor: 'bg-green-500',
        text: 'Outstanding',
      };
    } else if (bountyAmount > 500) {
      return {
        textColor: 'text-green-500',
        bgColor: 'bg-green-500',
        text: 'Exceptional',
      };
    }
  };

  return (
    <>
      <div className="flex h-[20rem] flex-col rounded-lg bg-accent/50 p-4 text-foreground transition-all duration-200 ease-linear hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-extrabold">{org?.name}</span>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4" />
                <span className="text-xs opacity-75">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                    .format(new Date(mergedAt))
                    .replace(/(^\w{3})/, (match) => match.toUpperCase())}
                </span>
              </div>
            </div>

            {/* <div className='text-xs font-semibold opacity-75'>Merged on : Apr 1, 2024</div> */}
          </div>
          <div className="flex !h-[3.5rem] !w-[3.5rem] items-center justify-center rounded-full p-[0.2rem]">
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src={org?.avatar_url || ''}
                alt="@shadcn"
              />
              <AvatarFallback className="bg-[#fff]!w-[2.5rem] flex !h-[2.5rem] items-center justify-center rounded-full p-[0.2rem] text-black">
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-4 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <GitFork className="h-4 w-4" />
              <span className="flex items-center gap-1 text-sm">
                {repoURL.split('/')[repoURL.split('/').length - 1]}
              </span>
            </Badge>
            <Badge variant="secondary" className="text-sm font-medium">
              <span className="text-md opacity-75">#{prNumber}</span>
            </Badge>
          </div>

          <div className="my-4">
            <span className="text-2xl font-[600]">
              {prTitle.slice(0, 40)}...
            </span>
          </div>
          {/* the bounty system may be dropped soon or we need to have a better generalised idea about them */}
          <div className="my-2 flex items-center gap-2">
            {/* <Badge
              variant="secondary"
              className="flex items-center gap-2 rounded-full bg-primary/20 text-sm font-medium"
            >
              <Image
                width="400"
                height="400"
                className="h-[1rem] w-[1rem]"
                src="https://img.icons8.com/3d-fluency/94/dollar-coin.png"
                alt="coin-image"
              />
              <span className="text-sm">{prPoint}</span>
            </Badge> */}
            {/* {
                            bounty && bounty?.length !== 0 && (
                                <div className='mt-2 border-2 border-green-500 px-2 py-1 rounded-full gap-1 flex items-center'>
                                    <BadgeDollarSign size={18} className='text-green-500' />
                                    <span className='text-sm'>{bounty}</span>
                                </div>
                            )
                        } */}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* <div className={`text-sm h-fit w-fit rounded-full ${renderPRQualityViaBounty(bounty)?.textColor} font-bold flex items-center gap-2`}>
                        <div className={`h-[0.5rem]  rounded-full w-[0.5rem] ${renderPRQualityViaBounty(bounty)?.bgColor} `}></div>
                        {renderPRQualityViaBounty(bounty)?.text}
                    </div> */}

          <Badge
            variant="secondary"
            className="flex items-center gap-2 rounded-md bg-purple-500/80 text-sm font-medium text-white"
          >
            <GitMerge className="h-4 w-4" />
            <span className="text-sm">Merged</span>
          </Badge>

          <div className="flex items-center gap-2">
            <PrDeleteButton
              pullRequestId={id}
              getAllPullrequests={getAllPullrequests}
            />
            <Button className="flex items-center gap-1 p-0 font-semibold">
              <Link
                href={prURL}
                target="_blank"
                className="flex w-full items-center gap-1 p-2 font-semibold"
              >
                View PR <LucideExternalLink size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
