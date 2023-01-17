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
    await this.pokemonService.removeMany();

    const { data } = await this.axios.get<IPokeResponse>(
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
