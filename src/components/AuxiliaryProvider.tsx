'use client';
import React, { ReactNode } from 'react';
import Topbar from '@/components/Topbar';
import { useSidebarStore } from '@/store/sidebar';

export default function AuxiliaryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const sidebarVisibility = useSidebarStore((state) => state.sidebarVisibility);
  return (
    <div
      className={`flex flex-col ${sidebarVisibility ? 'w-full' : 'w-full md:w-[calc(100vw-18rem)]'} `}
    >
      {/* <TopBar /> */}
      <Topbar />
      <div className="!h-[calc(100vh-4rem)] overflow-auto border-green-500 p-4">
        {children}
      </div>
    </div>
  );
}
