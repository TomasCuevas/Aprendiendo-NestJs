import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* service *//
import { UsersService } from './users.service';

//* resolver *//
import { UsersResolver } from './users.resolver';

//* entity *//
import { User } from './entities';

//* modules *//
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ItemsModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
