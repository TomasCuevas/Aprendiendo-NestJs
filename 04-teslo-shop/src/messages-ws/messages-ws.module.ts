import { Module } from '@nestjs/common';

//* gateway
import { MessagesWsGateway } from './messages-ws.gateway';

//* service *//
import { MessagesWsService } from './messages-ws.service';

//* modules *//
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AuthModule],
})
export class MessagesWsModule {}
