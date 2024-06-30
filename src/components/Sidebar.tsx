import { LayoutDashboard } from 'lucide-react'
import React from 'react'

export default function Sidebar() {
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
                    <div className='flex items-center cursor-pointer bg-blue-500 rounded-md px-2 py-2 h-fit gap-2'>
                        <LayoutDashboard />
                        <p>Dashboard</p>
                    </div>
                    <div className='flex items-center cursor-pointer hover:bg-slate-800 rounded-md px-2 py-2 h-fit gap-2'>
                        <LayoutDashboard />
                        <p>My PRs</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
