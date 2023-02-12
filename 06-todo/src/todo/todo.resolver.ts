import { Args, Int, Query, Resolver } from '@nestjs/graphql';

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
  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int, nullable: false }) id: number): Todo {
    return this.todoService.findOne(id);
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
