import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

//* service *//
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway(3001, { cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
  }
}
