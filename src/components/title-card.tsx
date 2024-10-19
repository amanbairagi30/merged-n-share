import React from 'react';

export default function TitleCard({ icon: Icon, title }: any) {
  return (
    <div className="hover: group relative mx-auto flex h-fit w-fit cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-full">
      <div className="bg-ye-500 top-0 z-[20] mx-[2px] flex h-full w-[10rem] items-center justify-center gap-2 rounded-full border-2 bg-background px-4 py-2">
        <Icon className="h-5 w-5 duration-1000 group-hover:text-primary" />
        <p className="font-secondary">{title}</p>
      </div>
      <div className="absolute h-[6rem] w-full translate-y-[6.5rem] bg-primary transition-all duration-1000 ease-in-out group-hover:translate-y-0"></div>
    </div>
  );
}
