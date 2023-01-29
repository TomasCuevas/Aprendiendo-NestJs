import { Module } from '@nestjs/common';

//* controllers *//
import { SeedController } from './seed.controller';

//* services *//
import { SeedService } from './seed.service';

//* modules *//
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule, AuthModule],
})
export class SeedModule {}
