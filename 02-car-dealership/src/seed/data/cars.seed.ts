import { v4 as uuid } from 'uuid';

//* interfaces *//
import { ICar } from 'src/cars/interfaces/car.interface';

export const CARS_SEED: ICar[] = [
  { id: uuid(), brand: 'Honda', model: 'Civic' },
  { id: uuid(), brand: 'Toyota', model: 'Corolla' },
  { id: uuid(), brand: 'Ferrari', model: 'SF90' },
  { id: uuid(), brand: 'Mercedes', model: 'Clase G' },
  { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
];
