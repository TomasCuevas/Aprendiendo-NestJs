import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

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

  @Mutation(() => ListItem)
  async createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput,
    @CurrentUser() createBy: User,
  ): Promise<ListItem> {
    return this.listItemService.create(createListItemInput, createBy);
  }

  @Query(() => [ListItem], { name: 'listItem' })
  findAll() {
    return this.listItemService.findAll();
  }

  // @Query(() => ListItem, { name: 'listItem' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.findOne(id);
  // }

  // @Mutation(() => ListItem)
  // updateListItem(
  //   @Args('updateListItemInput') updateListItemInput: UpdateListItemInput,
  // ) {
  //   return this.listItemService.update(
  //     updateListItemInput.id,
  //     updateListItemInput,
  //   );
  // }

  // @Mutation(() => ListItem)
  // removeListItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.remove(id);
  // }
}
