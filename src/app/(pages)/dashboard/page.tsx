'use client'
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react'

export default function Dashboard() {

    return (
        <div>
            Hello , You r loogged in
            <Button onClick={async () => {
                await signOut();
            }}>Logout</Button>
        </div>
    )
}
