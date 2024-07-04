'use client'
import { sideBarOptions } from '@/data/data'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Sidebar() {
    const pathName = usePathname();
    const [activeIndex, setActiveIndex] = useState<number | null>(() => {
        return pathName === '/works/dashboard' ? 0 : null
    })
    const router = useRouter();

    useEffect(() => {
        const currentPathName = pathName;
        const newActive = sideBarOptions.general.findIndex((option: any) => option.href === currentPathName);
        setActiveIndex(newActive);
    }, [pathName, sideBarOptions.general])
    return (
        <div className='border-r-2 flex flex-col border-[#353535] min-w-[18rem]'>
            <div className=' border-[#424242] flex items-center px-4 h-[4rem]'>
                <div>
                    <p className='text-xl font-semibold'>M<span className='text-blue-500'>&</span>S</p>
                </div>
            </div>

            <main className='  font-bold  mt-6 px-4'>
                <div className='text-xs text-slate-400 tracking-wider'>GENERAL</div>

                <div className='flex  gap-4 mt-6 h-fit flex-col'>
                    {
                        sideBarOptions.general.map((x, idx) => (
                            <>
                                <div onClick={() => { setActiveIndex(idx); router.push(`${x.href}`) }} className={`flex items-center cursor-pointer ${activeIndex === idx ? 'bg-blue-500' : 'hover:bg-slate-800'} rounded-md px-2 py-2 h-fit gap-2`}>
                                    <x.icon />
                                    <p>{x.name}</p>
                                </div>
                            </>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}
