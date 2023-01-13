import { Injectable } from '@nestjs/common';

//* seed data *//
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

//* services *//
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  public populateDB() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeed(BRANDS_SEED);

    return 'SEED executed';
  }
}
