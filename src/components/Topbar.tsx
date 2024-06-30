import React from 'react'

export default function Topbar() {
    return (
        <div className='border-b-2 flex px-4 items-center justify-between border-[#353535] h-[4rem]'>
            <div>
                <p className="text-xl font-extrabold sm:text-2xl w-fit text-center z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    Dashboard
                </p>
            </div>
        </div>
    )
}
