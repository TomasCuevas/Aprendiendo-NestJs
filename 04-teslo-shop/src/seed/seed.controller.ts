import { Controller, Post } from '@nestjs/common';

//* service *//
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
