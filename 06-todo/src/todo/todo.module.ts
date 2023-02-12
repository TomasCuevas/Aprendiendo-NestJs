import { Module } from '@nestjs/common';

//* resolver *//
import { TodoResolver } from './todo.resolver';

@Module({
  providers: [TodoResolver],
})
export class TodoModule {}
