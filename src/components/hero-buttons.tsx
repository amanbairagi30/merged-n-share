"use client";
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
        router.push("/work/dashboard")
    }

    return (
        <>
            <Button onClick={handlePrimaryButtonClick} className="font-bold h-8 font-paragraph w-full md:w-fit">
                {user ? (
                    <>
                        <span className='mr-2'>Dashboard</span>
                        <Image className='w-6 h-6 rounded-md shadow-xl' width={100} height={100} src={user?.image ?? ''} alt="avatar-of-user" />
                    </>
                ) :
                    "SignUp"
                }
            </Button>
            <Button onClick={()=>router.push("#features")} variant={'ghost'} className="font-bold font-paragraph border-primary hover:bg-accent h-8 w-full md:w-fit">What&apos;s more ?</Button>
        </>
    )
}
