import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

//* entity *//
import { Todo } from './entity';

//* service *//
import { TodoService } from './todo.service';

//* dto-inputs-args *//
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  //! find all todos
  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
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

  //! remove todo
  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }

  //! count all todos
  @Query(() => Int, { name: 'totalTodos' })
  totalTodos() {
    return this.todoService.totalTodos;
  }

  //! count all pending todos
  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos() {
    return this.todoService.totalTodosPending;
  }

  //! count all completed todos
  @Query(() => Int, { name: 'completedTodos' })
  completedTodos() {
    return this.todoService.totalTodosCompleted;
  }
}
