"use client"
import React from 'react'
import { Badge } from './ui/badge'
import { LucideExternalLink } from 'lucide-react'

export default function YourProfileButton({ username }: { username: string | undefined }) {
    return (
        <Badge onClick={() => window.open(`/profile/${username}`, '_blank')} className='flex cursor-pointer bg-accent hover:bg-accent text-foreground py-1  items-center gap-2'>
            <span>Your profile</span>
            <LucideExternalLink className='w-4 h-4' />
        </Badge>
    )
}
