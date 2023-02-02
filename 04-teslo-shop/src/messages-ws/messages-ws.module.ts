import { Module } from '@nestjs/common';

//* gateway
import { MessagesWsGateway } from './messages-ws.gateway';

//* service *//
import { MessagesWsService } from './messages-ws.service';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
})
export class MessagesWsModule {}
