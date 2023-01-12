import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

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
  getCardById(@Param('id', ParseIntPipe) id) {
    const car = this.carsService.findOneById(+id);

    if (!car) throw new NotFoundException(`Car with id ${id}. Not found`);

    return car;
  }
}
