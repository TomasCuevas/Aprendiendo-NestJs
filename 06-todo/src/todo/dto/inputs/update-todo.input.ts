import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'What needs to be done', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
