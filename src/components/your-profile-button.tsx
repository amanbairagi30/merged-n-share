'use client';
import React from 'react';
import { Badge } from './ui/badge';
import { LucideExternalLink } from 'lucide-react';

export default function YourProfileButton({
  username,
}: {
  username: string | undefined;
}) {
  return (
    <Badge
      onClick={() => window.open(`/profile/${username}`, '_blank')}
      className="flex cursor-pointer items-center gap-2 bg-accent py-1 text-foreground hover:bg-accent"
    >
      <span>Your profile</span>
      <LucideExternalLink className="h-4 w-4" />
    </Badge>
  );
}
