import { Module } from '@nestjs/common';

//* service *//
import { AuthService } from './auth.service';

//* resolver *//
import { AuthResolver } from './auth.resolver';

//* modules *//
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
