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
import { UsersService } from '../users/users.service';

//* data *//
import { SEED_USERS, SEED_ITEMS } from './data/seed-data';

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
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  //! execute seed
  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.');
    }

    await this.deleteDatabase();
    const user = await this.loadUsers();
    await this.loadItems(user);

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
}
