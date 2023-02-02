import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';

//* dtos *//
import { NewMessageDto } from './dto';

//* service *//
import { MessagesWsService } from './messages-ws.service';

//* interfaces *//
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway(3001, { cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: IJwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! emite unicamente al cliente
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message,
    // });

    //! emitir a todos MENOS al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message,
    // });

    //! emitir a todos
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullNameBySocketId(client.id),
      message: payload.message,
    });
  }
}
