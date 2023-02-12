import { Injectable } from '@nestjs/common';
import { Todo } from './entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: true },
    { id: 3, description: 'Piedra del Poder', done: false },
  ];

  //! find all todos
  findAll() {
    return this.todos;
  }
}
