import { Socket } from 'socket.io';

//* entites *//
import { User } from '../../auth/entities';

export interface ConnectedClients {
  [id: string]: { socket: Socket; user: User };
}
