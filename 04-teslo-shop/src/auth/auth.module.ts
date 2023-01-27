import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { AuthController } from './auth.controller';

//* services *//
import { AuthService } from './auth.service';

//* entities *//
import { User } from './entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
