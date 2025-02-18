import { LeaderboardEntry, WebSocketMessage } from '@/util/types';
import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [message, setMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const connect = useCallback(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    websocket.onmessage = (event: MessageEvent) => {
      console.log(event);
      const data: WebSocketMessage = JSON.parse(event.data);
      switch (data.type) {
        case 'leaderboard':
          if (data.data) {
            setLeaderboard(data.data);
            setIsFetching(false);
          }
          break;
        case 'welcome':
          if (data.message) setMessage(data.message);
          break;
        default:
          console.log('Received message:', data);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      // Attempt to reconnect after a delay
      setTimeout(connect, 3000);
    };

    setWs(websocket);
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connect]);

  const requestUpdate = useCallback(() => {
    if (ws && isConnected) {
      setIsFetching(true);
      ws.send(JSON.stringify({ type: 'requestUpdate' }));
    }
  }, [ws, isConnected]);

  return { isConnected, leaderboard, message, isFetching, requestUpdate };
};

export default useWebSocket;
