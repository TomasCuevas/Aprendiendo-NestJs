import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

//* service *//
import { UsersService } from './users.service';

//* entity *//
import { User } from './entities';

//* dto-input-args *//
import { ValidRolesArgs } from './dto/args';

//* guards *//
import { JwtAuthGuard } from '../auth/guards';

//* decorators *//
import { CurrentUser } from '../auth/decorators';

//* enums *//
import { ValidRoles } from '../auth/enums';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //! find all users
  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
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
