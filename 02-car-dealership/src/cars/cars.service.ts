import { Injectable } from '@nestjs/common';
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

  public findAll() {
    return this.cars;
  }

  public findOneById(id: string) {
    return this.cars.find((car) => car.id === id);
  }

  public create(createCarDto: CreateCartDto) {
    const car: ICar = { id: uuid(), ...createCarDto };
    this.cars.push(car);

    return car;
  }

  public update(id: string, updateCarDto: UpdateCarDto) {}
}
