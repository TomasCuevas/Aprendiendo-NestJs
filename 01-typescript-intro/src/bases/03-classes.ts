import axios from "axios";

export class Pokemon {
  // public id: number;
  // public name: string;

  // constructor(id: number, name: string) {
  //   this.id = id;
  //   this.name = name;
  // }

  constructor(public readonly id: number, public name: string) {}

  get imageUrl(): string {
    return `https://pokemon/${this.id}.jpg`;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves() {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/4");

    console.log(data.moves);
    return data.moves;
  }
}

export const charmander = new Pokemon(1, "Charmander");

// console.log(charmander.imageUrl);
// charmander.scream();
// charmander.speak();

charmander.getMoves();
