import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

//* service *//
import { UsersService } from './users.service';

//* entity *//
import { User } from './entities';

//* dto-input-params *//
import { CreateUserInput, UpdateUserInput } from './dto/input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    throw new Error('Not implemented');
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  blockUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.block(id);
  }
}
