import { PartialType } from '@nestjs/mapped-types';

//* dto *//
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
