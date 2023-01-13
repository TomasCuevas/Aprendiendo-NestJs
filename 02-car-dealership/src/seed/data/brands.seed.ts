import { v4 as uuid } from 'uuid';

//* entity *//
import { Brand } from '../../brands/entities/brand.entity';

export const BRANDS_SEED: Brand[] = [
  { id: uuid(), name: 'Honda', createdAt: new Date().getTime() },
  { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
  { id: uuid(), name: 'Ferrari', createdAt: new Date().getTime() },
  { id: uuid(), name: 'Mercedes', createdAt: new Date().getTime() },
  { id: uuid(), name: 'Jeep', createdAt: new Date().getTime() },
];
