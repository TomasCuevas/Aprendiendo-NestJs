import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

//* interface *//
import { ConnectedClients } from './interfaces/ConnectedClients';

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): number {
    return Object.keys(this.connectedClients).length;
  }
}
