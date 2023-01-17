import { Module } from '@nestjs/common';

//* services *//
import { SeedService } from './seed.service';

//* controllers *//
import { SeedController } from './seed.controller';

//* modules *//
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule],
})
export class SeedModule {}
