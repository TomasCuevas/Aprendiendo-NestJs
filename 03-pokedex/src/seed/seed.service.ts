import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

//* services *//
import { PokemonService } from 'src/pokemon/pokemon.service';

//* interfaces *//
import { IPokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async executeSeed() {
    const { data } = await this.axios.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.map((pokemon) => {
      const name = pokemon.name;
      const no = +pokemon.url.split('/').at(-2);

      this.pokemonService.create({ name, no });

      return {
        name,
        no,
      };
    });

    return 'Seed executed';
  }
}
