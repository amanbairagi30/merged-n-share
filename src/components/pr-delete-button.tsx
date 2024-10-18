"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

export default function PrDeleteButton({ pullRequestId, getAllPullrequests }: { pullRequestId: string, getAllPullrequests: () => void }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const pathname = usePathname();
    const isMyPrSection = pathname === "/work/my-pr";

    const handleDeletePR = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch('/api/pr', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prId: pullRequestId }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                getAllPullrequests();
                setOpenDialog(false);
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the pull request");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isMyPrSection) return null;

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTitle asChild>
                <Button variant="ghost" size="icon" onClick={() => setOpenDialog(true)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </DialogTitle>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Do you really want to delete this pull request?</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row mt-4 w-full gap-2">
                    <Button
                        variant="destructive"
                        className="w-full font-bold"
                        onClick={handleDeletePR}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        className="border-2 w-full"
                        onClick={() => setOpenDialog(false)}
                        disabled={isDeleting}
                    >
                        No
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}