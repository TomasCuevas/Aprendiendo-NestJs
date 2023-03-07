import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor() {}

  //! execute seed
  async executeSeed() {
    return true;
  }
}
