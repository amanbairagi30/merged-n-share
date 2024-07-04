"use client";
import React, { useState, useCallback, useEffect } from 'react'
import OrgCard from '@/components/OrgCard'
import { Input } from "@/components/ui/input"
import debounce from 'lodash/debounce';
import { Organisations as OrgType } from '@prisma/client';


const SearchBox = ({ setOrganisations, approvedOrganisations, }: { setOrganisations: (orgs: OrgType[]) => void, approvedOrganisations: OrgType[] }) => {

    const [orgName, setOrgName] = useState<String>("");
console.log(process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN)
    const fetchOrganisationsOnSearch = async (name: string) => {

        if (name.trim() === "") {
            setOrganisations(approvedOrganisations);
            return;
        }

        const response = await fetch(`https://api.github.com/search/users?q=${name}+type:org`, {
            method: 'GET',
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

    const debouncedFetchOrganisations = useCallback(debounce(fetchOrganisationsOnSearch, 400), []);

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

    return <div className='w-full text-center p-10'>
        <h1 className='text-white my-6 text-4xl text-semibold'> Find Your Organisations here</h1>
        <Input type="text" placeholder="Search Organisation Name..."
            className='bg-black text-white border-none w-4/6 mx-auto'
            name={orgName as any}
            value={orgName as any}
            onChange={HandleChange}
        />
    </div>
}



const Organisations = () => {

    const [organisations, setOrganisations] = useState<OrgType[]>([]);
    const [approvedOrganisations, setApprovedOrganisations] = useState<OrgType[]>([]);

    useEffect(() => {

        const fetchApprovedOrganisations = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/organisation`, {
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
        <div className="flex flex-col bg-[#1b1b1b] items-start font-normal relative border-none border-r-0 min-h-full max-h-fit rounded-l-[8px] border-2 border-red-400">
            <SearchBox setOrganisations={setOrganisations} approvedOrganisations={approvedOrganisations} />
            <div className='p-10 flex gap-5 justify-evenly w-full flex-wrap'>

                {organisations && organisations.map((org) => {
                    //@ts-ignore
                    return <OrgCard key={org.id} organisation={org} isApproved={org.isApproved || false} setApprovedOrganisations={setApprovedOrganisations} setOrganisations={setOrganisations} />
                })}

            </div>
        </div>
    )
}

export default Organisations