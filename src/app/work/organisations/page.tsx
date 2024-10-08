"use client";
import React, { useState, useCallback, useEffect } from 'react'
import OrgCard from '@/components/OrgCard'
import { Input } from "@/components/ui/input"
import debounce from 'lodash/debounce';
import { Organisations as OrgType } from '@prisma/client';
import { Save, Search, SearchCode, Telescope } from 'lucide-react';


const SearchBox = ({ setOrganisations, approvedOrganisations, }: { setOrganisations: (orgs: OrgType[]) => void, approvedOrganisations: OrgType[] }) => {

    const [orgName, setOrgName] = useState<String>("");
    const fetchOrganisationsOnSearch = async (name: string) => {

        if (name.trim() === "") {
            setOrganisations(approvedOrganisations);
            return;
        }

        const response = await fetch(`https://api.github.com/search/users?q=${name}+type:org`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const organisations: OrgType[] = data.items.map((item: any) => {
                const isApproved = approvedOrganisations.some(org => org.id === item.id);
                return {
                    id: item.id,
                    name: item.login,
                    github_url: item.html_url, // Use the correct URL field
                    avatar_url: item.avatar_url,
                    isApproved: isApproved,
                };
            });

            // @ts-ignore
            setOrganisations(organisations);

            console.log('inside searchbox : ', { organisations })
        }
    };

    const debouncedFetchOrganisations = useCallback(debounce(fetchOrganisationsOnSearch, 400), [approvedOrganisations]);

    const HandleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOrgName(value);
        if (value.trim() === "") {
            console.log("set to previous orgs : ", { approvedOrganisations });
            setOrganisations(approvedOrganisations);
        } else {
            debouncedFetchOrganisations(value);
        }
    }

    return (
        <div className='w-full flex flex-col gap-6 text-center py-6 items-center justify-center h-fit'>
            <div className='max-w-2xl mx-auto px-4'>
                <h1 className='text-2xl mb-2 font-semibold font-primary'>Find your organisations</h1>
                <p className='text-sm text-gray-500 font-semibold'>Search and save the organisations which you think you have made some contributions in.</p>
            </div>

            <aside className='flex items-center justify-evenly gap-4 max-w-lg w-full mx-auto px-4'>
                <div className='flex items-center gap-2'>
                    <SearchCode className='w-4 h-4' />
                    <p className='font-normal text-gray-500 text-sm font-secondary'>Search</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Save className='w-4 h-4' />
                    <p className='font-normal text-gray-500 text-sm font-secondary'>Save</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Telescope className='w-4 h-4' />
                    <p className='font-normal text-gray-500 text-sm font-secondary'>Explore</p>
                </div>
            </aside>

            <div className='flex gap-2 items-center border-2 p-4 rounded-xl w-full max-w-2xl mx-auto mt-4'>
                <div className='w-[3rem] flex items-center justify-center rounded-xl h-[3rem]'>
                    <Search />
                </div>
                <Input
                    type="text"
                    placeholder="Search organisations names here (ex. code100x, dicedb and vercel etc...)"
                    className='bg-background placeholder:text-opacity-10 border-none h-[3rem]'
                    onChange={HandleChange}
                />
            </div>
        </div>
    );
}



const Organisations = () => {

    const [organisations, setOrganisations] = useState<OrgType[]>([]);
    const [approvedOrganisations, setApprovedOrganisations] = useState<OrgType[]>([]);

    useEffect(() => {

        const fetchApprovedOrganisations = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/organisation`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const data = await response.json();

                    const organisations: OrgType[] = data.organisations.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        github_url: item.github_url,
                        avatar_url: item.avatar_url,
                        isApproved: true
                    }));


                    setApprovedOrganisations(organisations);
                    setOrganisations(organisations);
                }
            } catch (error) {
                console.log("Someething went wrong while fetching approved organisations at organisations page.tsx")
            }
        }
        fetchApprovedOrganisations();
    }, [])


    return (
        <div className="flex flex-col font-normal relative border-none border-r-0 min-h-full max-h-fit rounded-l-[8px]">
            <SearchBox setOrganisations={setOrganisations} approvedOrganisations={approvedOrganisations} />
            <div className='w-full mt-10'>
                <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                    {organisations && organisations.map((org) => (
                        <OrgCard
                            key={org.id}
                            organisation={org}
                            // @ts-ignore
                            isApproved={org.isApproved || false}
                            setApprovedOrganisations={setApprovedOrganisations}
                            setOrganisations={setOrganisations}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Organisations