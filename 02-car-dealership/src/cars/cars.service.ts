import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

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
}
