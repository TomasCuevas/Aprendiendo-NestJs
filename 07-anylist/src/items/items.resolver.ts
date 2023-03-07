import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

//* service *//
import { ItemsService } from './items.service';

//* dto-inputs-args *//
import { CreateItemInput, UpdateItemInput } from './dto/inputs';

//* entities *//
import { Item } from './entities';
import { User } from '../users/entities';

//* guards *//
import { JwtAuthGuard } from '../auth/guards';

//* decorators *//
import { CurrentUser } from '../auth/decorators';

@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, { name: 'createItem' })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() createBy: User,
  ): Promise<Item> {
    return this.itemsService.create(createItemInput, createBy);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(@CurrentUser() user: User): Promise<Item[]> {
    return this.itemsService.findAll(user);
  }

  @Query(() => Item, { name: 'item' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return this.itemsService.findOne(id, user);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() updateBy: User,
  ): Promise<Item> {
    return this.itemsService.update(
      updateItemInput.id,
      updateItemInput,
      updateBy,
    );
  }

  @Mutation(() => Item)
  async removeItem(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() deleteBy: User,
  ): Promise<Item> {
    return this.itemsService.remove(id, deleteBy);
  }
}
