import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { ArrowUpRight } from 'lucide-react';
import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className='border-2 bg-background z-20 min-h-[10rem] max-h-fit flex flex-col md:flex-row gap-10 md:items-center justify-between rounded-xl p-6'>
            <section>
                <aside className="flex flex-col gap-[10px]">
                    <p className="text-xl md:text-4xl font-extrabold font-secondary">Merged<span className="text-primary">&</span>Share .</p>
                    <p className='text-sm text-gray-300'>&copy; {year} | All Rights Reserved.</p>
                </aside>

                <aside className='flex items-center gap-4 mt-8'>
                    <div className='flex items-center gap-4 '>
                        <GitHubLogoIcon className='w-6 h-6' />
                        <TwitterLogoIcon className='w-6 h-6' />
                    </div>
                    |
                    <p className='text-sm text-gray-300'>Designed and Developed by <span className='underline cursor-pointer hover:text-primary'>Aman</span></p>

                </aside>
            </section>

            <section className='border-2 cursor-pointer group w-full md:w-[12rem] text-black rounded-xl flex items-center justify-center bg-primary h-[8rem]'>
                <ArrowUpRight className='w-20 h-20 transition-transform duration-200 ease-linear  rotate-45 group-hover:rotate-0' />
            </section>
        </footer>
    )
}
