import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

//* services *//
import { ListsService } from './lists.service';
import { ListItemService } from '../list-item/list-item.service';

//* dto-inputs-args *//
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

//* decorators */
import { CurrentUser } from '../auth/decorators';

//* guards *//
import { JwtAuthGuard } from '../auth/guards';

//* entities *//
import { List } from './entities';
import { User } from '../users/entities';
import { ListItem } from '../list-item/entities';

@Resolver(() => List)
@UseGuards(JwtAuthGuard)
export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly listItemsService: ListItemService,
  ) {}

  //! create list
  @Mutation(() => List, { name: 'createList' })
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() createBy: User,
  ): Promise<List> {
    return this.listsService.create(createListInput, createBy);
  }

  //! find all lists
  @Query(() => [List], { name: 'lists' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs, searchArgs);
  }

  //! find one list
  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.findOne(id, user);
  }

  //! update list
  @Mutation(() => List)
  async updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() updateBy: User,
  ): Promise<List> {
    return this.listsService.update(
      updateListInput.id,
      updateListInput,
      updateBy,
    );
  }

  //! remove list
  @Mutation(() => List)
  async removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() deleteBy: User,
  ): Promise<List> {
    return this.listsService.remove(id, deleteBy);
  }

  @ResolveField(() => [ListItem], { name: 'items' })
  async getListItems(@Parent() list: List): Promise<ListItem[]> {
    return this.listItemsService.findAll();
  }
}
