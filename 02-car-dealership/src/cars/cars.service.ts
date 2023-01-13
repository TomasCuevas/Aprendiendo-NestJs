import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

//* dtos *//
import { CreateCartDto, UpdateCarDto } from './dto';

//* interfaces *//
import { ICar } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Mercedes', model: 'Clase G' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id}. Not found`);

    return car;
  }

  create(createCarDto: CreateCartDto) {
    const car: ICar = { id: uuid(), ...createCarDto };
    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillCarsWithSeedData(cars: ICar[]) {
    this.cars = cars;
  }
}
