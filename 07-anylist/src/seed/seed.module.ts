import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//* resolvers *//
import { SeedResolver } from './seed.resolver';

//* services *//
import { SeedService } from './seed.service';

//* modules *//
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';
import { ListsModule } from '../lists/lists.module';
import { ListItemModule } from '../list-item/list-item.module';

@Module({
  imports: [
    ConfigModule,
    ItemsModule,
    ListItemModule,
    ListsModule,
    UsersModule,
  ],
  providers: [SeedResolver, SeedService],
})
export class SeedModule {}
