import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Mercedes', model: 'Clase G' },
    { id: 3, brand: 'Honda', model: 'Civic' },
  ];

  public findAll() {
    return this.cars;
  }

  public findOneById(id: number) {
    return this.cars.find((car) => car.id === id);
  }
}
