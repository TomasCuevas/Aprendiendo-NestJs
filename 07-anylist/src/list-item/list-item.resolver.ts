import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

//* services *//
import { ListItemService } from './list-item.service';

//* dto-inputs-args *//
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs/';

//* entities *//
import { ListItem } from './entities';

@Resolver(() => ListItem)
export class ListItemResolver {
  constructor(private readonly listItemService: ListItemService) {}

  @Mutation(() => ListItem)
  createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput,
  ) {
    return this.listItemService.create(createListItemInput);
  }

  @Query(() => [ListItem], { name: 'listItem' })
  findAll() {
    return this.listItemService.findAll();
  }

  @Query(() => ListItem, { name: 'listItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listItemService.findOne(id);
  }

  @Mutation(() => ListItem)
  updateListItem(
    @Args('updateListItemInput') updateListItemInput: UpdateListItemInput,
  ) {
    return this.listItemService.update(
      updateListItemInput.id,
      updateListItemInput,
    );
  }

  @Mutation(() => ListItem)
  removeListItem(@Args('id', { type: () => Int }) id: number) {
    return this.listItemService.remove(id);
  }
}
