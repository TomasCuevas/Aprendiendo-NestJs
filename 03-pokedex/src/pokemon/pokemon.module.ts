import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//* services *//
import { PokemonService } from './pokemon.service';

//* controllers *//
import { PokemonController } from './pokemon.controller';

//* enties *//
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
})
export class PokemonModule {}