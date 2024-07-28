'use client'
import useWebSocket from '@/app/hooks/useWebsocket';
import LeaderboardCard from '@/components/LeaderboardCard';
import { RefreshCcw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Leaderboard() {
  const { isConnected, leaderboard, isFetching, message, requestUpdate } = useWebSocket(process.env.NEXT_PUBLIC_WS_SERVER_URL || 'ws://localhost:8080');
  const session = useSession();
  const currUser = session?.data?.user;

  return (
    <div>
      {isConnected ? (
        <>
          <button disabled={isFetching} className='border-2 border-[#353535] rounded-md my-2 flex items-center gap-2  text-xs font-normal w-fit h-fit p-2' onClick={requestUpdate}>
            <RefreshCcw className={`${isFetching ? 'animate-spin' : ''} -scale-[1]`} size={18} />
            <p>Refresh Leaderboard </p>
          </button>
          {
            !isFetching &&
            <LeaderboardCard
              leaderboard={leaderboard}
              currUser={currUser}
            />
          }
        </>
      ) : (
        <p>Connecting to leaderboard...</p>
      )}
    </div>
  );
}
