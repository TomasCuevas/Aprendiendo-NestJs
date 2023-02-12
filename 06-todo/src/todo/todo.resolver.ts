import { Query, Resolver } from '@nestjs/graphql';

//* entity *//
import { Todo } from './entity';

@Resolver()
export class TodoResolver {
  //! find all todos
  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return [];
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
