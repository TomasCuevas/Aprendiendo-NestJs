import { Injectable, NotFoundException } from '@nestjs/common';

//* dtos *//
import { CreateTodoDto, UpdateTodoDto } from './dto';

//* entity *//
import { Todo } from './entities';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description:
        'Pariatur veniam elit deserunt esse nulla do reprehenderit officia nostrud sint mollit nisi Lorem quis.',
      done: false,
    },
    {
      id: 2,
      description: 'Elit id aliqua excepteur ut do et.',
      done: false,
    },
    {
      id: 3,
      description:
        'Ipsum ipsum nisi consectetur irure qui amet qui velit est excepteur eu cillum.',
      done: false,
    },
  ];

  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`ToDo with id: ${id}, not found.`);

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
