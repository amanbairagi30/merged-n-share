'use client';
import React from 'react';

export default function MarketingNavbar() {
  return (
    <div className="fixed left-[50%] top-0 z-[100] flex w-[25rem] translate-x-[-50%] items-center justify-center gap-1 rounded-b-xl bg-accent px-2 py-1 shadow-2xl">
      Powered by{' '}
      <p
        onClick={() => window.open(process.env.NEXT_PUBLIC_URL, '_blank')}
        className="cursor-pointer font-secondary text-lg font-extrabold hover:underline"
      >
        {' '}
        Merged<span className="text-primary">&</span>Share.
      </p>
    </div>
  );
}
