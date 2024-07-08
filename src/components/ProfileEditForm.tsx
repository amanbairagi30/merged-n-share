'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

export default function ProfileEditForm({ user }: any) {
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleEditUpdate = async () => {
        setLoading(true);
        if (!newName) {
            alert(" it must be a vaid name");
            return;
        }
        const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: 'PUT',
            body: JSON.stringify({ name: newName.trim() })
        })

        const response = await resp.json();
        console.log(response);
        if (response?.success) {
            alert(response?.message);
        }
        setLoading(false);
        setOpenDialog(false);
    }
    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTitle onClick={()=>setOpenDialog(true)}>
                    <Pencil className='cursor-pointer' size='15' />
                </DialogTitle>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-2'>
                        <Input onChange={(e) => setNewName(e.target.value)} className='focus:border-2' placeholder={`${user?.name}`} />
                        <Button onClick={handleEditUpdate}>Save changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
