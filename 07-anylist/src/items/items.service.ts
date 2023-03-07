import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dto-inputs-args *//
import { CreateItemInput, UpdateItemInput } from './dto/inputs';

//* entities *//
import { Item } from './entities';
import { User } from '../users/entities';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

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

  async findAll(user: User): Promise<Item[]> {
    return await this.itemsRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item with id: ${id} not found.`);

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    await this.findOne(id);
    const item = await this.itemsRepository.preload(updateItemInput);

    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);

    return { ...item, id };
  }
}
