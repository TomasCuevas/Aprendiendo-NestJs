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
    console.log('Cliente conectado', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id);
  }
}
