export interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  totalPoints: number;
  bounties: number;
}

export interface WebSocketMessage {
  type: string;
  data?: LeaderboardEntry[];
  message?: string;
}
