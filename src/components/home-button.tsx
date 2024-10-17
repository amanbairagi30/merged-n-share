"use client";
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function HomeButton() {
    const router = useRouter();
    return (
        <Button variant={'link'} onClick={() => router.push("/")} className='mt-4'>Go to Home</Button>
    )
}
