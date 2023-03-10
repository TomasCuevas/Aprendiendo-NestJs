import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* entities *//
import { Item } from '../items/entities';
import { User } from '../users/entities';
import { List } from '../lists/entities';
import { ListItem } from '../list-item/entities';

//* services *//
import { ItemsService } from '../items/items.service';
import { ListItemService } from '../list-item/list-item.service';
import { ListsService } from '../lists/lists.service';
import { UsersService } from '../users/users.service';

//* data *//
import { SEED_USERS, SEED_ITEMS, SEED_LIST } from './data/seed-data';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    @InjectRepository(List) private readonly listsRepository: Repository<List>,
    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly listsService: ListsService,
    private readonly listItemsService: ListItemService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  //! execute seed
  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.');
    }

    // limpiar base de datos
    await this.deleteDatabase();

    // crear usuarios
    const user = await this.loadUsers();

    // crear items
    await this.loadItems(user);

    // crear listas
    const list = await this.loadLists(user);

    // crear list-items
    const items = await this.itemsService.findAll(
      user,
      { limit: 15, offset: 0 },
      {},
    );
    await this.loadListItems(list, items, user);

    return true;
  }

  //! delete database
  async deleteDatabase() {
    await this.listItemsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.itemsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.listsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  //! load users on database
  async loadUsers(): Promise<User> {
    const users = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }

    return users[0];
  }

  //! load items on database
  async loadItems(user: User): Promise<void> {
    const items = [];

    for (const item of SEED_ITEMS) {
      items.push({ ...item, user });
    }

    this.itemsRepository.insert(items);
  }

  //! load lists on database
  async loadLists(user: User): Promise<List> {
    const lists = [];

    for (const list of SEED_LIST) {
      lists.push(await this.listsService.create(list, user));
    }

    return lists[0];
  }

  //! load list-items on database
  async loadListItems(list: List, items: Item[], user: User): Promise<void> {
    for (const item of items) {
      this.listItemsService.create(
        {
          quantity: Math.round(Math.random() * 10),
          completed: Math.round(Math.random() * 1) === 0 ? false : true,
          itemId: item.id,
          listId: list.id,
        },
        user,
      );
    }
  }
}
