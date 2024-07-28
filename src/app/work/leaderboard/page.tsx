'use client'
import useWebSocket from '@/app/hooks/useWebsocket';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Leaderboard() {
  const { isConnected, leaderboard, message, requestUpdate } = useWebSocket(process.env.NEXT_PUBLIC_WS_SERVER_URL || 'ws://localhost:8080');
  const session = useSession();
  const currUser = session?.data?.user;

  return (
    <div>
      {isConnected ? (
        <>
          <button onClick={requestUpdate}>Refresh Leaderboard</button>
          <ul>
            {leaderboard.map((user) => (
              // @ts-ignore
              <li className={currUser?.id === user.id ? 'bg-blue-500' : ''} key={user.id}>
                {user.name || user.username} - {user.totalPoints} - {user.bounties} points
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Connecting to leaderboard...</p>
      )}
    </div>
  );
}
