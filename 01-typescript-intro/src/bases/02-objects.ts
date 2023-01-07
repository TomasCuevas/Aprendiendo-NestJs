export const pokemonIds = [1, 20, 30, 34, 66];

interface IPokemon {
  id: number;
  name: string;
  age?: number;
}

export const pokemon: IPokemon = {
  id: 1,
  name: "Pikachu",
};

export const pokemon2: IPokemon = {
  id: 2,
  name: "Bulbasaur",
};

export const pokemons: IPokemon[] = [];

pokemons.push(pokemon, pokemon2);
