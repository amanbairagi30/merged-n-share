'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

export default function ProfileEditForm({ user }: any) {
    const handleEditUpdate = async () => {
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Pencil className='cursor-pointer' size='15' />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-2'>
                        <Input className='focus:border-2' placeholder={`${user?.name}`} />
                        <Button onClick={handleEditUpdate}>Save changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
