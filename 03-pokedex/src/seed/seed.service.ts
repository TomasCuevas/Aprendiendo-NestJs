import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

//* services *//
import { PokemonService } from 'src/pokemon/pokemon.service';

//* interfaces *//
import { IPokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonService.removeMany();

    const data = await this.http.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach((pokemon) => {
      const name = pokemon.name.toLocaleLowerCase();
      const no = +pokemon.url.split('/').at(-2);

      pokemonToInsert.push({
        name,
        no,
      });
    });

    await this.pokemonService.createMany(pokemonToInsert);

    return 'Seed executed';
  }
}
