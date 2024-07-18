"use client"
import React, { useEffect, useState } from 'react'
import { Switch } from './ui/switch'

export default function ProfileSwitch() {

    const [profileVisibility, setProfileVisibility] = useState<boolean>(false);

    const getUserData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: "GET",
        })

        const resp = await response.json();

        console.log(resp?.user)
        setProfileVisibility(resp?.user[0]?.isProfilePublic)
    }
    useEffect(() => {
        getUserData();
    }, [])

    const updatedUserProfile = async (e: boolean) => {
        try {
            setProfileVisibility(e);
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
                method: "PUT",
                body: JSON.stringify({ isChecked: e })
            });
            const data = await response.json();
            if (!data.success) {
                console.error('Failed to update profile:', data.message);
                setProfileVisibility(!e); // Revert the local state if the API call fails
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setProfileVisibility(!e); // Revert the local state if there's an error
        }
    }
    return (
        <div className='flex flex-col gap-1 items-center'>
            {/* <p className='text-sm'>Visibility</p> */}
            <Switch checked={profileVisibility} onCheckedChange={(e: any) => updatedUserProfile(e)} defaultChecked className="data-[state=checked]:bg-green-500" id="airplane-mode" />
        </div>
    )
}
