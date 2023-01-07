// import { name, age } from "./bases/01-types";
import { pokemon, pokemons } from "./bases/02-objects";

import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello ${JSON.stringify(pokemons)} !</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
