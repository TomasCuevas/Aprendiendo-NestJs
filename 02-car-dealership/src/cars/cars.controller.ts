import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

//* dtos *//
import { CreateCartDto } from './dto/create-car.dto';

//* services *//
import { CarsService } from './cars.service';

@Controller('cars')
@UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCardById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const car = this.carsService.findOneById(id);

    if (!car) throw new NotFoundException(`Car with id ${id}. Not found`);

    return car;
  }

  @Post()
  createCar(@Body() createCarDto: CreateCartDto) {
    return createCarDto;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'delete',
      id,
    };
  }
}
