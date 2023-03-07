import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//* resolvers *//
import { SeedResolver } from './seed.resolver';

//* services *//
import { SeedService } from './seed.service';

//* modules *//
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [ConfigModule, UsersModule, ItemsModule],
  providers: [SeedResolver, SeedService],
})
export class SeedModule {}
