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
      console.log(leaderboardData);
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
