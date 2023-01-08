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
}

export const charmander = new Pokemon(1, "Charmander");

console.log(charmander.imageUrl);
charmander.scream();
charmander.speak();
