import { Injectable } from '@nestjs/common';

//* services *//
import { ProductsService } from 'src/products/products.service';

//* data *//
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProduct();

    return 'Seed executed';
  }

  private async insertNewProduct() {
    this.productService.removeAll();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
