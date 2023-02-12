import { Module } from '@nestjs/common';

//* resolver *//
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
