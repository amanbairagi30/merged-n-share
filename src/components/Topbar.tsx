import React from 'react'

export default function Topbar() {
    return (
        <div className='border-b-2 flex px-4 items-center border-[#353535] min-h-[4rem]'>
            <div className="w-full">
                <p className="text-lg sm:text-xl md:text-2xl font-extrabold relative">
                    <span className="bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text absolute inset-0">
                        Dashboard
                    </span>
                    <span className="invisible">Dashboard</span>
                </p>
            </div>
        </div>
    )
}
