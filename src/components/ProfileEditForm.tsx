'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileEditForm({ user }: any) {
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleEditUpdate = async () => {
        setLoading(true);
        if (!newName) {
            toast.warning(" it must be a vaid name");
            return;
        }
        const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: 'PUT',
            body: JSON.stringify({ name: newName.trim() })
        })

        const response = await resp.json();
        console.log(response);
        if (response?.success) {
            toast.success(response?.message);
        }
        setLoading(false);
        setOpenDialog(false);
    }
    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTitle onClick={() => setOpenDialog(true)}>
                    <div className='border-2 px-2 cursor-pointer bg-accent flex items-center gap-4 rounded-lg py-1'>
                        <p className='font-normal text-sm'>Edit</p>
                        <Pencil className=' w-3 h-3' />
                    </div>
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
        <div className='grid grid-cols-1 w-full gap-4 md:p-4 mt-10 md:mt-0'>

            <div className='flex flex-col gap-2'>
                <p className='text-sm'>X profile (optional)</p>
                <Input
                    placeholder='Enter X profile'
                    className='h-[3.5rem] px-4'
                    value={socialLinks.x}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, x: e.target.value.trim() }))}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-sm'>LinkedIn profile (optional)</p>
                <Input
                    placeholder='Enter X profile'
                    className='h-[3.5rem] px-4'
                    value={socialLinks.linkedIn}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, linkedIn: e.target.value.trim() }))}
                />
            </div>

            <Button onClick={updateLinks} className='rounded-lg h-8 p-2 w-fit px-8 font-semibold'>Save</Button>
        </div>
    )
}