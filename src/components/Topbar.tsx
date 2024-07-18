'use client'
import { Bell, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export default function Topbar() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div className='border-b-2 flex px-4 items-center border-[#353535] min-h-[4rem]'>
            <HamburgerMenuIcon className='mr-4 cursor-pointer block md:hidden'/>
            <div className="w-full">
                <p className="text md:text-lg font-extrabold relative">
                    <span className="bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text absolute inset-0">
                        Dashboard
                    </span>
                    <span className="invisible">Dashboard</span>
                </p>
            </div>
            <div className='flex items-center gap-4'>
                <Bell className='cursor-pointer' size={18} />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTitle onClick={() => setOpenDialog(true)}>
                        <LogOut className='hover:text-red-400 cursor-pointer' size={18} />
                    </DialogTitle>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Do you want to logout ?</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col sm:flex-row border-2 w-full gap-2'>
                            <Button variant={'destructive'} className='w-full' onClick={async () => await signOut()}>Yes, please</Button>
                            <Button variant={'outline'} className='border-2 w-full border-[#353535]' onClick={() => setOpenDialog(false)}>No , thanks</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
