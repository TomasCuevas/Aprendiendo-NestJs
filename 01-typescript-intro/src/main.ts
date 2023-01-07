import "./style.css";
import { name, age } from "./bases/01-types";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello ${name} ${age} !</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
