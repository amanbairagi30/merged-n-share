'use client'
import { sideBarOptions } from '@/data/data'
import { PanelRightOpen, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Github from '@/app/assets/github.svg';
import Link from 'next/link';
import { useSidebarStore } from '@/store/sidebar';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function Sidebar() {
    const pathName = usePathname();
    const [activeIndex, setActiveIndex] = useState<number | null>(() => {
        return pathName === '/work/dashboard' ? 0 : null
    })
    const router = useRouter();
    const session = useSession();
    const user = session?.data?.user;

    const isProfile = pathName === '/work/profile';

    const sidebarVisibility = useSidebarStore((state) => state.sidebarVisibility);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebarVisibility);


    useEffect(() => {
        const currentPathName = pathName;
        const newActive = sideBarOptions.general.findIndex((option: any) => option.href === currentPathName);
        setActiveIndex(newActive);
    }, [pathName]);



    return (
        <div className={`border-r-2 border-accent h-screen z-[50] bg-background transition-transform duration-500 ease-in-out
            md:flex md:relative md:translate-x-0
            ${sidebarVisibility
                ? "absolute translate-x-0 flex"
                : "absolute flex -translate-x-full"
            } 
            flex-col border-[#353535] min-w-[18rem] max-w-[18rem]`}>
            <div className=' border-[#424242] flex justify-between items-center px-4 h-[4rem]'>
                <div>
                    <p className='text-xl font-semibold font-secondary'>M<span className='text-primary'>&</span>S</p>
                </div>
                <Link href='https://github.com/amanbairagi30/merged-n-share' target='_blank'>
                    <GitHubLogoIcon className=' w-[1.2rem] h-[1.2rem] cursor-pointer' />
                </Link>
            </div>

            <button onClick={() => toggleSidebar(false)} className={`border-2 ${sidebarVisibility ? "block md:hidden" : "hidden"} cursor-pointer border-[#353535] p-2 bg-[#0f0f0f] z-[2000] absolute left-[110%] top-[2%]`}>
                <X size={18} />
            </button>

            {/* <main className=' font-bold  mt-6 px-4'> */}
            <div className='text-xs font-bold  mt-6 px-4 text-slate-400 tracking-wider'>GENERAL</div>

            <div className='flex font-bold  mt-6 justify-between flex-1 flex-col'>
                <div className='flex gap-2 h-fit pl-2  flex-col'>

                    {
                        sideBarOptions.general.map((x, idx) => {

                            if (x.name.toLowerCase() === 'organisation') {
                                // @ts-ignore
                                // if (!user?.admin && user?.username !== 'hkirat') {
                                //     return null;
                                // }
                            }

                            return (
                                <Link onClick={() => toggleSidebar(false)} href={`${x.href}`} key={idx}>
                                    <div onClick={() => setActiveIndex(idx)} className={`flex items-center text-sm cursor-pointer ${activeIndex === idx ? 'bg-primary/20 border-r-[5px] border-primary' : 'hover:bg-accent'} rounded-l-md px-2 py-2 h-fit gap-1`}>
                                        <div className={`${activeIndex === idx ? "bg-primary text-black mr-2 rounded-md" : ""} p-1 `}>
                                            <x.icon size={18} />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <p>{x.name}</p>
                                            {x.isNew &&
                                                <div className='text-[0.6rem] flex items-center justify-center w-fit h-fit px-2 py-0 rounded-md text-white bg-green-700'>NEW</div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        )
                    }
                </div>

                <Button onClick={() => { router.push(`/work/profile`); toggleSidebar(false) }} className={`flex border-2 text-foreground items-center ${isProfile ? "border-primary bg-primary/10" : "bg-transparent hover:bg-primary/5"} hover:bg-primary/5 z-10 mb-4 rounded-xl py-8 px-4 mx-4`}>

                    <div className='w-[20%]'>
                        <Image className='w-[2rem] h-[2rem] rounded-full' src={user?.image ?? ''} height='500' width='400' alt='user_avatar' />
                    </div>
                    <div className='w-[80%] font-normal text-start flex flex-col'>
                        {/* @ts-ignore */}
                        <div className=' text-sm font-semibold'>{user?.username}</div>
                        <div className='text-xs text-gray-400'>{user?.email}</div>
                    </div>
                </Button>



            </div>

        </div>
    )
}
