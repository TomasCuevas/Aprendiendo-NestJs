import { Controller, Post } from '@nestjs/common';

//* services *//
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
