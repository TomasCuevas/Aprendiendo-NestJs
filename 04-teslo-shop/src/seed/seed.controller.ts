import { Controller, Post } from '@nestjs/common';

//* custom decorators *//
import { Auth } from '../auth/decorators';

//* service *//
import { SeedService } from './seed.service';

//* interface *//
import { IValidRoles } from 'src/auth/interfaces/validRoles.interface';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  // @Auth(IValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
