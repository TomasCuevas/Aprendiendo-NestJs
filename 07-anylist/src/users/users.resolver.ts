import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

//* services *//
import { UsersService } from './users.service';
import { ItemsService } from '../items/items.service';
import { ListsService } from '../lists/lists.service';

//* entities *//
import { User } from './entities';
import { Item } from '../items/entities';
import { List } from '../lists/entities';

//* dto-input-args *//
import { UpdateUserInput } from './dto/input';
import { ValidRolesArgs } from './dto/args';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

//* guards *//
import { JwtAuthGuard } from '../auth/guards';

//* decorators *//
import { CurrentUser } from '../auth/decorators';

//* enums *//
import { ValidRoles } from '../auth/enums';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private itemsService: ItemsService,
    private listsService: ListsService,
  ) {}

  //! find all users
  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
  }

  //! find user by id
  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User,
  ) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  //! block user
  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User,
  ) {
    return this.usersService.block(id, user);
  }

  //! items count by user
  @ResolveField(() => Int, { name: 'itemCount' })
  async itemCount(@Parent() user: User): Promise<number> {
    return await this.itemsService.itemCountByUser(user);
  }

  //! items by user
  @ResolveField(() => [Item], { name: 'items' })
  async getItemsByUser(
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return await this.itemsService.findAll(user, paginationArgs, searchArgs);
  }

  //! lists count by user
  @ResolveField(() => Int, { name: 'listCount' })
  async listCount(@Parent() user: User): Promise<number> {
    return await this.listsService.listsCountByUser(user);
  }

  //! lists by user
  @ResolveField(() => [List], { name: 'lists' })
  async getListsByUser(
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return await this.listsService.findAll(user, paginationArgs, searchArgs);
  }
}
