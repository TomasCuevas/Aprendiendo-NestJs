import { Field, ObjectType } from '@nestjs/graphql';

//* entity *//
import { User } from '../../users/entities';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
