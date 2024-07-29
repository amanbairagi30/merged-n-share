'use client'
import React from 'react'
import { toast } from 'sonner'

export default function RequestAccessButton() {
    return (
        <button onClick={()=>toast.info('Coming Soon !')} className='flex items-center hover:bg-blue-600 justify-center bg-blue-500 w-fit h-fit rounded-lg py-[1rem] px-[2.5rem]'>Request to make it public</button>
    )
}
