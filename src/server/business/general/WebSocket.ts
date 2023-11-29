import { EMessageType, IMessage, IReadyCheckResultData } from '../../../app/sharedTpyes/generalTypes';
import { WS_PORT } from '../../constants/generalConstants';
import WebSocket from 'ws';
import { UserBusiness } from '../user/UserBusiness';

export class SocketServer {
  webSocket!: any;
  server: any;

  constructor() {
    this.server = new WebSocket.Server({ port: WS_PORT });
  }

  public init() {
    this.server.on('connection', (ws: WebSocket) => {
      this.webSocket = ws;
      this.webSocket.id = 1;

      ws.on('message', (message: string) => {
        this.handleMessage(message);
      });

      ws.on('close', () => {});

      this.handleConnection();
    });
  }

  private handleConnection() {
    console.log('New client connected');
    this.sendReadyCheckMessage();
  }

  private handleMessage(message: string) {
    console.log(`Received message: ${message}`);

    const messageObject: IMessage = JSON.parse(message);

    switch (messageObject.type) {
      case EMessageType.READY_CHECK:
        this.sendReadyCheckMessage();
        break;
      default:
        throw new Error('Message type is unknown!');
    }
  }

  private handleClose() {
    console.log('Client disconnected');
  }

  private async sendConnectionMessage() {
    const numberOfPlayers = this.server.clients.size;
    const userBusiness = new UserBusiness();
    const user = await userBusiness.getUserById(this.webSocket.id);

    const resultData: IMessage = {
      type: EMessageType.CONNECTION,
      data: {
        ready: numberOfPlayers === 4,
        newPlayer: user?.name as string
      }
    };

    for (const client of this.server.clients) {
      client.send(JSON.stringify(resultData));
    }
  }

  private async sendReadyCheckMessage() {
    const numberOfPlayers = this.server.clients.size;
    const userBusiness = new UserBusiness();
    const playersConnected: string[] = [];

    for (const client of this.server.clients) {
      const user = await userBusiness.getUserById(client.id);

      playersConnected.push(user?.name as string);
    }

    const resultData: IMessage = {
      type: EMessageType.READY_CHECK_RESULT,
      data: {
        ready: numberOfPlayers === 4,
        playersConnected
      }
    };

    for (const client of this.server.clients) {
      client.send(JSON.stringify(resultData));
    }
  }
}
