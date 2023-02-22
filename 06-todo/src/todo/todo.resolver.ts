import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

//* entity *//
import { Todo } from './entity';

//* service *//
import { TodoService } from './todo.service';

//* dto-inputs *//
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

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
  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  //! update todo
  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }
}
