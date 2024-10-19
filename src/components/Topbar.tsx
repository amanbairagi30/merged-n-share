'use client';
import { Bell, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useSidebarStore } from '@/store/sidebar';
import { usePathname } from 'next/navigation';
import { capitalizeFirstLetter } from '@/util';
import { SelectTheme } from './theme-toggler';

export default function Topbar() {
  const [openDialog, setOpenDialog] = useState(false);
  const sidebarVisibility = useSidebarStore((state) => state.sidebarVisibility);
  const toggleSidebar = useSidebarStore(
    (state) => state.toggleSidebarVisibility,
  );

  const pathName = usePathname();
  return (
    <div className="flex min-h-[4rem] items-center border-b-2 border-accent px-4">
      <HamburgerMenuIcon
        onClick={() => toggleSidebar(true)}
        className="mr-4 block cursor-pointer md:hidden"
      />
      <div className="w-full">
        <span className="text relative md:text-lg">
          {capitalizeFirstLetter(pathName.split('/')[2])}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <SelectTheme />
        <Bell className="cursor-pointer" size={18} />
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTitle onClick={() => setOpenDialog(true)}>
            <LogOut className="cursor-pointer hover:text-red-400" size={18} />
          </DialogTitle>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Do you want to logout ?</DialogTitle>
            </DialogHeader>
            <div className="flex w-full flex-col gap-2 border-2 sm:flex-row">
              <Button
                variant={'destructive'}
                className="w-full"
                onClick={async () => await signOut()}
              >
                Yes, please
              </Button>
              <Button
                variant={'outline'}
                className="w-full border-2 border-[#353535]"
                onClick={() => setOpenDialog(false)}
              >
                No , thanks
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
