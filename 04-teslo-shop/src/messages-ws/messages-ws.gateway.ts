import { WebSocketGateway } from '@nestjs/websockets';

//* service *//
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway(3001, { cors: true })
export class MessagesWsGateway {
  constructor(private readonly messagesWsService: MessagesWsService) {}
}
