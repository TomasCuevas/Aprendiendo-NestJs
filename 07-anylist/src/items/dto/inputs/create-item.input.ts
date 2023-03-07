import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsPositive()
  quantity: number;
}
