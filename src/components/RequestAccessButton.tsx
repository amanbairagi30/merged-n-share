'use client';
import React from 'react';
import { toast } from 'sonner';

export default function RequestAccessButton() {
  return (
    <button
      onClick={() => toast.info('Coming Soon !')}
      className="flex h-fit w-fit items-center justify-center rounded-lg bg-blue-500 px-[2.5rem] py-[1rem] hover:bg-blue-600"
    >
      Request to make it public
    </button>
  );
}
