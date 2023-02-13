import { Injectable, NotFoundException } from '@nestjs/common';

//* entity *//
import { Todo } from './entity';

//* dto-inputs *//
import { CreateTodoInput } from './dto/inputs';

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

  //! find one todo
  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id: (${id}) not found.`);

    return todo;
  }

  //! create todo
  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }
}
