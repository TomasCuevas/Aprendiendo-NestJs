import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Mercedes', model: 'Class G' },
    { id: 3, brand: 'Honda', model: 'Civic' },
  ];
}
