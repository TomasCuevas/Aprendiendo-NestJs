import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* service *//
import { UsersService } from './users.service';

//* resolver *//
import { UsersResolver } from './users.resolver';

//* entity *//
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
