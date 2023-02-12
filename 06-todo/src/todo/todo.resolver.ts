import { Query, Resolver } from '@nestjs/graphql';

//* entity *//
import { Todo } from './entity';

//* service *//
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  //! find all todos
  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  //! find one todo
  findOne() {
    return [];
  }

  //! create todo
  createTodo() {
    return;
  }

  //! update todo
  updateTodo() {
    return;
  }
}
