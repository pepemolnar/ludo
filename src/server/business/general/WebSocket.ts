import { WS_PORT } from '../../constants/generalConstants';
import WebSocket from 'ws';

export class SocketServer {
  webSocket!: WebSocket;

  public init() {
    const wss = new WebSocket.Server({ port: WS_PORT });

    wss.on('connection', (ws: WebSocket) => {
      this.webSocket = ws;

      ws.on('message', (message: string) => {
        this.handleMessage(message);
      });

      ws.on('close', () => {});

      this.handleConnection();
    });
  }

  private handleConnection() {
    console.log('New client connected');
  }

  private handleMessage(message: string) {
    console.log(`Received message: ${message}`);
    this.webSocket.send(`Server received your message: ${message}`);
  }

  private handleClose() {
    console.log('Client disconnected');
  }
}
