import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//* resolvers *//
import { SeedResolver } from './seed.resolver';

//* services *//
import { SeedService } from './seed.service';

@Module({
  imports: [ConfigModule],
  providers: [SeedResolver, SeedService],
})
export class SeedModule {}
