import { Module } from '@nestjs/common';

//* controllers *//
import { SeedController } from './seed.controller';

//* services *//
import { SeedService } from './seed.service';

//* modules *//
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule],
})
export class SeedModule {}
