import { Module } from '@nestjs/common';

//* controller *//
import { TodoController } from './todo.controller';

//* service *//
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
