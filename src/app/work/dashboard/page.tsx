import { ProfileChart } from '@/components/profile-views-chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import YourProfileButton from '@/components/your-profile-button';
import { authOptions } from '@/lib/auth';
import { getTotalViews, getUserProfile } from '@/lib/profile';
import {
  BriefcaseBusiness,
  Building2Icon,
  EyeIcon,
  GitMerge,
  LucideExternalLink,
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const username = user?.username;
  console.log(username);
  const fetchedUser = await getUserProfile(username);
  const totalViews = await getTotalViews(user?.id);

  return (
    <div className="h-full">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="group relative col-span-1 flex h-full min-h-[150px] flex-col overflow-hidden rounded-md border-2 border-[#353535] border-accent p-4">
          <div className="flex-1">
            <div className="text-sm font-semibold md:text-lg">Merged PRs</div>
            <div className="mt-4 text-4xl md:text-6xl">
              {fetchedUser?.pullRequests?.length}
            </div>

            <section className="absolute -bottom-6 right-2 flex items-center justify-center opacity-35 transition-all duration-700 group-hover:bottom-2 group-hover:opacity-100 md:m-0">
              <div
                className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600"
                style={{
                  boxShadow:
                    '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="borer-2 w-fit rounded-3xl px-4 py-4">
                  <GitMerge className="h-14 w-14 text-black md:w-20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                <div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                  style={{
                    mixBlendMode: 'soft-light',
                  }}
                />

                <div
                  className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                  }}
                />

                <div
                  className="absolute inset-0 animate-pulse opacity-30"
                  style={{
                    background:
                      'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient 3s ease infinite',
                  }}
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
              </div>
            </section>
          </div>
          {/* <Button className='bg-blue-500 border-none w-full mt-4' variant={'outline'}>View/Create</Button> */}
        </div>
        <div className="group relative col-span-1 flex h-full min-h-[150px] flex-col overflow-hidden rounded-md border-2 border-[#353535] border-accent p-4">
          <div className="flex-1">
            <div className="text-sm font-semibold md:text-lg">
              Organisation contributed
            </div>
            <div className="mt-4 text-4xl md:text-6xl">
              {fetchedUser?.contributedOrgs?.length}
            </div>
            <section className="absolute -bottom-6 right-2 flex items-center justify-center opacity-35 transition-all duration-700 group-hover:bottom-2 group-hover:opacity-100 md:m-0">
              <div
                className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600"
                style={{
                  boxShadow:
                    '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="borer-2 w-fit rounded-3xl px-4 py-4">
                  <Building2Icon className="text-black" size="50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                <div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                  style={{
                    mixBlendMode: 'soft-light',
                  }}
                />

                <div
                  className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                  }}
                />

                <div
                  className="absolute inset-0 animate-pulse opacity-30"
                  style={{
                    background:
                      'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient 3s ease infinite',
                  }}
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
              </div>
            </section>
          </div>
          {/* <Button className='bg-blue-500 border-none w-full mt-4' variant={'outline'}>View/Create</Button> */}
        </div>

        <div className="group relative col-span-1 flex h-full min-h-[150px] flex-col overflow-hidden rounded-md border-2 border-[#353535] border-accent p-4">
          <div className="flex-1">
            <div className="text-sm font-semibold md:text-lg">
              Total Profile Views
            </div>
            <div className="mt-4 text-4xl md:text-6xl">{totalViews}</div>

            <section className="absolute -bottom-6 right-2 flex items-center justify-center opacity-35 transition-all duration-700 group-hover:bottom-2 group-hover:opacity-100 md:m-0">
              <div
                className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600"
                style={{
                  boxShadow:
                    '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="borer-2 w-fit rounded-3xl px-4 py-4">
                  <EyeIcon className="h-14 w-14 text-black md:w-20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                <div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                  style={{
                    mixBlendMode: 'soft-light',
                  }}
                />

                <div
                  className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                  }}
                />

                <div
                  className="absolute inset-0 animate-pulse opacity-30"
                  style={{
                    background:
                      'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient 3s ease infinite',
                  }}
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
              </div>
            </section>
          </div>
        </div>
        <div className="min-h-100 col-span-1 flex max-h-fit flex-col rounded-md border-2 border-[#353535] border-accent p-4 pb-4 md:col-span-2 md:min-h-96 lg:col-span-3">
          <div className="mb-14 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center md:gap-0">
            <div className="">
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">Profile Views</div>
                <div className="flex h-fit w-fit items-center justify-center rounded-md bg-green-700 px-2 py-1 text-[0.6rem] font-semibold text-white">
                  NEW
                </div>
              </div>

              <div className="text-gray-500 dark:text-gray-400">
                Here you can see your public profile view , if made public
              </div>
            </div>

            <YourProfileButton username={username} />
          </div>
          <ProfileChart />
        </div>
      </div>
    </div>
  );
}
