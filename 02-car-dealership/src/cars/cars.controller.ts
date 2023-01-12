import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get(':id')
  getCardById(@Param('id') id) {
    return this.cars[id];
  }
}
