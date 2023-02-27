import { Module } from '@nestjs/common';

//* service *//
import { AuthService } from './auth.service';

//* resolver *//
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
