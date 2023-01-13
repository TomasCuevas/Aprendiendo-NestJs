import { Module } from '@nestjs/common';

//* modules *//
import { CarsModule } from 'src/cars/cars.module';
import { BrandsModule } from '../brands/brands.module';

//* controllers *//
import { SeedController } from './seed.controller';

//* services *//
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CarsModule, BrandsModule],
})
export class SeedModule {}
