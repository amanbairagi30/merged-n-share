'use client'
import { Bell, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useSidebarStore } from '@/store/sidebar'
import { usePathname } from 'next/navigation'
import { capitalizeFirstLetter } from '@/util'
import { SelectTheme } from './theme-toggler'

export default function Topbar() {
    const [openDialog, setOpenDialog] = useState(false);
    const sidebarVisibility = useSidebarStore((state) => state.sidebarVisibility);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebarVisibility);

    const pathName = usePathname();
    return (
        <div className='border-b-2 flex px-4 items-center border-accent min-h-[4rem]'>
            <HamburgerMenuIcon onClick={() => toggleSidebar(true)} className='mr-4 cursor-pointer block md:hidden' />
            <div className="w-full">
                <span className="text md:text-lg relative">
                    {capitalizeFirstLetter(pathName.split('/')[2])}
                </span>
            </div>
            <div className='flex items-center gap-4'>
                <SelectTheme />
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
