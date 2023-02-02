import { Manager, Socket } from "socket.io-client";

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3001/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: token,
    },
  });

  const socket = manager.socket("/");
  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status");
  const clientsUl = document.querySelector("#clients-ul");

  const messageForm = document.querySelector<HTMLFormElement>("#message-form");
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input");

  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul");

  socket.on("connect", () => {
    serverStatusLabel!.innerHTML = "Connected";
  });

  socket.on("disconnect", () => {
    serverStatusLabel!.innerHTML = "Disconnect";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((clientId) => {
      clientsHtml += `
      <li>${clientId}</li>
      `;
    });

    clientsUl!.innerHTML = clientsHtml;
  });

  messageForm?.addEventListener("submit", (event) => {
    event?.preventDefault();

    if (messageInput!.value.trim().length < 1) return;

    socket.emit("message-from-client", {
      id: "123asd",
      message: messageInput!.value,
    });

    messageInput!.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>
      `;

      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesUl!.appendChild(li);
    }
  );
};
