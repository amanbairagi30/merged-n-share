import { LeaderboardEntry } from '@/util/types';
import { BadgeDollarSign, LucideExternalLink } from 'lucide-react';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

interface LeaderboardCardProps {
  leaderboard: LeaderboardEntry;
  currUser: User;
}

export default function LeaderboardCard({ leaderboard, currUser }: any) {
  return (
    <div>
      <ul className="mt-[2rem] flex flex-col items-center gap-[1.5rem]">
        <div className="flex h-80 w-full items-end justify-around pb-4 lg:w-[50%]">
          {leaderboard.map((user: any, index: number) => {
            if (index < 3) {
              const first = index === 0;
              const second = index === 1;
              // const third = index === 2;

              return (
                <div
                  key={index}
                  className={`relative flex h-full w-[30%] flex-col items-center justify-end px-4 ${
                    first ? 'order-2' : second ? 'order-1' : 'order-3'
                  }`}
                >
                  <div
                    className={`absolute ${first ? '-top-14' : second ? '-top-4' : 'top-2'} bg-gradient-to-b from-primary bg-clip-text text-8xl font-semibold text-transparent opacity-50`}
                  >
                    {index + 1}{' '}
                  </div>
                  <div>Rank</div>
                  {currUser?.id === user?.id && (
                    <div className="mb-2 flex h-fit items-center justify-center rounded-md bg-primary px-2 text-[0.6rem] font-bold text-black">
                      YOU
                    </div>
                  )}
                  <div
                    className={`flex w-fit flex-col items-center rounded-t-xl border-2 border-primary bg-primary/10 p-2 py-2 ${
                      first ? 'h-full' : second ? 'h-[85%]' : 'h-[75%]'
                    }`}
                  >
                    <div className="h-[7rem] w-[7rem]">
                      <Image
                        src={user?.image}
                        className="h-full w-full rounded-lg"
                        width="1500"
                        height="1500"
                        alt="user_image"
                      />
                    </div>
                    <div className="mt-2 flex flex-1 flex-col items-center justify-start text-base font-semibold">
                      <div className="flex gap-2">
                        <p>{user?.name?.split(' ')[0]}</p>
                        {currUser?.id === user?.id && (
                          <div className="flex h-fit items-center justify-center rounded-md bg-blue-500 px-2 text-[0.6rem]">
                            YOU
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 rounded-full">
                        <Image
                          width="400"
                          height="400"
                          className="h-[1rem] w-[1rem]"
                          src="https://img.icons8.com/3d-fluency/94/dollar-coin.png"
                          alt="coin-image"
                        />
                        <span className="text-sm">{user?.totalPoints}</span>
                      </div>
                    </div>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/profile/${user?.username}`}
                      target="_blank"
                      className="flex w-full cursor-pointer items-center justify-between rounded-md bg-primary px-2 py-1 text-xs font-bold text-black"
                    >
                      Profile
                      <LucideExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {leaderboard.map((user: any, index: number) => {
          if (index >= 3) {
            return (
              // @ts-ignore
              <li
                className={`border-2 ${currUser?.id === user?.id ? 'border-primary' : ' '} flex h-fit w-full rounded-lg lg:w-[60%]`}
                key={user.id}
              >
                {/* {user.name || user.username} - {user.totalPoints} - {user.bounties} points */}
                <div className="h-[7rem] w-[7rem]">
                  <Image
                    src={user?.image}
                    className="h-full w-full rounded-l-lg"
                    width="1500"
                    height="1500"
                    alt="user_image"
                  />
                </div>

                <div
                  className={`${currUser?.id === user?.id ? 'border-primary' : ''} flex h-[7rem] flex-1 flex-col p-2 px-3`}
                >
                  <div className="flex items-center justify-between text-base font-semibold">
                    <div className="flex gap-2">
                      <p>{user?.name}</p>
                      {currUser?.id === user?.id && (
                        <div className="flex h-fit items-center justify-center rounded-md bg-primary px-2 text-[0.6rem] text-black">
                          YOU
                        </div>
                      )}
                    </div>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/profile/${user?.username}`}
                      target="_blank"
                      className="flex cursor-pointer items-center text-sm"
                    >
                      <LucideExternalLink size={16} />
                    </Link>
                  </div>
                  <div className="flex-1 text-sm font-semibold text-slate-400">
                    {user?.username}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="mt-2 flex items-center gap-1 rounded-full">
                        <Image
                          width="400"
                          height="400"
                          className="h-[1rem] w-[1rem]"
                          src="https://img.icons8.com/3d-fluency/94/dollar-coin.png"
                          alt="coin-image"
                        />
                        <span className="text-sm">{user?.totalPoints}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1 rounded-full">
                        <BadgeDollarSign size={18} className="text-green-500" />
                        {/* <span className='text-sm'>{bounty[0]}</span> */}
                        <span className="text-sm">{user?.bounties}</span>
                      </div>
                    </div>

                    {/* <div onClick={() => toast.success('Coming Soon !')} className='w-fit px-2 py-1 rounded-sm cursor-pointer bg-blue-500 text-sm'>Hire/Refer</div> */}
                  </div>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
