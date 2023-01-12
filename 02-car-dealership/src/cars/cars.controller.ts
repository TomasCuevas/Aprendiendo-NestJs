import { Controller, Get, Param } from '@nestjs/common';

//* services *//
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCardById(@Param('id') id) {
    return this.carsService.findOneById(+id);
  }
}
