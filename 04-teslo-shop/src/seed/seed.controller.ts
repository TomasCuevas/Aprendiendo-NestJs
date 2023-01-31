import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//* custom decorators *//
import { Auth } from '../auth/decorators';

//* service *//
import { SeedService } from './seed.service';

//* interface *//
import { IValidRoles } from 'src/auth/interfaces/validRoles.interface';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  // @Auth(IValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
