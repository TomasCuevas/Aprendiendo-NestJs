import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dto-inputs-args *//
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

//* services *//
import { ListsService } from '../lists/lists.service';

//* entities *//
import { ListItem } from './entities';
import { User } from '../users/entities';
import { List } from '../lists/entities';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>,
    private readonly listService: ListsService,
  ) {}

  //! create list item
  async create(
    createListItemInput: CreateListItemInput,
    user: User,
  ): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;

    await this.listService.findOne(listId, user);

    const newListItem = await this.listItemsRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });

    return this.listItemsRepository.save(newListItem);
  }

  //! find all list items by list
  async findAll(
    list: List,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    //? with queryBuilder
    const queryBuilder = this.listItemsRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"listId" = :listId`, { listId: list.id });

    if (search) {
      queryBuilder.andWhere('LOWER(item.name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return queryBuilder.getMany();
  }

  //! find one list-item by id
  async findOne(id: string, user: User): Promise<ListItem> {
    const listItem = await this.listItemsRepository.findOneBy({
      id,
      list: { user: { id: user.id } },
    });

    if (!listItem) {
      throw new NotFoundException(`List-item with id: ${id} not found.`);
    }

    return listItem;
  }

  //! update list-item
  async update(
    id: string,
    updateListItemInput: UpdateListItemInput,
  ): Promise<ListItem> {
    const { itemId, listId, ...rest } = updateListItemInput;

    const listItem = await this.listItemsRepository.preload({
      ...rest,
      list: { id: listId },
      item: { id: itemId },
    });

    if (!listItem) {
      throw new NotFoundException(`List-item with id: ${id} not found.`);
    }

    return this.listItemsRepository.save(listItem);
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }

  //! list-items count by list
  async listItemsCount(list: List): Promise<number> {
    return this.listItemsRepository.count({ where: { list: { id: list.id } } });
  }
}
