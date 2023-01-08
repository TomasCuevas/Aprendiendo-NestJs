//* adapters *//
import { PokeApiAdapter, PokeApiFetchAdapter } from "../api/pokeApi.adapter";

//* interface *//
import {
  IPokeApiResponse,
  Move,
} from "../interfaces/pokeapi-response.interface";

export class Pokemon {
  constructor(
    public readonly id: number,
    public name: string,
    private readonly http: PokeApiAdapter
  ) {}

  get imageUrl(): string {
    return `https://pokemon/${this.id}.jpg`;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    const data = await this.http.get<IPokeApiResponse>(
      "https://pokeapi.co/api/v2/pokemon/4"
    );

    console.log(data.moves);
    return data.moves;
  }
}

const pokeApiAxios = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon(1, "Charmander", pokeApiAxios);

charmander.getMoves();
