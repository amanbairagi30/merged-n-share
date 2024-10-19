'use client';
import PRCard from '@/components/PRCard';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Info, Loader, Search } from 'lucide-react';
import { Organisations as OrgType } from '@prisma/client';
import { toast } from 'sonner';
import Image from 'next/image';
import { updateUserContributedOrgs } from '@/app/actions/userAction';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/app/hooks/useDebounce';

export default function MyPR() {
  const session = useSession();
  const [prdata, setPrData] = useState<any[]>([]);
  const [organisations, setOrganisations] = useState<OrgType[]>([]);
  const [fetchedMergedPRData, setFetchedMergedPRData] = useState<any[]>([]);
  const [selectedOrgData, setSelectedOrgData] = useState({
    id: '',
    name: '',
    avatar: '',
    github_url: '',
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showFetchedMergedPRDialog, setShowFetchedMergedPRDialog] =
    useState(false);
  const [query, setQuery] = useState('');
  const [resultantPrs, setResultantPrs] = useState<any[]>([]);
  const user = session?.data?.user;

  // console.log(selectedOrgData);

  const handleFetchPRDetails = async () => {
    if (!user || !selectedOrgData?.name) {
      toast.warning('Select the organisation and then proceed');
      return;
    }
    setIsLoading(true);
    setShowFetchedMergedPRDialog(true);
    const response = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${user?.username}+org:${selectedOrgData?.name}+is:merged`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`,
        },
      },
    );
    setIsLoading(false);

    const finalData = await response.json();
    if (Number(finalData.status) === 422) {
      // console.log(finalData.errors[0].message);
      toast.error('Hi : ', finalData.errors[0].message);
      return;
    }

    const mergedPRsData = await Promise.all(
      finalData?.items
        ?.map(async (pr: any, index: number) => {
          if (user?.username === pr.user.login) {
            const prDetails = {
              prURL: pr.html_url,
              prTitle: pr.title,
              prNumber: pr.number,
              repoURL: pr.repository_url,
              userName: pr.user.login,
              avatar: pr.user.avatar_url,
              commentURL: pr.comments_url,
              organisationId: selectedOrgData.id,
              isVerified: true,
              mergedAt: pr.pull_request.merged_at,
              body: pr.body,
              draft: pr.draft,
              bounty: null,
            };

            const commentsResponse = await fetch(pr.comments_url, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH_TOKEN}`,
              },
            });
            const commentsData = await commentsResponse.json();

            const hkiratComments = commentsData
              ?.filter((comment: any) => comment.user.login === 'hkirat')
              .map((item: any) => {
                // console.log(item.body)
                if (isBountyComment(item.body)) {
                  return extractAmount(item.body);
                }
                return null;
              })
              .filter((amount: any) => amount !== null);

            // console.log(hkiratComments)
            prDetails.bounty = hkiratComments;

            return prDetails;
          } else {
            return;
          }
        })
        .filter((pr: any) => pr !== undefined),
    );

    setIsLoading(false);
    setFetchedMergedPRData(mergedPRsData);
    // console.log(mergedPRsData);
  };

  useEffect(() => {
    getAllPullrequests();

    /* to fetch the organisations for the dropdown */
    const fetchOrganisations = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/organisation`,
        {
          method: 'GET',
        },
      );
      const resp = await response.json();
      if (resp.success) {
        // console.log({ resp })
        setOrganisations(resp.organisations);
      }
    };
    fetchOrganisations();
  }, []);

  const getAllPullrequests = async () => {
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pr`, {
      method: 'GET',
    });
    const resp = await response.json();
    if (resp.success) {
      console.log('fetched PRs suyccessfully');
      console.log(resp.pullRequests);
      setPrData(resp.pullRequests);
      setResultantPrs(resp.pullRequests);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const isBountyComment = (comment: string) => {
    return /\/bounty\s+(\$?\d+|\d+\$)/i.test(comment);
  };

  const extractAmount = (comment: string): number | null => {
    // console.log(comment);
    const bountyExtractor = /\/bounty\s+\$?(\d+)/i;
    const match = comment.match(bountyExtractor);
    return match ? parseInt(match[1]) : null;
  };

  const savePRsInDatabase = async (prs: any[]) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prs }),
    });

    const resp = await response.json();
    const orgsToUpdate = prs.map((pr) => pr.organisationId);
    // @ts-ignore
    await updateUserContributedOrgs(user?.id, orgsToUpdate);

    if (resp.success) {
      toast.success('Saved to DB');
    }
  };

  const newMergedPRData = fetchedMergedPRData.filter((pr: any) => {
    return !prdata.some(
      (savedPR) =>
        savedPR?.prNumber === pr?.prNumber && savedPR?.repoURL === pr?.repoURL,
    );
  });
  // console.log(newMergedPRData);
  // console.log(fetchedMergedPRData);

  const debouncedQuery = useDebounce(query, 500); // 500ms debounce delay

  // Filter and sort data based on debounced query
  const searchData = useCallback(() => {
    const filtered = prdata.filter(
      (pr) =>
        pr.prTitle.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        pr.org?.name?.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
    setResultantPrs(filtered);
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      searchData();
    } else {
      setResultantPrs(prdata); // Reset to full list if query is empty
    }
  }, [debouncedQuery, searchData]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [setQuery],
  );

  return (
    <div className="relative flex w-full flex-col items-start font-normal">
      <div className="flex h-full w-full flex-col gap-4 rounded-l-[12px]">
        <div className="via-bg-secondary/80 flex flex-col justify-between gap-4 rounded-xl bg-gradient-to-r from-secondary to-transparent p-4 md:flex-row md:items-center">
          <div>Merged PRs ({prdata?.length})</div>
          <div className="flex items-center gap-2">
            {/* @ts-ignore */}
            <Select
              onValueChange={(e:any) =>
                setSelectedOrgData({
                  id: e?.id,
                  name: e?.name,
                  avatar: e?.avatar_url,
                  github_url: e?.github_url,
                })
              }
            >
              <SelectTrigger className="min-w-[180px] max-w-full bg-background/40 p-4 text-foreground">
                <SelectValue placeholder="Select a Organisation" />
              </SelectTrigger>
              <SelectContent className="bg-background text-foreground">
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {organisations &&
                    organisations.map((org: any) => {
                      return (
                        <SelectItem value={org} key={org.id}>
                          <div className="flex items-center gap-2">
                            <Image
                              className="h-[1.5rem] w-[1.5rem] rounded-full"
                              src={org?.avatar_url}
                              width="500"
                              height="500"
                              alt="org-img"
                            />
                            <p>{org.name}</p>
                          </div>
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={() => handleFetchPRDetails()}
              className="w-[8rem] bg-primary"
            >
              Fetch
            </Button>
            <Dialog
              open={showFetchedMergedPRDialog}
              onOpenChange={setShowFetchedMergedPRDialog}
            >
              <DialogContent className="h-fit overflow-auto">
                <DialogHeader>
                  <DialogTitle>Fetch PRs</DialogTitle>
                  <DialogDescription>
                    Fetch all of your merged PRs from
                  </DialogDescription>
                </DialogHeader>
                <div
                  className={`h-[15rem] ${isLoading ? 'flex items-center justify-center' : ''} overflow-auto`}
                >
                  <div className="h-full">
                    {isLoading ? (
                      <div className="flex h-full items-center justify-center gap-2">
                        <Loader className="animate-spin" />
                        <span className="text-sm font-semibold">
                          Hang Tight ! Getting your PRs
                        </span>
                      </div>
                    ) : (
                      <div className="h-full">
                        {newMergedPRData.length > 0 ? (
                          <>
                            <div className="font-semibold">
                              Total Merged PRs : {newMergedPRData.length}
                            </div>

                            <div className="flex flex-col">
                              {newMergedPRData.map((item, index) => {
                                return (
                                  <div
                                    key={`pr-${index}-glimpse`}
                                    className="mt-4 rounded-lg border-2 border-black px-4 py-2 font-semibold"
                                  >
                                    #{item?.prNumber} in{' '}
                                    {
                                      item?.repoURL.split('/')[
                                        item.repoURL.split('/').length - 1
                                      ]
                                    }
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center text-center font-extrabold">
                            {/*@ts-ignore */}
                            <p>
                              No new merged PR found in this organization for{' '}
                              <span className="italic">{user?.username}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={newMergedPRData.length === 0}
                    onClick={() => savePRsInDatabase(fetchedMergedPRData)}
                    type="submit"
                  >
                    Save PRs to DB
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-4 flex w-full max-w-md items-center rounded-md border-2 px-4 py-1">
          <Search className="h-4 w-4" />
          <Input
            value={query}
            onChange={handleInputChange}
            className="w-full border-none placeholder:text-opacity-10"
            placeholder="Search for PR"
          />
        </div>

        {/* PR cards */}
        {isLoading ? (
          <div className="flex h-[80vh] w-full items-center justify-center gap-2">
            <Loader className="animate-spin" />
            <span className="text-xs">Fetching your PRs from DB</span>
          </div>
        ) : prdata && prdata.length > 0 ? (
          <div className="grid h-full grid-cols-1 flex-wrap gap-4 py-2 lg:grid-cols-2">
            {resultantPrs.map((item, index) => (
              <PRCard
                key={index}
                getAllPullrequests={getAllPullrequests}
                user={user}
                PRData={item}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[80vh] w-full items-center justify-center gap-2">
            {/* <Loader className='animate-spin' /> */}
            <span className="text-center text-sm md:w-[40%]">
              No PR data from DB , you can fetch your new merged PR by selecting
              organisation and then save it to DB
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
