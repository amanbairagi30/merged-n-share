'use client'
import { sideBarOptions } from '@/data/data'
import { PanelRightOpen } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Github from '@/app/assets/github.svg';
import Link from 'next/link';

export default function Sidebar() {
    const pathName = usePathname();
    const [activeIndex, setActiveIndex] = useState<number | null>(() => {
        return pathName === '/works/dashboard' ? 0 : null
    })
    const router = useRouter();
    const session = useSession();
    const user = session?.data?.user;


    useEffect(() => {
        const currentPathName = pathName;
        const newActive = sideBarOptions.general.findIndex((option: any) => option.href === currentPathName);
        setActiveIndex(newActive);
    }, [pathName])
    return (
        <div className='border-r-2 hidden md:flex flex-col border-[#353535] min-w-[18rem] max-w-[18rem]'>
            <div className=' border-[#424242] flex justify-between items-center px-4 h-[4rem]'>
                <div>
                    <p className='text-xl font-semibold'>M<span className='text-blue-500'>&</span>S</p>
                </div>
                <Link href='https://github.com/amanbairagi30/merged-n-share' target='_blank'>
                    <Image className='invert w-[1.2rem] h-[1.2rem] cursor-pointer' src={Github} height='500' width='500' alt='github-icon' />
                </Link>
            </div>

            {/* <main className=' font-bold  mt-6 px-4'> */}
            <div className='text-xs font-bold  mt-6 px-4 text-slate-400 tracking-wider'>GENERAL</div>

            <div className='flex font-bold  mt-6 px-2 justify-between flex-col h-full'>
                <div className='flex gap-4 h-fit flex-col'>

                    {
                        sideBarOptions.general.map((x, idx) => {

                            return (
                                <Link href={`${x.href}`} key={idx}>
                                    <div onClick={() => setActiveIndex(idx)} className={`flex items-center cursor-pointer ${activeIndex === idx ? 'bg-blue-500' : 'hover:bg-slate-800'} rounded-md px-2 py-2 h-fit gap-2`}>
                                        <x.icon />
                                        <p>{x.name}</p>
                                    </div>
                                </Link>
                            )
                        }
                        )
                    }
                </div>
                <button onClick={() => router.push(`/work/profile`)} className="bg-slate-800 no-underline group mb-4 cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6  text-white inline-block">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="flex items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">

                        <div className='w-[20%]'>
                            <Image className='w-[2rem] h-[2rem] rounded-full' src={user?.image ?? ''} height='500' width='400' alt='user_avatar' />
                        </div>
                        <div className='w-[80%] font-normal text-start flex flex-col'>
                            {/* @ts-ignore */}
                            <div className=' text-sm font-semibold'>{user?.username}</div>
                            <div className='text-xs text-gray-400'>{user?.email}</div>
                        </div>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                </button>


            </div>

            {/* </main> */}
        </div>
    )
}
