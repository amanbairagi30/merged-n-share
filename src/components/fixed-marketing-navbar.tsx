"use client"
import React from 'react';

export default function MarketingNavbar() {
    return (
        <div className='flex gap-1 rounded-b-xl items-center justify-center shadow-2xl fixed z-[100] bg-accent top-0 left-[50%] translate-x-[-50%] w-[25rem] px-2 py-1'>Powered by <p onClick={() => window.open(process.env.NEXT_PUBLIC_URL, "_blank")} className="text-lg cursor-pointer hover:underline font-extrabold font-secondary"> Merged<span className="text-primary">&</span>Share.</p></div>
    )
}
