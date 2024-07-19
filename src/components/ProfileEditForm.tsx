'use client'
import React, { useEffect, useState } from 'react'
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
                <DialogTitle onClick={() => setOpenDialog(true)}>
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


export const PersonalDetailForm = () => {

    const [socialLinks, setSocialLinks] = useState({ x: "", linkedIn: "" })

    const updateLinks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: "PUT",
            body: JSON.stringify({ socialLinks })
        })
    }

    const getUserDetails = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: "GET",
        })

        const resp = await response.json();

        console.log(resp?.user)
        setSocialLinks({ x: resp?.user[0]?.xProfile, linkedIn: resp?.user[0]?.linkedInProfile })
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 '>

            <div className='flex flex-col gap-2'>
                <p className='text-xs text-gray-400'>Enter X profile (optional)</p>
                <Input
                    placeholder='Enter X profile'
                    value={socialLinks.x}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, x: e.target.value.trim() }))}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-xs text-gray-400'>Enter LinkedIn profile (optional)</p>
                <Input
                    placeholder='Enter X profile'
                    value={socialLinks.linkedIn}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, linkedIn: e.target.value.trim() }))}
                />
            </div>

            <div className='col-span-1'>
                <button onClick={updateLinks} className='border-2 border-[#353535] rounded-lg h-fit p-2 w-[calc(50%-0.5rem)]'>Save</button>
            </div>
        </div>
    )
}