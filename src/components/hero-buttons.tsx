'use client';
import React from 'react';
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroButtons() {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();

  const handlePrimaryButtonClick = async () => {
    if (!user) {
      await signIn();
    }
    router.push('/work/dashboard');
  };

  return (
    <>
      <Button
        onClick={handlePrimaryButtonClick}
        className="h-10 w-full px-4 font-paragraph text-[1rem] font-bold md:w-40"
      >
        {user ? (
          <>
            <span className="mr-2">Dashboard</span>
            <img
              className="h-6 w-6 rounded-md shadow-xl"
              width={100}
              height={100}
              src={user?.image ?? ''}
              alt="avatar-of-user"
            />
          </>
        ) : (
          'SignUp'
        )}
      </Button>
      <Button
        onClick={() => router.push('#features')}
        variant={'ghost'}
        className="h-10 w-full border-primary font-paragraph text-[1rem] font-bold hover:bg-accent md:w-40"
      >
        What&apos;s more ?
      </Button>
    </>
  );
}
