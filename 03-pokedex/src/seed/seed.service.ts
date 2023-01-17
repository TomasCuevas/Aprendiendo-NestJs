import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

//* interfaces *//
import { IPokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const pokemons = data.results.map(({ name, url }) => ({
      name: name,
      id: +url.split('/').at(-2),
    }));

    return pokemons;
  }
}
