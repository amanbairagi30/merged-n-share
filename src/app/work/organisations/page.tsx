'use client';
import React, { useState, useCallback, useEffect } from 'react';
import OrgCard from '@/components/OrgCard';
import { Input } from '@/components/ui/input';
import debounce from 'lodash/debounce';
import { Organisations as OrgType } from '@prisma/client';
import { Save, Search, SearchCode, Telescope } from 'lucide-react';

const SearchBox = ({
  setOrganisations,
  approvedOrganisations,
}: {
  setOrganisations: (orgs: OrgType[]) => void;
  approvedOrganisations: OrgType[];
}) => {
  const [orgName, setOrgName] = useState<String>('');
  const fetchOrganisationsOnSearch = async (name: string) => {
    if (name.trim() === '') {
      setOrganisations(approvedOrganisations);
      return;
    }

    const response = await fetch(
      `https://api.github.com/search/users?q=${name}+type:org`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const organisations: OrgType[] = data.items.map((item: any) => {
        const isApproved = approvedOrganisations.some(
          (org) => org.id === item.id,
        );
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

      console.log('inside searchbox : ', { organisations });
    }
  };

  const debouncedFetchOrganisations = useCallback(
    debounce(fetchOrganisationsOnSearch, 400),
    [approvedOrganisations],
  );

  const HandleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrgName(value);
    if (value.trim() === '') {
      console.log('set to previous orgs : ', { approvedOrganisations });
      setOrganisations(approvedOrganisations);
    } else {
      debouncedFetchOrganisations(value);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-6 py-6 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-2 font-primary text-2xl font-semibold">
          Find your organisations
        </h1>
        <p className="text-sm font-semibold text-gray-500">
          Search and save the organisations which you think you have made some
          contributions in.
        </p>
      </div>

      <aside className="mx-auto flex w-full max-w-lg items-center justify-evenly gap-4 px-4">
        <div className="flex items-center gap-2">
          <SearchCode className="h-4 w-4" />
          <p className="font-secondary text-sm font-normal text-gray-500">
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          <p className="font-secondary text-sm font-normal text-gray-500">
            Save
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Telescope className="h-4 w-4" />
          <p className="font-secondary text-sm font-normal text-gray-500">
            Explore
          </p>
        </div>
      </aside>

      <div className="mx-auto mt-4 flex w-full max-w-2xl items-center gap-2 rounded-xl border-2 p-4">
        <div className="flex h-[3rem] w-[3rem] items-center justify-center rounded-xl">
          <Search />
        </div>
        <Input
          type="text"
          placeholder="Search organisations names here (ex. code100x, dicedb and vercel etc...)"
          className="h-[3rem] border-none bg-background placeholder:text-opacity-10"
          onChange={HandleChange}
        />
      </div>
    </div>
  );
};

const Organisations = () => {
  const [organisations, setOrganisations] = useState<OrgType[]>([]);
  const [approvedOrganisations, setApprovedOrganisations] = useState<OrgType[]>(
    [],
  );

  useEffect(() => {
    const fetchApprovedOrganisations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/organisation`,
          {
            method: 'GET',
          },
        );
        if (response.ok) {
          const data = await response.json();

          const organisations: OrgType[] = data.organisations.map(
            (item: any) => ({
              id: item.id,
              name: item.name,
              github_url: item.github_url,
              avatar_url: item.avatar_url,
              isApproved: true,
            }),
          );

          setApprovedOrganisations(organisations);
          setOrganisations(organisations);
        }
      } catch (error) {
        console.log(
          'Someething went wrong while fetching approved organisations at organisations page.tsx',
        );
      }
    };
    fetchApprovedOrganisations();
  }, []);

  return (
    <div className="relative flex max-h-fit min-h-full flex-col rounded-l-[8px] border-r-0 border-none font-normal">
      <SearchBox
        setOrganisations={setOrganisations}
        approvedOrganisations={approvedOrganisations}
      />
      <div className="mt-10 w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {organisations &&
            organisations.map((org) => (
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
  );
};

export default Organisations;
