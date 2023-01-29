import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* services *//
import { ProductsService } from 'src/products/products.service';

//* data *//
import { initialData } from './data/seed-data';

//* entities *//
import { User } from '../auth/entities';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User) private readonly userReposity: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTable();
    const adminUser = await this.insertUsers();
    await this.insertNewProduct(adminUser);

    return 'Seed executed';
  }

  private async deleteTable() {
    await this.productService.removeAll();

    const queryBuilder = this.userReposity.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const users = initialData.users;
    const insertPromises = [];

    users.forEach((user) => {
      insertPromises.push(this.userReposity.create(user));
    });

    const dbUser = await this.userReposity.save(users);

    return dbUser[0];
  }

  private async insertNewProduct(user: User) {
    this.productService.removeAll();

    const products = initialData.products;
    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
