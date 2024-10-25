'use client';
import { sideBarOptions } from '@/data/data';
import { PanelRightOpen, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Github from '@/app/assets/github.svg';
import Link from 'next/link';
import { useSidebarStore } from '@/store/sidebar';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function Sidebar() {
  const pathName = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    return pathName === '/work/dashboard' ? 0 : null;
  });
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const isProfile = pathName === '/work/profile';

  const sidebarVisibility = useSidebarStore((state) => state.sidebarVisibility);
  const toggleSidebar = useSidebarStore(
    (state) => state.toggleSidebarVisibility,
  );

  useEffect(() => {
    const currentPathName = pathName;
    const newActive = sideBarOptions.general.findIndex(
      (option: any) => option.href === currentPathName,
    );
    setActiveIndex(newActive);
  }, [pathName]);

  return (
    <>
      {sidebarVisibility && (
        <div
          onClick={() => toggleSidebar(false)}
          className="absolute z-50 h-screen w-full bg-background/90 bg-opacity-10"
        ></div>
      )}
      <div
        className={`z-[50] h-screen border-r-2 border-accent bg-background transition-transform duration-500 ease-in-out md:relative md:flex md:translate-x-0 ${
          sidebarVisibility
            ? 'absolute flex translate-x-0'
            : 'absolute flex -translate-x-full'
        } min-w-[18rem] max-w-[18rem] flex-col border-[#353535]`}
      >
        <div className="flex h-[4rem] items-center justify-between border-[#424242] px-4">
          <Link href="/">
            <p className="font-secondary text-xl font-semibold">
              M<span className="text-primary">&</span>S
            </p>
          </Link>
          <Link
            href="https://github.com/amanbairagi30/merged-n-share"
            target="_blank"
          >
            <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
          </Link>
        </div>

        <button
          onClick={() => toggleSidebar(false)}
          className={`border-2 ${sidebarVisibility ? 'block md:hidden' : 'hidden'} absolute left-[110%] top-[2%] z-[2000] cursor-pointer rounded-md border-foreground/30 bg-background p-2`}
        >
          <X size={18} />
        </button>

        {/* <main className=' font-bold  mt-6 px-4'> */}
        <div className="mt-6 px-4 text-xs font-bold tracking-wider text-slate-400">
          GENERAL
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between font-bold">
          <div className="flex h-fit flex-col gap-2 pl-2">
            {sideBarOptions.general.map((x, idx) => {
              if (x.name.toLowerCase() === 'organisation') {
                // @ts-ignore
                // if (!user?.admin && user?.username !== 'hkirat') {
                //     return null;
                // }
              }

              return (
                <Link
                  onClick={() => toggleSidebar(false)}
                  href={`${x.href}`}
                  key={idx}
                >
                  <div
                    onClick={() => setActiveIndex(idx)}
                    className={`flex cursor-pointer items-center text-sm ${activeIndex === idx ? 'border-r-[5px] border-primary bg-primary/20' : 'hover:bg-accent'} h-fit gap-1 rounded-l-md px-2 py-2`}
                  >
                    <div
                      className={`${activeIndex === idx ? 'mr-2 rounded-md bg-primary text-black' : ''} p-1`}
                    >
                      <x.icon size={18} />
                    </div>
                    <div className="flex items-center gap-2">
                      <p>{x.name}</p>
                      {x.isNew && (
                        <div className="flex h-fit w-fit items-center justify-center rounded-md bg-green-700 px-2 py-0 text-[0.6rem] text-white">
                          NEW
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Button
            onClick={() => {
              router.push(`/work/profile`);
              toggleSidebar(false);
            }}
            className={`flex items-center border-2 text-foreground ${isProfile ? 'border-primary bg-primary/10' : 'bg-transparent hover:bg-primary/5'} z-10 mx-4 mb-4 rounded-xl px-4 py-8 hover:bg-primary/5`}
          >
            <div className="w-[20%]">
              <Image
                className="h-[2rem] w-[2rem] rounded-full"
                src={user?.image ?? ''}
                height="500"
                width="400"
                alt="user_avatar"
              />
            </div>
            <div className="flex w-[80%] flex-col text-start font-normal">
              {/* @ts-ignore */}
              <div className="text-sm font-semibold">{user?.username}</div>
              <div className="text-xs text-gray-400">
                {user?.email?.slice(0, 26)}...
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
