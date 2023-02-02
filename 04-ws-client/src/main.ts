import "./style.css";

import { connectToServer } from "./socket-client";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <h1>Websocket client</h1>
  <span id='server-status'>Offline</span>
  </div>
`;

connectToServer();
