import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  public populateDB() {
    return 'SEED executed';
  }
}
