import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dto-inputs-args *//
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { PaginationArgs } from '../common/dto/args';

//* entities *//
import { Item } from './entities';
import { User } from '../users/entities';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  //! create item
  async create(
    createItemInput: CreateItemInput,
    createBy: User,
  ): Promise<Item> {
    const newItem = this.itemsRepository.create({
      ...createItemInput,
      user: createBy,
    });
    await this.itemsRepository.save(newItem);

    return newItem;
  }

  //! find all items by user
  async findAll(user: User, paginationArgs: PaginationArgs): Promise<Item[]> {
    const { limit, offset } = paginationArgs;

    return await this.itemsRepository.find({
      take: limit,
      skip: offset,
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  //! find one item by user
  async findOne(id: string, user: User): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    if (!item) {
      throw new NotFoundException(`Item with id: ${id} not found.`);
    }

    return item;
  }

  //! update item
  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    updateBy: User,
  ): Promise<Item> {
    await this.findOne(id, updateBy);
    const item = await this.itemsRepository.preload(updateItemInput);

    return await this.itemsRepository.save(item);
  }

  //! remove item
  async remove(id: string, deleteBy: User): Promise<Item> {
    const item = await this.findOne(id, deleteBy);
    await this.itemsRepository.remove(item);

    return { ...item, id };
  }

  //! items count by user
  async itemCountByUser(user: User): Promise<number> {
    return await this.itemsRepository.count({
      where: { user: { id: user.id } },
    });
  }
}
