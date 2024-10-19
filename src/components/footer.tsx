import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import X from './svgs/x';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="z-20 flex max-h-fit min-h-[10rem] flex-col justify-between gap-10 rounded-xl border-2 bg-transparent p-6 backdrop-blur-3xl md:flex-row md:items-center">
      <section>
        <aside className="flex flex-col gap-[10px]">
          <p className="font-secondary text-xl font-extrabold md:text-4xl">
            Merged<span className="text-primary">&</span>Share .
          </p>
          <p className="text-sm dark:text-gray-300">
            &copy; {year} | All Rights Reserved.
          </p>
        </aside>

        <aside className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href={'https://github.com/amanbairagi30/merged-n-share/'}>
              <GitHubLogoIcon className="h-6 w-6" />
            </Link>
            <Link href={'https://x.com/AMANBAIRAGI_30/'}>
              <X className="h-6 w-6 dark:invert" />
            </Link>
          </div>
          |
          <p className="text-sm dark:text-gray-300">
            Designed and Developed by{' '}
            <span className="cursor-pointer underline hover:text-primary">
              Aman
            </span>
          </p>
        </aside>
      </section>

      <section className="group flex h-[8rem] w-full cursor-pointer items-center justify-center rounded-xl border-2 bg-primary text-black md:w-[12rem]">
        <ArrowUpRight className="h-20 w-20 rotate-45 transition-transform duration-200 ease-linear group-hover:rotate-0" />
      </section>
    </footer>
  );
}
