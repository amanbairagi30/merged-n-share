import express from 'express'
import { WebSocket, WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

const NEXT_API_URL = 'http://localhost:3000/api/leaderboard';

const fetchAndBroadCastLeaderBoard = async () => {
  try {

    const resp = await fetch(NEXT_API_URL);
    const response = await resp.json();
    const leaderboardData = response?.data

    console.log(leaderboardData);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'leaderboard', data: leaderboardData }));
      }
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    try {
      const message = JSON.parse(data.toString()) // Convert Buffer to string before parsing
      if (message.type === 'requestUpdate') {
        fetchAndBroadCastLeaderBoard()
      }
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  });

  ws.send(JSON.stringify({ type: 'welcome', message: 'Hello! Message From Server!!' }));
});