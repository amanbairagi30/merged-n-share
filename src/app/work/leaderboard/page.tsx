'use client';
import LeaderboardCard from '@/components/LeaderboardCard';
import { RefreshCcw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  // const { isConnected, leaderboard, isFetching, message, requestUpdate } = useWebSocket(process.env.NEXT_PUBLIC_WS_SERVER_URL || 'ws://localhost:8080');
  const session = useSession();
  const currUser = session?.data?.user;
  const [leaderboard, setLeaderboard] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchLeaderBoard = async () => {
    try {
      setIsFetching(true);
      const resp = await fetch('/api/leaderboard');
      const response = await resp.json();
      setIsFetching(false);

      const leaderboardData = response?.data;
      setLeaderboard(leaderboardData);
    } catch (error) {
      setIsFetching(false);
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  return (
    <div>
        <h1 className='text-2xl font-semibold'>Leaderboard</h1>
        <p className='text-sm text-gray-500 dark:text-gray-300'>Below section shows you the leaderboard of the user based on the Merged&Share coin , currently you get assigned <span className='text-primary'>one coin</span> on each successsful addition of your merged PR in our DB from the My-PR section (WIP)</p>
      {!isFetching ? (
        <>
          <LeaderboardCard leaderboard={leaderboard} currUser={currUser} />
        </>
      ) : (
        <p className="my-2 text-center text-sm font-semibold">
          Fetching leaderboard...
        </p>
      )}
    </div>
  );
}
