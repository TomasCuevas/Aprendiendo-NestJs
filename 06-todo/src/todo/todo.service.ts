import { Injectable, NotFoundException } from '@nestjs/common';

//* entity *//
import { Todo } from './entity';

//* dto-inputs-args *//
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: true },
    { id: 3, description: 'Piedra del Poder', done: false },
    { id: 4, description: 'Piedra del Infinito', done: false },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get totalTodosPending() {
    return this.todos.filter((todo) => !todo.done).length;
  }

  get totalTodosCompleted() {
    return this.todos.filter((todo) => todo.done).length;
  }

  //! find all todos
  findAll(statusArgs: StatusArgs) {
    const { status } = statusArgs;
    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }

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

  //! update todo
  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });

    return todoToUpdate;
  }

  //! remove todo
  remove(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);

    return true;
  }
}
