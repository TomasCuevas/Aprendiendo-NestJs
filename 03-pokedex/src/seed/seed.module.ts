import { Module } from '@nestjs/common';

//* services *//
import { SeedService } from './seed.service';

//* controllers *//
import { SeedController } from './seed.controller';

//* modules *//
import { CommonModule } from 'src/common/common.module';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule, CommonModule],
})
export class SeedModule {}
