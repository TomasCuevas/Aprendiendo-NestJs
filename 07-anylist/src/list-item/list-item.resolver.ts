import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';

//* services *//
import { ListItemService } from './list-item.service';

//* dto-inputs-args *//
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs/';

//* guards *//
import { JwtAuthGuard } from '../auth/guards';

//* decorators *//
import { CurrentUser } from '../auth/decorators';

//* entities *//
import { ListItem } from './entities';
import { User } from '../users/entities';

@Resolver(() => ListItem)
@UseGuards(JwtAuthGuard)
export class ListItemResolver {
  constructor(private readonly listItemService: ListItemService) {}

  //! create list-item
  @Mutation(() => ListItem)
  async createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput,
    @CurrentUser() createBy: User,
  ): Promise<ListItem> {
    return this.listItemService.create(createListItemInput, createBy);
  }

  //! find one list-item by id
  @Query(() => ListItem, { name: 'listItem' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ListItem> {
    return this.listItemService.findOne(id);
  }

  //! update list-item
  @Mutation(() => ListItem, { name: 'updateListItem' })
  async updateListItem(
    @Args('updateListItemInput') updateListItemInput: UpdateListItemInput,
  ): Promise<ListItem> {
    return this.listItemService.update(
      updateListItemInput.id,
      updateListItemInput,
    );
  }

  // @Mutation(() => ListItem)
  // removeListItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.remove(id);
  // }
}
