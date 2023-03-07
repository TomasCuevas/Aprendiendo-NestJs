import { Module } from '@nestjs/common';

//* resolvers *//
import { SeedResolver } from './seed.resolver';

//* services *//
import { SeedService } from './seed.service';

@Module({
  providers: [SeedResolver, SeedService],
})
export class SeedModule {}
