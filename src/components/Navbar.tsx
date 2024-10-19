'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SelectTheme } from './theme-toggler';
import { Button } from './ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { MailIcon } from 'lucide-react';

export const Navbar = () => {
  const session = useSession();
  console.log(session?.data?.user);
  const router = useRouter();

  return (
    <>
      <div className="flex h-fit items-center justify-between p-4">
        <header className="flex items-center justify-between border-neutral-900 font-secondary">
          <Link href="/" className="hidden items-center gap-[10px] md:flex">
            <p className="font-secondary text-xl font-extrabold">
              Merged<span className="text-primary">&</span>Share .
            </p>
          </Link>
          <aside className="flex items-center gap-[10px] md:hidden">
            <p className="font-secondary text-xl font-extrabold">
              M<span className="text-primary">&</span>S.
            </p>
          </aside>
        </header>

        <aside className="flex items-center gap-2">
          <SelectTheme />

          <Link
            href="https://github.com/amanbairagi30/merged-n-share"
            className="flex cursor-pointer items-center gap-2 rounded-md border-2 bg-accent px-2 py-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="h-5 w-5" />
            <span className="hidden md:block">Star on Github</span>
          </Link>
          <Link
            href="mailto:amanbairagi1089@gmail.com"
            className="flex cursor-pointer items-center gap-2 rounded-md border-2 bg-accent px-2 py-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon className="h-5 w-5" />
            <span className="hidden md:block">Contact Us</span>
          </Link>
        </aside>
      </div>
    </>
  );
};
